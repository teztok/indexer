import { createPreviewImageUri, extractCIDsFromMetadata } from './utils';

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

test('extracts all CIDs from a metadata json', async () => {
  const CIDs = extractCIDsFromMetadata('ipfs://bafybeihidcrbkjp23gbwfzxmmlhdbijgv2bht37ddytht65wouqcljizae', {
    name: '',
    description:
      'HELLO GHOST special piece.\n\nSPECIAL DROP for Celebrating 5.000 followers on Twitter.\n\n"The ghosts are gathering at the tea ParTez." ',
    tags: ['illustration', 'design', 'characters', 'helloghost', 'wdwilly'],
    symbol: 'OBJKT',
    artifactUri: 'ipfs://QmUEzVeuubU9R1L5GVBEd4npMH4RMy9aWpZHGsNrZVVJF4',
    displayUri: 'ipfs://QmZmAyAQcX8HMooJDf1VHfftti2MLFq8h3vyW4uGW4UVRa',
    thumbnailUri: 'ipfs://QmNrhZHUaEqxhyLfqoq1mtHSipkWHeT31LNHb1QEbDHgnc',
    creators: ['tz1P3LVXdgtMmWfvag98ELYvA45KsMaSCd3W'],
    formats: [{ uri: 'ipfs://QmUEzVeuubU9R1L5GVBEd4npMH4RMy9aWpZHGsNrZVVJF4', mimeType: 'image/jpeg' }],
    decimals: 0,
    isBooleanAmount: false,
    shouldPreferSymbol: false,
  });

  expect(CIDs).toEqual([
    'bafybeihidcrbkjp23gbwfzxmmlhdbijgv2bht37ddytht65wouqcljizae',
    'QmUEzVeuubU9R1L5GVBEd4npMH4RMy9aWpZHGsNrZVVJF4',
    'QmZmAyAQcX8HMooJDf1VHfftti2MLFq8h3vyW4uGW4UVRa',
    'QmNrhZHUaEqxhyLfqoq1mtHSipkWHeT31LNHb1QEbDHgnc',
  ]);
});
