import { run } from 'graphile-worker';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import ffmpeg from 'fluent-ffmpeg';
import { Magic, MAGIC_MIME_TYPE } from 'mmmagic';
import gm from 'gm';
import B2 from 'backblaze-b2';
import { promisify } from 'util';
import ffmpegBin from '@ffmpeg-installer/ffmpeg';
import ffprobeBinPath from 'ffprobe-binaries';
import { getWorkerUtils, getTaskName } from '../../lib/utils';
import ipfsClient from '../../lib/ipfs-client';
import dbConfig from '../../knexfile';
import { Task, ImageAsset, VideoAsset, Asset, AssetType } from '../../types';
import logger from '../../lib/logger';
import * as tokensDao from '../../lib/daos/tokens';
import * as assetsDao from '../../lib/daos/assets';
import config from '../../lib/config';

require('dotenv').config();

const MAX_FILE_SIZE = 150 * 1024 * 1024; // 150mb
const TEMP_ARTIFACTS_PATH = path.join(__dirname, '../../../data/temp/artifacts');
const im = gm.subClass({ imageMagick: true });

const readFilePromise = promisify(fs.readFile);

ffmpeg.setFfmpegPath(ffmpegBin.path);
ffmpeg.setFfprobePath(ffprobeBinPath);

interface ProcessArtifactTaskPayload {
  artifact_uri: string;
}

const MIME_TYPE_TO_CONVERTER = {
  'video/x-msvideo': 'video',
  'video/mp4': 'video',
  'video/quicktime': 'video',
  'video/mov': 'video',
  'video/qt': 'video',
  'video/webm': 'video',
  'image/gif': 'gif',
  'image/jpeg': 'image',
  'image/png': 'image',
  'image/webp': 'image',
  'image/svg+xml': 'svg',
};

async function detectMimeTypeFromBuffer(chunk: Buffer) {
  const magic = new Magic(MAGIC_MIME_TYPE);

  return new Promise(function (resolve, reject) {
    magic.detect(chunk, function (err, result) {
      if (err) {
        reject(err);
        return;
      }

      resolve(result);
    });
  });
}

async function detectMimeTypeFromFile(inputPath: string): Promise<string> {
  const magic = new Magic(MAGIC_MIME_TYPE);

  return new Promise(function (resolve, reject) {
    magic.detectFile(inputPath, function (err, result) {
      if (err) {
        reject(err);
        return;
      }

      resolve(Array.isArray(result) ? result[0] : result);
    });
  });
}

async function getFilesize(inputPath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    fs.stat(inputPath, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(stats.size);
    });
  });
}

export async function downloadFromIpfs(ipfsCid: string, fileName: string) {
  const fullPath = path.join(TEMP_ARTIFACTS_PATH, fileName);

  if (fs.existsSync(fullPath)) {
    await fs.promises.unlink(fullPath);
  }

  try {
    let mimeType: string | null = null;

    await pipeline(
      ipfsClient.cat(ipfsCid),
      async function* (source) {
        for await (const chunk of source) {
          if (!mimeType) {
            try {
              mimeType = (await detectMimeTypeFromBuffer(Buffer.from(chunk))) as string;
              console.log('mime type detected', mimeType);
            } catch (err) {}

            if (mimeType && !(mimeType in MIME_TYPE_TO_CONVERTER)) {
              throw new Error(`unsupported mimetype: ${mimeType}`);
            }
          }

          yield chunk;
        }

        if (!mimeType) {
          throw new Error(`no mimetype detected`);
        }
      },
      async function* (source) {
        let size = 0;

        for await (const chunk of source) {
          size += chunk.length;

          if (size > MAX_FILE_SIZE) {
            throw new Error('exceeded max filesize');
          }

          yield chunk;
        }
      },
      fs.createWriteStream(fullPath)
    );

    return {
      fullPath,
      mimeType,
    };
  } catch (err) {
    if (fs.existsSync(fullPath)) {
      await fs.promises.unlink(fullPath);
    }

    throw err;
  }
}

async function convertVideo(inputPath: string, fileName: string, width: number, type: 'crop' | 'autoheight' = 'crop'): Promise<string> {
  let typeSpecificFilters: Array<{ filter: string; options: string }> = [];

  if (type === 'crop') {
    typeSpecificFilters = [
      {
        filter: 'crop',
        options: `w='min(iw\,ih)':h='min(iw\,ih)'`,
      },
      {
        filter: 'scale',
        options: `${width}:${width}:flags=lanczos`,
      },
    ];
  }

  if (type === 'autoheight') {
    typeSpecificFilters = [
      {
        filter: 'scale',
        options: `${width}:-2:flags=lanczos`,
      },
    ];
  }

  return new Promise((resolve, reject) => {
    try {
      const outputPath = path.join(TEMP_ARTIFACTS_PATH, fileName);
      ffmpeg(inputPath)
        .videoFilters([
          {
            filter: 'scale',
            options: `trunc(iw/2)*2:trunc(ih/2)*2`,
          },
          ...typeSpecificFilters,
          {
            filter: 'unsharp',
            options: '3:3:1.0:3:3:0.0',
          },
          {
            filter: 'setsar',
            options: '1',
          },
        ])
        .outputOptions(['-movflags faststart', '-pix_fmt yuv420p', '-an'])
        .output(outputPath)
        .on('end', function () {
          resolve(outputPath);
        })
        .on('error', function (err) {
          reject(err);
        })
        .run();
    } catch (err) {
      reject(err);
    }
  });
}

async function isAnimatedGif(inputPath: string) {
  return new Promise((resolve, reject) => {
    im(inputPath).identify(`%n `, function (err, data) {
      if (err) {
        reject(err);
        return;
      }

      const framesCount = parseInt(data.split(' ')[0], 10);

      resolve(framesCount > 1);
    });
  });
}

async function convertImageAutoheight(inputPath: string, fileName: string, width: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(TEMP_ARTIFACTS_PATH, fileName);

    im(inputPath)
      .command('magick')
      .resize(width)
      .strip()
      .interlace('plane')
      .sharpen(0, 0.8)
      .quality(90)
      .write(outputPath, (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(outputPath);
      });
  });
}

async function convertImageCrop(inputPath: string, fileName: string, width: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(TEMP_ARTIFACTS_PATH, fileName);

    const cmd = im(inputPath)
      .command('magick')
      .gravity('Center')
      .out('-extent', '%[fx:h<w?h:w]x%[fx:h<w?h:w]')
      .resize(width)
      .strip()
      .interlace('plane')
      .sharpen(0, 0.8)
      .quality(90);

    cmd.write(outputPath, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(outputPath);
    });
  });
}

async function convertSvgAutoheight(inputPath: string, fileName: string, width: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(TEMP_ARTIFACTS_PATH, fileName);

    im(inputPath)
      .command('magick')
      .resize(width)
      .strip()
      .interlace('plane')
      .sharpen(0, 0.8)
      .quality(100)
      .background('white')
      .flatten()
      .write(outputPath, (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(outputPath);
      });
  });
}

async function convertSvgCrop(inputPath: string, fileName: string, width: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(TEMP_ARTIFACTS_PATH, fileName);

    im(inputPath)
      .command('magick')
      .gravity('Center')
      .out('-extent', `%[fx:h<w?h:w]x%[fx:h<w?h:w]`)
      .resize(width)
      .strip()
      .interlace('plane')
      .sharpen(0, 0.8)
      .quality(100)
      .background('white')
      .flatten()
      .write(outputPath, (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(outputPath);
      });
  });
}

async function getImageInfo(inputPath: string, artifactUri: string, type: AssetType = 'thumbnail'): Promise<ImageAsset> {
  const mimeType = await detectMimeTypeFromFile(inputPath);
  const filesize = await getFilesize(inputPath);

  return new Promise((resolve, reject) => {
    try {
      im(inputPath).size((err, size) => {
        if (err) {
          reject(err);
          return;
        }

        resolve({
          type,
          filesize,
          artifact_uri: artifactUri,
          filename: path.basename(inputPath),
          width: size.width,
          height: size.height,
          mime_type: mimeType,
        });
      });
    } catch (err) {
      reject(err);
    }
  });
}

async function getVideoInfo(inputPath: string, artifactUri: string, type: AssetType = 'thumbnail'): Promise<VideoAsset> {
  const mimeType = await detectMimeTypeFromFile(inputPath);
  const filesize = await getFilesize(inputPath);

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath).ffprobe((err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const videoStream = data.streams.find(({ codec_type }) => codec_type === 'video');

      if (!videoStream) {
        reject('no video stream found');
        return;
      }

      if (!videoStream.codec_name || !videoStream.width || !videoStream.height || !videoStream.duration) {
        reject('missing video information');
        return;
      }

      resolve({
        type,
        artifact_uri: artifactUri,
        filename: path.basename(inputPath),
        filesize,
        mime_type: mimeType,
        codec: videoStream.codec_name,
        width: videoStream.width,
        height: videoStream.height,
        duration: Math.floor(parseFloat(videoStream.duration) * 1000),
      });
    });
  });
}

async function uploadToBackblaze(assets: Array<Asset>) {
  try {
    const b2 = new B2({
      applicationKeyId: process.env.BACKBLAZE_APPLICATION_KEY_ID!,
      applicationKey: process.env.BACKBLAZE_APPLICATION_KEY!,
    });

    await b2.authorize();
    const res = await b2.getUploadUrl({ bucketId: process.env.BACKBLAZE_APPLICATION_BUCKET_ID! });
    const { authorizationToken, uploadUrl } = res.data;

    for (const asset of assets.filter(({ type }) => type === 'thumbnail')) {
      const data = await readFilePromise(path.join(TEMP_ARTIFACTS_PATH, asset.filename));

      await b2.uploadFile({
        fileName: asset.filename,
        uploadUrl,
        uploadAuthToken: authorizationToken,
        data,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export async function processArtifact(artifactUri: string) {
  const workerUtils = await getWorkerUtils();

  if (!artifactUri.toLowerCase().startsWith('ipfs://')) {
    logger.info(`unsupported artifact uri: ${artifactUri}`);
    return;
  }

  const cid = artifactUri.substr(7);
  const { fullPath, mimeType } = await downloadFromIpfs(cid, cid);
  let converterType: string = MIME_TYPE_TO_CONVERTER[mimeType!];

  if (!converterType) {
    logger.info(`unsupported mime type "${mimeType}" found in artifact "${artifactUri}"`);
    return;
  }

  if (converterType === 'gif') {
    const isAnimated = await isAnimatedGif(fullPath);
    converterType = isAnimated ? 'video' : 'image';
  }

  const assets: Array<Asset> = [];

  if (converterType === 'video') {
    assets.push(await getVideoInfo(fullPath, artifactUri, 'original'));

    for (const width of config.thumbnailWidths) {
      assets.push(await getVideoInfo(await convertVideo(fullPath, `${cid}_${width}x${width}.mp4`, width, 'crop'), artifactUri));
      assets.push(await getVideoInfo(await convertVideo(fullPath, `${cid}_${width}xauto.mp4`, width, 'autoheight'), artifactUri));
    }
  } else if (converterType === 'image') {
    assets.push(await getImageInfo(fullPath, artifactUri, 'original'));

    for (const width of config.thumbnailWidths) {
      assets.push(await getImageInfo(await convertImageCrop(fullPath, `${cid}_${width}x${width}.jpg`, width), artifactUri));
      assets.push(await getImageInfo(await convertImageAutoheight(fullPath, `${cid}_${width}xauto.jpg`, width), artifactUri));
    }
  } else if (converterType === 'svg') {
    assets.push(await getImageInfo(fullPath, artifactUri, 'original'));

    for (const width of config.thumbnailWidths) {
      assets.push(await getImageInfo(await convertSvgCrop(fullPath, `${cid}_${width}x${width}.jpg`, width), artifactUri));
      assets.push(await getImageInfo(await convertSvgAutoheight(fullPath, `${cid}_${width}xauto.jpg`, width), artifactUri));
    }
  }

  if (assets.length) {
    await uploadToBackblaze(assets);

    const tokens = await tokensDao.getByField('artifact_uri', artifactUri);

    if (tokens && tokens.length) {
      for (const token of tokens) {
        await workerUtils.addJob(
          getTaskName('rebuild-token'),
          { fa2_address: token.fa2_address, token_id: token.token_id },
          { jobKey: `rebuild-token-${token.fa2_address}-${token.token_id}`, maxAttempts: 2 }
        );
      }
    }

    await assetsDao.add(assets);
  }
}

const task: Task = {
  name: 'process-artifact',

  spawnWorkers: async () => {
    if (config.eventProcessArtifactConcurrency === 0) {
      console.log('process-artifact worker is disabled');
      return;
    }

    await run({
      connectionString: dbConfig.connection,
      concurrency: config.eventProcessArtifactConcurrency,
      noHandleSignals: false,
      pollInterval: config.workerPollInterval,
      taskList: {
        [getTaskName('process-artifact')]: async (payload) => {
          const p = payload as ProcessArtifactTaskPayload;
          await processArtifact(p.artifact_uri);
        },
      },
    });
  },
};

export default task;
