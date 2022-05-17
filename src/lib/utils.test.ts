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
    decimals: 6,
    shares: {
      tz1WJpBDRGfa21un4yQDKTGXZw561nsGg7Qe: '33000',
      tz1T2kiV5nN2socKzCoVeL96yENeasR3rALT: '33000',
      tz1ccyUBhy4uv4xcAkLsKheqoeC6xRARkAo5: '34000',
    },
  });
});

test('transforms splits into shares, odd numbers', async () => {
  const royalties = '160';
  const splits = [
    {
      pct: '256',
      address: 'tz1WJpBDRGfa21un4yQDKTGXZw561nsGg7Qe',
    },
    {
      pct: '744',
      address: 'tz1T2kiV5nN2socKzCoVeL96yENeasR3rALT',
    },
  ];

  expect(splitsToRoyaltyShares(splits, royalties)).toStrictEqual({
    decimals: 6,
    shares: {
      tz1WJpBDRGfa21un4yQDKTGXZw561nsGg7Qe: '40960',
      tz1T2kiV5nN2socKzCoVeL96yENeasR3rALT: '119040',
    },
  });
});

test('transforms splits into shares, odd numbers #2', async () => {
  const royalties = '125';
  const splits = [
    {
      pct: '500',
      address: 'tz1WJpBDRGfa21un4yQDKTGXZw561nsGg7Qe',
    },
    {
      pct: '500',
      address: 'tz1T2kiV5nN2socKzCoVeL96yENeasR3rALT',
    },
  ];

  expect(splitsToRoyaltyShares(splits, royalties)).toStrictEqual({
    decimals: 6,
    shares: {
      tz1WJpBDRGfa21un4yQDKTGXZw561nsGg7Qe: '62500',
      tz1T2kiV5nN2socKzCoVeL96yENeasR3rALT: '62500',
    },
  });
});
