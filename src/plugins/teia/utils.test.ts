import { createPreviewImageUri } from './utils';

test('creates signed preview thumbnail uris', async () => {
  expect(createPreviewImageUri({ display_uri: 'ipfs://foo' } as any, 'https://cache.teia.rocks/ipfs', 'my-salt', 'my-secret')).toBe(
    '/3gUWoL8w6YynENEDd_tFlLwm5F-ZLIrhAcUiYUXrs0M/rs:fit:960:0:true/format:webp/plain/https://cache.teia.rocks/ipfs/foo'
  );
  expect(
    createPreviewImageUri(
      { artifact_uri: 'ipfs://bar', mime_type: 'image/jpeg' } as any,
      'https://cache.teia.rocks/ipfs',
      'my-salt',
      'my-secret'
    )
  ).toBe('/Dh_5ZvWq4c0rpbfiYF3ETVeF0jGqQhBxlC1MVepO8aE/rs:fit:960:0:true/format:webp/plain/https://cache.teia.rocks/ipfs/bar');
  expect(
    createPreviewImageUri(
      { artifact_uri: 'ipfs://bar', mime_type: 'not_supported' } as any,
      'https://cache.teia.rocks/ipfs',
      'my-salt',
      'my-secret'
    )
  ).toBe(null);
  expect(createPreviewImageUri({ thumbnail_uri: 'ipfs://baz' } as any, 'https://cache.teia.rocks/ipfs', 'my-salt', 'my-secret')).toBe(
    '/YhvQ5-LsRXZ9yjrN3D-D_jcEtpZSKmp9u0FvyZQSgjc/rs:fit:960:0:true/format:webp/plain/https://cache.teia.rocks/ipfs/baz'
  );
  expect(createPreviewImageUri({ thumbnail_uri: 'baz' } as any, 'https://cache.teia.rocks/ipfs', 'my-salt', 'my-secret')).toBe(null);
});
