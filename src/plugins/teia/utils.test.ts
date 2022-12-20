import { createPreviewImageUri, extractCIDsFromMetadata } from './utils';

test('creates signed preview thumbnail uris', async () => {
  expect(
    createPreviewImageUri(
      'ipfs://foo',
      null,
      null,
      null,
      'https://cache.teia.rocks/ipfs',
      'my-salt',
      'my-secret',
      '/rs:fit:640:0:true/format:webp/plain/'
    )
  ).toBe('/ydwWOGkO9y0QBk0giDfzTNXfMZleb7DdjLafDIwLRS8/rs:fit:640:0:true/format:webp/plain/https://cache.teia.rocks/ipfs/foo');
  expect(
    createPreviewImageUri(
      null,
      'ipfs://bar',
      null,
      'image/jpeg',
      'https://cache.teia.rocks/ipfs',
      'my-salt',
      'my-secret',
      '/rs:fit:640:0:true/format:webp/plain/'
    )
  ).toBe('/4iqDkdN8FFSnFMwXJRumxB-YgGsommmQ3kbGimnbwPc/rs:fit:640:0:true/format:webp/plain/https://cache.teia.rocks/ipfs/bar');
  expect(
    createPreviewImageUri(
      null,
      'ipfs://bar',
      null,
      'not_supported',
      'https://cache.teia.rocks/ipfs',
      'my-salt',
      'my-secret',
      '/rs:fit:640:0:true/format:webp/plain/'
    )
  ).toBe(null);
  expect(
    createPreviewImageUri(
      null,
      null,
      'ipfs://baz',
      null,
      'https://cache.teia.rocks/ipfs',
      'my-salt',
      'my-secret',
      '/rs:fit:640:0:true/format:webp/plain/'
    )
  ).toBe('/gcNVj6SXyd7U4JMUUfMp-9cxwYz72mY0u71oO1pW8Hw/rs:fit:640:0:true/format:webp/plain/https://cache.teia.rocks/ipfs/baz');
  expect(
    createPreviewImageUri(
      null,
      null,
      'baz',
      null,
      'https://cache.teia.rocks/ipfs',
      'my-salt',
      'my-secret',
      '/rs:fit:640:0:true/format:webp/plain/'
    )
  ).toBe(null);
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
