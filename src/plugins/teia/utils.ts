import isString from 'lodash/isString';
import uniq from 'lodash/uniq';
import createHmac from 'create-hmac';
import isIPFS from 'is-ipfs';

const SUPPORTED_IMAGE_MIME_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/tiff', 'image/webp', 'image/avif'];

function isSupportedImageMimeType(mimeType: string) {
  if (!isString(mimeType)) {
    return false;
  }

  return SUPPORTED_IMAGE_MIME_TYPES.includes(mimeType.toLowerCase());
}

const urlSafeBase64 = (buff: Buffer) => {
  return Buffer.from(buff).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};

const hexDecode = (hex: string) => Buffer.from(hex, 'hex');

const sign = (input: string, salt: string, secret: string) => {
  const hmac = createHmac('sha256', hexDecode(secret)); // could be cached at some point
  hmac.update(hexDecode(salt));
  hmac.update(input);
  return urlSafeBase64(hmac.digest());
};

export function createPreviewImageUri(
  displayUri: string | null,
  artifactUri: string | null,
  thumbnailUri: string | null,
  mimeType: string | null,
  ipfsGatewayUri: string,
  imgproxySalt: string,
  imgproxySecret: string,
  imgproxyParams: string
) {
  let sourceUri = null;

  if (displayUri) {
    sourceUri = displayUri;
  } else if (mimeType && isSupportedImageMimeType(mimeType)) {
    sourceUri = artifactUri;
  } else if (thumbnailUri) {
    sourceUri = thumbnailUri;
  }

  if (isString(sourceUri)) {
    sourceUri = sourceUri.trim();
  }

  if (!sourceUri || !sourceUri.toLowerCase().startsWith('ipfs://')) {
    return null;
  }

  const ipfsHash = sourceUri.substr(7);
  const thumbnailGatewayUri = `${ipfsGatewayUri}${ipfsGatewayUri.endsWith('/') ? '' : '/'}${ipfsHash}`;
  const path = `${imgproxyParams}${thumbnailGatewayUri}`;

  const signature = sign(path, imgproxySalt, imgproxySecret);
  return `/${signature}${path}`;
}

export function extractCIDsFromMetadata(metadataUri: string, metadata: any) {
  const metadataStr = `${metadataUri},${JSON.stringify(metadata)}`;
  const words = metadataStr.match(/\b(\w+)\b/g);

  if (!words) {
    return [];
  }

  return uniq(words.filter((word) => isIPFS.cid(word)));
}
