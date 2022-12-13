import isString from 'lodash/isString';
import createHmac from 'create-hmac';
import { Token } from '../../types';

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
  token: Token,
  ipfsGatewayUri: string,
  imgproxySalt: string,
  imgproxySecret: string,
  imgproxyParams: string = '/rs:fit:960:0:true/format:webp/plain/'
) {
  let sourceUri = null;

  if (token.display_uri) {
    sourceUri = token.display_uri;
  } else if (token.mime_type && isSupportedImageMimeType(token.mime_type)) {
    sourceUri = token.artifact_uri;
  } else if (token.thumbnail_uri) {
    sourceUri = token.thumbnail_uri;
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
