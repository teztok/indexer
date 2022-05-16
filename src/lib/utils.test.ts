import { splitsToRoyaltyShares } from './utils';

test('transforms splits into shares', async () => {
  const royalties = '100';
  const splits = [
    {
      pct: '330',
      address: 'tz1WJpBDRGfa21un4yQDKTGXZw561nsGg7Qe',
    },
    {
      pct: '330',
      address: 'tz1T2kiV5nN2socKzCoVeL96yENeasR3rALT',
    },
    {
      pct: '340',
      address: 'tz1ccyUBhy4uv4xcAkLsKheqoeC6xRARkAo5',
    },
  ];

  expect(splitsToRoyaltyShares(splits, royalties)).toStrictEqual({
    decimals: 3,
    shares: {
      tz1WJpBDRGfa21un4yQDKTGXZw561nsGg7Qe: '33',
      tz1T2kiV5nN2socKzCoVeL96yENeasR3rALT: '33',
      tz1ccyUBhy4uv4xcAkLsKheqoeC6xRARkAo5: '34',
    },
  });
});
