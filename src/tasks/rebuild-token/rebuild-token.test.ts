import { compileToken, calcPriceDiff, calcPricePct } from './rebuild-token';
import { AnyEvent } from '../event-producer/handlers/index';

const TEST_FA2_ADDRESS = 'KT1PHubm9HtyQEJ4BBpMTVomq6mhbfNZ9z5w';
const TEST_TOKEN_ID = '1';
const TEST_PRICE = '2000';
const TEST_SWAP_ID = '5';
const TEST_OPHASH = 'opLGZbDreaAqJFCSxsxh8FiyEJK9h4ymhPWBbitydF3Qxgr2Bbr';

test('sets the basic information of the token', () => {
  const events: Array<AnyEvent> = [];
  const { token } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(token).toMatchObject({
    fa2_address: TEST_FA2_ADDRESS,
    token_id: TEST_TOKEN_ID,
    metadata_status: 'unprocessed',
    last_processed_event_id: null,
    last_processed_event_timestamp: null,
    last_processed_event_level: null,
  });
});

test('sets last_processed_event_id and last_processed_event_timestamp properties', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'c4e96250646f5ec6e3ca1c93fcd790a3',
      type: 'HEN_SWAP',
      opid: 43578954,
      ophash: TEST_OPHASH,
      timestamp: '2021-03-21T23:31:18Z',
      level: 1395008,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      seller_address: 'tz1NufWtpqS3nfR8VW1xFyWq4GWqb969keeR',
      swap_id: TEST_SWAP_ID,
      price: TEST_PRICE,
      amount: '80',
    },
    {
      id: 'faa13edecca7cc1294fd1432ad0cfbe3',
      type: 'HEN_COLLECT',
      implements: 'SALE',
      opid: 52568902,
      ophash: TEST_OPHASH,
      timestamp: '2021-05-31T08:08:46Z',
      level: 1495010,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      buyer_address: 'tz1XGTjeqid5naxSviH3CBcfz944qHM6bNeD',
      seller_address: 'tz1NufWtpqS3nfR8VW1xFyWq4GWqb969keeR',
      swap_id: TEST_SWAP_ID,
      amount: '1',
      price: TEST_PRICE,
    },
  ];

  const { token } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(token).toMatchObject({
    last_processed_event_id: 'faa13edecca7cc1294fd1432ad0cfbe3',
    last_processed_event_timestamp: '2021-05-31T08:08:46Z',
    last_processed_event_level: 1495010,
  });
});

test('handles SET_LEDGER events', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'bbbf0d6b108216ca4162179aed96f8f0',
      type: 'SET_LEDGER',
      opid: 42065345,
      ophash: TEST_OPHASH,
      timestamp: '2021-03-01T03:39:21Z',
      level: 1365242,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      holder_address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
      amount: '1',
      is_mint: true,
    },
  ];

  const { token, holders } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(token).toMatchObject({
    minted_at: '2021-03-01T03:39:21Z',
    minter_address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
  });

  expect(holders).toEqual({
    tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw: 1,
  });
});

test('handles SET_METADATA events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '27851a5ec3ce985ce7322f1a6d7891aa',
      type: 'SET_METADATA',
      opid: 42073252,
      ophash: TEST_OPHASH,
      timestamp: '2021-03-01T07:27:27Z',
      level: 1365467,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      metadata_uri: 'ipfs://QmeaqRBUiw4cJiNKEcW2noc7egLd5GgBqLcHHqUhauJAHN',
    },
  ];

  const { token } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(token).toMatchObject({
    metadata_uri: 'ipfs://QmeaqRBUiw4cJiNKEcW2noc7egLd5GgBqLcHHqUhauJAHN',
  });
});

test('handles HEN_MINT events', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'fbf621a7b2f699d41a7a8ca205e1a1be',
      type: 'HEN_MINT',
      opid: 112502347,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-20T08:09:22Z',
      level: 1879134,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      editions: '1',
      artist_address: 'tz1XUcZvBxAMMSqeMsfA4tunmEfTUcbEXQ88',
      royalties: '100',
      metadata_uri: 'ipfs://QmUuZ2GYamdpPE8TUYzQkQC2jjnq7oiYVeZwdKpB4SCarG',
    },
  ];

  const { token } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(token).toMatchObject({
    platform: 'HEN',
    artist_address: 'tz1XUcZvBxAMMSqeMsfA4tunmEfTUcbEXQ88',
    royalties: {
      tz1XUcZvBxAMMSqeMsfA4tunmEfTUcbEXQ88: '100',
    },
  });
});

test('handles HEN_SWAP_V2 and HEN_COLLECT_V2 events', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'fbf621a7b2f699d41a7a8ca205e1a1be',
      type: 'HEN_MINT',
      opid: 112502347,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-20T08:09:22Z',
      level: 1879134,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      editions: '10',
      artist_address: 'tz1c8riGC9WHnrncStfM5jwKyhUwwRfb31hQ',
      royalties: '150',
      metadata_uri: 'ipfs://QmUuZ2GYamdpPE8TUYzQkQC2jjnq7oiYVeZwdKpB4SCarG',
    },
    {
      id: 'e209b0de7efae600d9f9ef8d227b60e6',
      type: 'HEN_SWAP_V2',
      opid: 112502455,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-20T08:09:52Z',
      level: 1879135,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      seller_address: 'tz1Q1UgXfAv2sWNCapibCakdBjB68hk6QuoV',
      artist_address: 'tz1c8riGC9WHnrncStfM5jwKyhUwwRfb31hQ',
      swap_id: TEST_SWAP_ID,
      price: TEST_PRICE,
      royalties: '150',
      amount: '10',
    },
    {
      id: '83c832b52b893f197797b8ed6a9c8b78',
      type: 'HEN_COLLECT_V2',
      implements: 'SALE',
      opid: 112502500,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-21T08:09:52Z',
      level: 1879135,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      swap_id: TEST_SWAP_ID,
      buyer_address: 'tz1Td886MhUexDnvpfdh5YEnbmEy11VCjvtf',
      seller_address: 'tz1Q1UgXfAv2sWNCapibCakdBjB68hk6QuoV',
      artist_address: 'tz1c8riGC9WHnrncStfM5jwKyhUwwRfb31hQ',
      price: TEST_PRICE,
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: 'HEN_SWAP_V2',
      contract_address: 'KT1HbQepzV1nVGg8QVznG7z4RcHseD5kwqBn',
      created_at: '2021-11-20T08:09:52Z',
      swap_id: TEST_SWAP_ID,
      seller_address: 'tz1Q1UgXfAv2sWNCapibCakdBjB68hk6QuoV',
      amount: 10,
      amount_left: 9,
      price: TEST_PRICE,
      status: 'active',
    },
  ]);
});

test('handles HEN_SWAP_V2 and HEN_COLLECT_V2 events, sold out case', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'e209b0de7efae600d9f9ef8d227b60e6',
      type: 'HEN_SWAP_V2',
      opid: 112502455,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-20T08:09:52Z',
      level: 1879135,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      seller_address: 'tz1Q1UgXfAv2sWNCapibCakdBjB68hk6QuoV',
      artist_address: 'tz1c8riGC9WHnrncStfM5jwKyhUwwRfb31hQ',
      swap_id: TEST_SWAP_ID,
      price: TEST_PRICE,
      royalties: '150',
      amount: '1',
    },
    {
      id: '83c832b52b893f197797b8ed6a9c8b78',
      type: 'HEN_COLLECT_V2',
      implements: 'SALE',
      opid: 112502500,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-21T08:09:52Z',
      level: 1879135,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      swap_id: TEST_SWAP_ID,
      buyer_address: 'tz1Td886MhUexDnvpfdh5YEnbmEy11VCjvtf',
      seller_address: 'tz1Q1UgXfAv2sWNCapibCakdBjB68hk6QuoV',
      artist_address: 'tz1c8riGC9WHnrncStfM5jwKyhUwwRfb31hQ',
      price: TEST_PRICE,
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: 'HEN_SWAP_V2',
      contract_address: 'KT1HbQepzV1nVGg8QVznG7z4RcHseD5kwqBn',
      created_at: '2021-11-20T08:09:52Z',
      swap_id: TEST_SWAP_ID,
      seller_address: 'tz1Q1UgXfAv2sWNCapibCakdBjB68hk6QuoV',
      amount: 1,
      amount_left: 0,
      price: TEST_PRICE,
      status: 'sold_out',
    },
  ]);
});

test('removes fraudulent HEN_SWAP_V2 listings where the artist_address does not match', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'fbf621a7b2f699d41a7a8ca205e1a1be',
      type: 'HEN_MINT',
      opid: 112502347,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-20T08:09:22Z',
      level: 1879134,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      editions: '10',
      artist_address: 'tz1c8riGC9WHnrncStfM5jwKyhUwwRfb31hQ',
      royalties: '150',
      metadata_uri: 'ipfs://QmUuZ2GYamdpPE8TUYzQkQC2jjnq7oiYVeZwdKpB4SCarG',
    },
    {
      id: 'e209b0de7efae600d9f9ef8d227b60e6',
      type: 'HEN_SWAP_V2',
      opid: 112502455,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-20T08:09:52Z',
      level: 1879135,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      seller_address: 'tz1Q1UgXfAv2sWNCapibCakdBjB68hk6QuoV',
      artist_address: 'tz1c8riGC9WHnrncStfM5jwKyhUwwRfbfraud',
      swap_id: TEST_SWAP_ID,
      price: TEST_PRICE,
      royalties: '150',
      amount: '10',
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings.length).toBe(0);
});

test('removes fraudulent HEN_SWAP_V2 listings where royalties do not match', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'fbf621a7b2f699d41a7a8ca205e1a1be',
      type: 'HEN_MINT',
      opid: 112502347,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-20T08:09:22Z',
      level: 1879134,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      editions: '10',
      artist_address: 'tz1c8riGC9WHnrncStfM5jwKyhUwwRfb31hQ',
      royalties: '150',
      metadata_uri: 'ipfs://QmUuZ2GYamdpPE8TUYzQkQC2jjnq7oiYVeZwdKpB4SCarG',
    },
    {
      id: 'e209b0de7efae600d9f9ef8d227b60e6',
      type: 'HEN_SWAP_V2',
      opid: 112502455,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-20T08:09:52Z',
      level: 1879135,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      seller_address: 'tz1Q1UgXfAv2sWNCapibCakdBjB68hk6QuoV',
      artist_address: 'tz1c8riGC9WHnrncStfM5jwKyhUwwRfb31hQ',
      swap_id: TEST_SWAP_ID,
      price: TEST_PRICE,
      royalties: '200',
      amount: '10',
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings.length).toBe(0);
});

test('handles HEN_CANCEL_SWAP_V2 events', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'e209b0de7efae600d9f9ef8d227b60e6',
      type: 'HEN_SWAP_V2',
      opid: 112502455,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-20T08:09:52Z',
      level: 1879135,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      seller_address: 'tz1Q1UgXfAv2sWNCapibCakdBjB68hk6QuoV',
      artist_address: 'tz1c8riGC9WHnrncStfM5jwKyhUwwRfb31hQ',
      swap_id: TEST_SWAP_ID,
      price: TEST_PRICE,
      royalties: '150',
      amount: '10',
    },
    {
      id: '46bf43b825f7aecc9157db62615b7a38',
      type: 'HEN_CANCEL_SWAP_V2',
      opid: 112502472,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-20T08:09:52Z',
      level: 1879135,
      fa2_address: TEST_FA2_ADDRESS,
      seller_address: 'tz1Q1UgXfAv2sWNCapibCakdBjB68hk6QuoV',
      artist_address: 'tz1c8riGC9WHnrncStfM5jwKyhUwwRfb31hQ',
      token_id: TEST_TOKEN_ID,
      swap_id: TEST_SWAP_ID,
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: 'HEN_SWAP_V2',
      contract_address: 'KT1HbQepzV1nVGg8QVznG7z4RcHseD5kwqBn',
      created_at: '2021-11-20T08:09:52Z',
      swap_id: TEST_SWAP_ID,
      seller_address: 'tz1Q1UgXfAv2sWNCapibCakdBjB68hk6QuoV',
      amount: 10,
      amount_left: 10,
      price: TEST_PRICE,
      status: 'canceled',
    },
  ]);
});

test('handles TEIA_SWAP and TEIA_COLLECT events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '234f1106ea02a634ecc8332e844ff4e4',
      type: 'TEIA_SWAP',
      opid: 165058185,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-31T16:11:58Z',
      level: 2078143,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      seller_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      artist_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      swap_id: TEST_SWAP_ID,
      price: TEST_PRICE,
      royalties: '200',
      amount: '10',
    },
    {
      id: '49d7b043d413f87043282e2ce0bc5306',
      type: 'TEIA_COLLECT',
      implements: 'SALE',
      opid: 164940000,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-31T11:22:08Z',
      level: 2077595,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      swap_id: TEST_SWAP_ID,
      buyer_address: 'tz1abTpHKkdo5YTM1DosZZVx9p8cjv4hMMTB',
      seller_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      artist_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      price: TEST_PRICE,
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: 'TEIA_SWAP',
      contract_address: 'KT1PHubm9HtyQEJ4BBpMTVomq6mhbfNZ9z5w',
      created_at: '2022-01-31T16:11:58Z',
      swap_id: TEST_SWAP_ID,
      seller_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      amount: 10,
      amount_left: 9,
      price: TEST_PRICE,
      status: 'active',
    },
  ]);
});

test('handles TEIA_SWAP and TEIA_COLLECT events, sold out case', () => {
  const events: Array<AnyEvent> = [
    {
      id: '234f1106ea02a634ecc8332e844ff4e4',
      type: 'TEIA_SWAP',
      opid: 165058185,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-31T16:11:58Z',
      level: 2078143,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      seller_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      artist_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      swap_id: TEST_SWAP_ID,
      price: TEST_PRICE,
      royalties: '200',
      amount: '1',
    },
    {
      id: '49d7b043d413f87043282e2ce0bc5306',
      type: 'TEIA_COLLECT',
      implements: 'SALE',
      opid: 164940000,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-31T11:22:08Z',
      level: 2077595,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      swap_id: TEST_SWAP_ID,
      buyer_address: 'tz1abTpHKkdo5YTM1DosZZVx9p8cjv4hMMTB',
      seller_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      artist_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      price: TEST_PRICE,
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: 'TEIA_SWAP',
      contract_address: 'KT1PHubm9HtyQEJ4BBpMTVomq6mhbfNZ9z5w',
      created_at: '2022-01-31T16:11:58Z',
      swap_id: TEST_SWAP_ID,
      seller_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      amount: 1,
      amount_left: 0,
      price: TEST_PRICE,
      status: 'sold_out',
    },
  ]);
});

test('removes fraudulent TEIA_SWAP listings where the artist_address does not match', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'fbf621a7b2f699d41a7a8ca205e1a1be',
      type: 'HEN_MINT',
      opid: 112502347,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-20T08:09:22Z',
      level: 1879134,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      editions: '10',
      artist_address: 'tz1c8riGC9WHnrncStfM5jwKyhUwwRfb31hQ',
      royalties: '150',
      metadata_uri: 'ipfs://QmUuZ2GYamdpPE8TUYzQkQC2jjnq7oiYVeZwdKpB4SCarG',
    },
    {
      id: '234f1106ea02a634ecc8332e844ff4e4',
      type: 'TEIA_SWAP',
      opid: 165058185,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-31T16:11:58Z',
      level: 2078143,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      seller_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      artist_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicfraud',
      swap_id: TEST_SWAP_ID,
      price: TEST_PRICE,
      royalties: '150',
      amount: '10',
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings.length).toBe(0);
});

test('removes fraudulent TEIA_SWAP listings where royalties do not match', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'fbf621a7b2f699d41a7a8ca205e1a1be',
      type: 'HEN_MINT',
      opid: 112502347,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-20T08:09:22Z',
      level: 1879134,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      editions: '10',
      artist_address: 'tz1c8riGC9WHnrncStfM5jwKyhUwwRfb31hQ',
      royalties: '150',
      metadata_uri: 'ipfs://QmUuZ2GYamdpPE8TUYzQkQC2jjnq7oiYVeZwdKpB4SCarG',
    },
    {
      id: '234f1106ea02a634ecc8332e844ff4e4',
      type: 'TEIA_SWAP',
      opid: 165058185,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-31T16:11:58Z',
      level: 2078143,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      seller_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      artist_address: 'tz1c8riGC9WHnrncStfM5jwKyhUwwRfb31hQ',
      swap_id: TEST_SWAP_ID,
      price: TEST_PRICE,
      royalties: '200',
      amount: '10',
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings.length).toBe(0);
});

test('handles TEIA_CANCEL_SWAP events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '234f1106ea02a634ecc8332e844ff4e4',
      type: 'TEIA_SWAP',
      opid: 165058185,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-31T16:11:58Z',
      level: 2078143,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      seller_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      artist_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      swap_id: TEST_SWAP_ID,
      price: TEST_PRICE,
      royalties: '200',
      amount: '10',
    },
    {
      id: '3f04007fa97e43d9fc20c40499ee0860',
      type: 'TEIA_CANCEL_SWAP',
      opid: 165053001,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-31T16:00:18Z',
      level: 2078122,
      fa2_address: TEST_FA2_ADDRESS,
      seller_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      artist_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      token_id: TEST_TOKEN_ID,
      swap_id: TEST_SWAP_ID,
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: 'TEIA_SWAP',
      contract_address: 'KT1PHubm9HtyQEJ4BBpMTVomq6mhbfNZ9z5w',
      created_at: '2022-01-31T16:11:58Z',
      swap_id: TEST_SWAP_ID,
      seller_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      amount: 10,
      amount_left: 10,
      price: TEST_PRICE,
      status: 'canceled',
    },
  ]);
});

test('handles OBJKT_MINT_ARTIST events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '13c2af1e341001696d0a94f320bfec6c',
      type: 'OBJKT_MINT_ARTIST',
      opid: 114017578,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-23T14:31:52Z',
      level: 1888131,
      fa2_address: TEST_FA2_ADDRESS,
      artist_address: 'tz1UxW1chiPvekzf23ze4L17JY26jTUtHsMF',
      collection_id: '2437',
      token_id: TEST_TOKEN_ID,
      editions: '15',
      metadata_uri: 'ipfs://QmcHwHXw4JLFHmigUjPxqWrDXvroMDDNypujLaK3uvKxd8',
    },
  ];

  const { token } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(token).toMatchObject({
    platform: 'OBJKT',
    artist_address: 'tz1UxW1chiPvekzf23ze4L17JY26jTUtHsMF',
    objkt_artist_collection_id: '2437',
  });
});

test('handles OBJKT_ASK and OBJKT_FULFILL_ASK events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '975c5351cc29693ee08116298e1bae19',
      type: 'OBJKT_ASK',
      opid: 112502089,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-20T08:08:22Z',
      level: 1879132,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      ask_id: TEST_SWAP_ID,
      seller_address: 'tz1VQAVjmKiDknLcihr5LQ5yNeRjtK6oQPjJ',
      artist_address: 'tz1VQAVjmKiDknLcihr5LQ5yNeRjtK6oQPjJ',
      royalties: '100',
      price: TEST_PRICE,
      amount: '28',
    },
    {
      id: 'e8c44ce566ba34356dc0c06586721b7e',
      type: 'OBJKT_FULFILL_ASK',
      implements: 'SALE',
      opid: 112502358,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-20T08:09:22Z',
      level: 1879134,
      price: TEST_PRICE,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      ask_id: TEST_SWAP_ID,
      seller_address: 'tz1VQAVjmKiDknLcihr5LQ5yNeRjtK6oQPjJ',
      buyer_address: 'tz2BGeJJpQGg2FL3nB5fjMVT2gSdtC9i7ges',
      artist_address: 'tz1VQAVjmKiDknLcihr5LQ5yNeRjtK6oQPjJ',
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: 'OBJKT_ASK',
      contract_address: 'KT1FvqJwEDWb1Gwc55Jd1jjTHRVWbYKUUpyq',
      created_at: '2021-11-20T08:08:22Z',
      ask_id: TEST_SWAP_ID,
      seller_address: 'tz1VQAVjmKiDknLcihr5LQ5yNeRjtK6oQPjJ',
      amount: 28,
      amount_left: 27,
      price: TEST_PRICE,
      status: 'active',
    },
  ]);
});

test('handles OBJKT_ASK and OBJKT_FULFILL_ASK events, sold out case', () => {
  const events: Array<AnyEvent> = [
    {
      id: '975c5351cc29693ee08116298e1bae19',
      type: 'OBJKT_ASK',
      opid: 112502089,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-20T08:08:22Z',
      level: 1879132,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      ask_id: TEST_SWAP_ID,
      seller_address: 'tz1VQAVjmKiDknLcihr5LQ5yNeRjtK6oQPjJ',
      artist_address: 'tz1VQAVjmKiDknLcihr5LQ5yNeRjtK6oQPjJ',
      royalties: '100',
      price: TEST_PRICE,
      amount: '1',
    },
    {
      id: 'e8c44ce566ba34356dc0c06586721b7e',
      type: 'OBJKT_FULFILL_ASK',
      implements: 'SALE',
      opid: 112502358,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-20T08:09:22Z',
      level: 1879134,
      price: TEST_PRICE,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      ask_id: TEST_SWAP_ID,
      seller_address: 'tz1VQAVjmKiDknLcihr5LQ5yNeRjtK6oQPjJ',
      buyer_address: 'tz2BGeJJpQGg2FL3nB5fjMVT2gSdtC9i7ges',
      artist_address: 'tz1VQAVjmKiDknLcihr5LQ5yNeRjtK6oQPjJ',
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: 'OBJKT_ASK',
      contract_address: 'KT1FvqJwEDWb1Gwc55Jd1jjTHRVWbYKUUpyq',
      created_at: '2021-11-20T08:08:22Z',
      ask_id: TEST_SWAP_ID,
      seller_address: 'tz1VQAVjmKiDknLcihr5LQ5yNeRjtK6oQPjJ',
      amount: 1,
      amount_left: 0,
      price: TEST_PRICE,
      status: 'sold_out',
    },
  ]);
});

test('handles OBJKT_RETRACT_ASK events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '975c5351cc29693ee08116298e1bae19',
      type: 'OBJKT_ASK',
      opid: 112502089,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-20T08:08:22Z',
      level: 1879132,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      ask_id: TEST_SWAP_ID,
      seller_address: 'tz1VQAVjmKiDknLcihr5LQ5yNeRjtK6oQPjJ',
      artist_address: 'tz1VQAVjmKiDknLcihr5LQ5yNeRjtK6oQPjJ',
      royalties: '100',
      price: TEST_PRICE,
      amount: '28',
    },
    {
      id: '55aba6d3c44a18470a7b517fc328bc04',
      type: 'OBJKT_RETRACT_ASK',
      opid: 112502627,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-20T08:10:22Z',
      level: 1879136,
      fa2_address: TEST_FA2_ADDRESS,
      seller_address: 'tz1ioqD76urZw1oY5CUXDjzfp1uPqSNrgKC1',
      artist_address: 'tz1dCmVe2mLsHrt1fmDvs64wpeLtsdJJnbAN',
      token_id: TEST_TOKEN_ID,
      ask_id: TEST_SWAP_ID,
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: 'OBJKT_ASK',
      contract_address: 'KT1FvqJwEDWb1Gwc55Jd1jjTHRVWbYKUUpyq',
      created_at: '2021-11-20T08:08:22Z',
      ask_id: TEST_SWAP_ID,
      seller_address: 'tz1VQAVjmKiDknLcihr5LQ5yNeRjtK6oQPjJ',
      amount: 28,
      amount_left: 28,
      price: TEST_PRICE,
      status: 'canceled',
    },
  ]);
});

test('handles OBJKT_ASK_V2 and OBJKT_FULFILL_ASK_V2 events', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'bbbf0d6b108216ca4162179aed96f8f0',
      type: 'SET_LEDGER',
      opid: 1,
      ophash: TEST_OPHASH,
      timestamp: '2021-01-01T03:39:21Z',
      level: 1365242,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      holder_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      amount: '10',
      is_mint: true,
    },
    {
      id: '22af9d5162ba6343a8ebaefe8de0e606',
      type: 'OBJKT_ASK_V2',
      opid: 170773706,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-10T13:01:54Z',
      level: 2105745,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      ask_id: TEST_SWAP_ID,
      seller_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      currency: 'tez',
      price: TEST_PRICE,
      amount: '10',
    },
    {
      id: '9909b01937459a2ba0d6facf413b5ee1',
      type: 'OBJKT_FULFILL_ASK_V2',
      implements: 'SALE',
      opid: 170995822,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-10T18:48:24Z',
      level: 2106438,
      price: TEST_PRICE,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      ask_id: TEST_SWAP_ID,
      seller_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      buyer_address: 'tz1cgAJDiPHM8HYX8nfvRuXgaBEZeJFgGw3K',
      amount: '1',
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: 'OBJKT_ASK_V2',
      contract_address: 'KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC',
      created_at: '2022-02-10T13:01:54Z',
      ask_id: TEST_SWAP_ID,
      seller_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      amount: 10,
      amount_left: 9,
      price: TEST_PRICE,
      currency: 'tez',
      status: 'active',
    },
  ]);
});

test('handles OBJKT_ASK_V2 and OBJKT_FULFILL_ASK_V2 events, sold out case', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'bbbf0d6b108216ca4162179aed96f8f0',
      type: 'SET_LEDGER',
      opid: 1,
      ophash: TEST_OPHASH,
      timestamp: '2021-01-01T03:39:21Z',
      level: 1365242,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      holder_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      amount: '10',
      is_mint: true,
    },
    {
      id: '22af9d5162ba6343a8ebaefe8de0e606',
      type: 'OBJKT_ASK_V2',
      opid: 170773706,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-10T13:01:54Z',
      level: 2105745,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      ask_id: TEST_SWAP_ID,
      seller_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      currency: 'tez',
      price: TEST_PRICE,
      amount: '1',
    },
    {
      id: '9909b01937459a2ba0d6facf413b5ee1',
      type: 'OBJKT_FULFILL_ASK_V2',
      implements: 'SALE',
      opid: 170995822,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-10T18:48:24Z',
      level: 2106438,
      price: TEST_PRICE,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      ask_id: TEST_SWAP_ID,
      seller_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      buyer_address: 'tz1cgAJDiPHM8HYX8nfvRuXgaBEZeJFgGw3K',
      amount: '1',
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: 'OBJKT_ASK_V2',
      contract_address: 'KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC',
      created_at: '2022-02-10T13:01:54Z',
      ask_id: TEST_SWAP_ID,
      seller_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      amount: 1,
      amount_left: 0,
      price: TEST_PRICE,
      currency: 'tez',
      status: 'sold_out',
    },
  ]);
});

test('handles OBJKT_RETRACT_ASK_V2 events', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'bbbf0d6b108216ca4162179aed96f8f0',
      type: 'SET_LEDGER',
      opid: 1,
      ophash: TEST_OPHASH,
      timestamp: '2021-01-01T03:39:21Z',
      level: 1365242,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      holder_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      amount: '10',
      is_mint: true,
    },
    {
      id: '22af9d5162ba6343a8ebaefe8de0e606',
      type: 'OBJKT_ASK_V2',
      opid: 170773706,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-10T13:01:54Z',
      level: 2105745,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      ask_id: TEST_SWAP_ID,
      seller_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      currency: 'tez',
      price: TEST_PRICE,
      amount: '10',
    },
    {
      id: 'fe0383a5510b522499102bf7be229feb',
      type: 'OBJKT_RETRACT_ASK_V2',
      opid: 170780901,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-10T13:13:24Z',
      level: 2105768,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      seller_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      ask_id: TEST_SWAP_ID,
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toMatchObject([
    {
      type: 'OBJKT_ASK_V2',
      contract_address: 'KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC',
      created_at: '2022-02-10T13:01:54Z',
      ask_id: TEST_SWAP_ID,
      seller_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      amount: 10,
      amount_left: 10,
      price: TEST_PRICE,
      currency: 'tez',
      status: 'canceled',
    },
  ]);
});

test('handles OBJKT_ASK_V2 events, case where the seller transferred the token while the listing is still active', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'bbbf0d6b108216ca4162179aed96f8f0',
      type: 'SET_LEDGER',
      opid: 1,
      ophash: TEST_OPHASH,
      timestamp: '2021-01-01T03:39:21Z',
      level: 1365242,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      holder_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      amount: '10',
      is_mint: true,
    },
    {
      id: '22af9d5162ba6343a8ebaefe8de0e606',
      type: 'OBJKT_ASK_V2',
      opid: 170773706,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-10T13:01:54Z',
      level: 2105745,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      ask_id: TEST_SWAP_ID,
      seller_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      currency: 'tez',
      price: TEST_PRICE,
      amount: '10',
    },
    {
      id: 'bbbf0d6b108216ca4162179aed96f8f0',
      type: 'SET_LEDGER',
      opid: 1,
      ophash: TEST_OPHASH,
      timestamp: '2021-01-01T03:39:21Z',
      level: 1365242,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      holder_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      amount: '0',
      is_mint: false,
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toMatchObject([
    {
      type: 'OBJKT_ASK_V2',
      contract_address: 'KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC',
      created_at: '2022-02-10T13:01:54Z',
      ask_id: TEST_SWAP_ID,
      seller_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      amount: 10,
      amount_left: 0,
      price: TEST_PRICE,
      currency: 'tez',
      status: 'sold_out', // technically it's not sold_out, because the tokens were just transferred
    },
  ]);
});

test('handles OBJKT_BID and OBJKT_FULFILL_BID events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '6527967e1eb9f9161bf1bd9bba35a8a8',
      type: 'OBJKT_BID',
      opid: 57748983,
      ophash: TEST_OPHASH,
      timestamp: '2021-06-30T23:14:02Z',
      level: 1538313,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      bid_id: TEST_SWAP_ID,
      buyer_address: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
      artist_address: 'tz1aWL8AMR6CH4NMdUuiLekQbQ5TPYMzvtuQ',
      royalties: '200',
      price: TEST_PRICE,
    },
    {
      id: '18086521a42e1aa5510678a04a9c428b',
      type: 'OBJKT_FULFILL_BID',
      implements: 'SALE',
      opid: 57868742,
      ophash: TEST_OPHASH,
      timestamp: '2021-07-01T20:33:38Z',
      level: 1539503,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      bid_id: TEST_SWAP_ID,
      price: TEST_PRICE,
      seller_address: 'tz1WybfACSmvJfjz1NGHtshLvhLkNJtUfNzN',
      buyer_address: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
      artist_address: 'tz1aWL8AMR6CH4NMdUuiLekQbQ5TPYMzvtuQ',
    },
  ];

  const { offers, token } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(token.highest_offer_price).toBe(null);

  expect(offers).toEqual([
    {
      type: 'OBJKT_BID',
      contract_address: 'KT1FvqJwEDWb1Gwc55Jd1jjTHRVWbYKUUpyq',
      created_at: '2021-06-30T23:14:02Z',
      bid_id: TEST_SWAP_ID,
      buyer_address: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
      price: TEST_PRICE,
      status: 'fulfilled',
    },
  ]);
});

test('handles OBJKT_RETRACT_BID events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '6527967e1eb9f9161bf1bd9bba35a8a8',
      type: 'OBJKT_BID',
      opid: 57748983,
      ophash: TEST_OPHASH,
      timestamp: '2021-06-30T23:14:02Z',
      level: 1538313,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      bid_id: TEST_SWAP_ID,
      buyer_address: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
      artist_address: 'tz1aWL8AMR6CH4NMdUuiLekQbQ5TPYMzvtuQ',
      royalties: '200',
      price: TEST_PRICE,
    },
    {
      id: 'a2d44572b30d2164565cc9544531c144',
      type: 'OBJKT_RETRACT_BID',
      opid: 57865771,
      ophash: TEST_OPHASH,
      timestamp: '2021-07-01T20:10:38Z',
      level: 1539482,
      fa2_address: TEST_FA2_ADDRESS,
      buyer_address: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
      artist_address: 'tz1aWL8AMR6CH4NMdUuiLekQbQ5TPYMzvtuQ',
      token_id: TEST_TOKEN_ID,
      bid_id: TEST_SWAP_ID,
    },
  ];

  const { offers } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(offers).toEqual([
    {
      type: 'OBJKT_BID',
      contract_address: 'KT1FvqJwEDWb1Gwc55Jd1jjTHRVWbYKUUpyq',
      created_at: '2021-06-30T23:14:02Z',
      bid_id: TEST_SWAP_ID,
      buyer_address: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
      price: TEST_PRICE,
      status: 'canceled',
    },
  ]);
});

test('handles OBJKT_OFFER and OBJKT_FULFILL_OFFER events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '20d0768554f43551632182f124a1dcc3',
      type: 'OBJKT_OFFER',
      opid: 170991604,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-10T18:39:24Z',
      level: 2106420,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      offer_id: TEST_SWAP_ID,
      buyer_address: 'tz2A1H2nqwm2ZYzyRsFs1iWPsCjdmWd4Srmz',
      price: TEST_PRICE,
      currency: 'tez',
    },
    {
      id: '6912624af7a500ed5b0fb043d1fc3b20',
      type: 'OBJKT_FULFILL_OFFER',
      implements: 'SALE',
      opid: 171012851,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-10T19:35:24Z',
      level: 2106532,
      price: TEST_PRICE,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      offer_id: TEST_SWAP_ID,
      seller_address: 'tz2PSYEYJff71Vi2qnUd5kUu7efMRzaCEnK2',
      buyer_address: 'tz2A1H2nqwm2ZYzyRsFs1iWPsCjdmWd4Srmz',
    },
  ];

  const { offers } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(offers).toEqual([
    {
      type: 'OBJKT_OFFER',
      contract_address: 'KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC',
      created_at: '2022-02-10T18:39:24Z',
      offer_id: TEST_SWAP_ID,
      buyer_address: 'tz2A1H2nqwm2ZYzyRsFs1iWPsCjdmWd4Srmz',
      price: TEST_PRICE,
      status: 'fulfilled',
    },
  ]);
});

test('handles OBJKT_RETRACT_OFFER events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '20d0768554f43551632182f124a1dcc3',
      type: 'OBJKT_OFFER',
      opid: 170991604,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-10T18:39:24Z',
      level: 2106420,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      offer_id: TEST_SWAP_ID,
      buyer_address: 'tz2A1H2nqwm2ZYzyRsFs1iWPsCjdmWd4Srmz',
      price: TEST_PRICE,
      currency: 'tez',
    },
    {
      id: 'bb47c9392cbb7ddbc34c57daa75ea11c',
      type: 'OBJKT_RETRACT_OFFER',
      opid: 171015759,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-10T19:42:54Z',
      level: 2106547,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      buyer_address: 'tz1hCvVuMuQgbuii9QUcWRPcZZmdv988odhY',
      offer_id: TEST_SWAP_ID,
    },
  ];

  const { offers } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(offers).toMatchObject([
    {
      type: 'OBJKT_OFFER',
      contract_address: 'KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC',
      created_at: '2022-02-10T18:39:24Z',
      offer_id: TEST_SWAP_ID,
      buyer_address: 'tz2A1H2nqwm2ZYzyRsFs1iWPsCjdmWd4Srmz',
      price: TEST_PRICE,
      status: 'canceled',
    },
  ]);
});

test('handles FX_MINT events', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'be7400d5607a33e269818e23002f1e14',
      type: 'FX_MINT',
      implements: 'SALE',
      opid: 104481628,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-03T16:52:32Z',
      level: 1832759,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      editions: '1',
      artist_address: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
      buyer_address: 'tz1VP6GUGdHdjCLzVFqRjBwsie3uw5UM4D1p',
      seller_address: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
      issuer_id: '0',
      iteration: '3',
      royalties: '100',
      price: TEST_PRICE,
      metadata_uri: 'ipfs://QmaAhB1eWrpUdahZZhtWhLpp4wzq9g4unheP9oz4HenpLQ',
    },
  ];

  const { token } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(token).toMatchObject({
    platform: 'FXHASH',
    artist_address: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
    fx_issuer_id: '0',
    fx_iteration: '3',
    royalties: {
      tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv: '100',
    },
  });
});

test('handles FX_MINT_V2 events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '554a3b44246492d7001402559134fece',
      type: 'FX_MINT_V2',
      implements: 'SALE',
      opid: 134087297,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-05T01:21:30Z',
      level: 2004105,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      editions: '1',
      artist_address: 'tz1g2ZxQbaePfmpSwPQNRVNaF5aJdVmZWZgL',
      buyer_address: 'tz1fyPAaCtU5nQ8SAW6QLnCHjSarXzNKjFd6',
      seller_address: 'tz1fyPAaCtU5nQ8SAW6QLnCHjSarXzNKjFd6',
      issuer_id: '5352',
      iteration: '128',
      royalties: '200',
      price: TEST_PRICE,
      metadata_uri: 'ipfs://QmaAhB1eWrpUdahZZhtWhLpp4wzq9g4unheP9oz4HenpLQ',
    },
  ];

  const { token } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(token).toMatchObject({
    platform: 'FXHASH',
    artist_address: 'tz1g2ZxQbaePfmpSwPQNRVNaF5aJdVmZWZgL',
    fx_issuer_id: '5352',
    fx_iteration: '128',
    royalties: {
      tz1g2ZxQbaePfmpSwPQNRVNaF5aJdVmZWZgL: '200',
    },
  });
});

test('handles FX_OFFER and FX_COLLECT events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '09dc1892db6dd3292ebafe02633593bd',
      type: 'FX_OFFER',
      opid: 108176851,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-11T02:31:38Z',
      level: 1853427,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      offer_id: TEST_SWAP_ID,
      artist_address: 'tz1PoDdN2oyRyF6DA73zTWAWYhNL4UGr3Egj',
      seller_address: 'tz1X1vYvUhXRuedJigE8aFY5ALDnbQPd1MeR',
      royalties: '100',
      price: TEST_PRICE,
    },
    {
      id: '4f40de0024177327dc0653206a0c9678',
      type: 'FX_COLLECT',
      implements: 'SALE',
      opid: 108221561,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-11T05:03:18Z',
      level: 1853721,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      offer_id: TEST_SWAP_ID,
      artist_address: 'tz1SawhUHXWjiGK8gPK6QPmn95G8PkkSjA3S',
      seller_address: 'tz1X1vYvUhXRuedJigE8aFY5ALDnbQPd1MeR',
      buyer_address: 'tz1UXV2pDd8DM3Jicru3o6fZZfHeKnBYbs4H',
      price: TEST_PRICE,
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toMatchObject([
    {
      type: 'FX_OFFER',
      contract_address: 'KT1Xo5B7PNBAeynZPmca4bRh6LQow4og1Zb9',
      created_at: '2021-11-11T02:31:38Z',
      offer_id: TEST_SWAP_ID,
      seller_address: 'tz1X1vYvUhXRuedJigE8aFY5ALDnbQPd1MeR',
      amount: 1,
      amount_left: 0,
      price: TEST_PRICE,
      status: 'sold_out',
    },
  ]);
});

test('handles FX_CANCEL_OFFER events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '09dc1892db6dd3292ebafe02633593bd',
      type: 'FX_OFFER',
      opid: 108176851,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-11T02:31:38Z',
      level: 1853427,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      offer_id: TEST_SWAP_ID,
      artist_address: 'tz1PoDdN2oyRyF6DA73zTWAWYhNL4UGr3Egj',
      seller_address: 'tz1X1vYvUhXRuedJigE8aFY5ALDnbQPd1MeR',
      royalties: '100',
      price: TEST_PRICE,
    },
    {
      id: '1827a4f5e8c51832e1c5598f1932f3bf',
      type: 'FX_CANCEL_OFFER',
      opid: 108312464,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-11T10:26:38Z',
      level: 18543631,
      fa2_address: TEST_FA2_ADDRESS,
      seller_address: 'tz1WZuFdbESHfBSvoBeao1Wkt7NCyUuXAT9D',
      artist_address: 'tz1U9ZoiU5HRvQD29kjK1roSUiLDamMrjDJ9',
      token_id: TEST_TOKEN_ID,
      offer_id: TEST_SWAP_ID,
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: 'FX_OFFER',
      contract_address: 'KT1Xo5B7PNBAeynZPmca4bRh6LQow4og1Zb9',
      created_at: '2021-11-11T02:31:38Z',
      offer_id: TEST_SWAP_ID,
      seller_address: 'tz1X1vYvUhXRuedJigE8aFY5ALDnbQPd1MeR',
      amount: 1,
      amount_left: 1,
      price: TEST_PRICE,
      status: 'canceled',
    },
  ]);
});

test('handles VERSUM_MINT events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '7789e974871b157d3dd3ef4db60c2410',
      type: 'VERSUM_MINT',
      opid: 137729490,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-12T00:14:30Z',
      level: 2023174,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      editions: '10000',
      artist_address: 'tz1QjLDuXQrFL2kQyT7NVUXKi1E3U998CmCg',
      royalties: '200',
      metadata_uri: 'ipfs://QmTf4ojdFM53o4x62Yc3jjfitHxJ1S7yrttpTctmwZKYrh',
    },
  ];

  const { token } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(token).toMatchObject({
    platform: 'VERSUM',
    artist_address: 'tz1QjLDuXQrFL2kQyT7NVUXKi1E3U998CmCg',
  });
});

test('handles VERSUM_SWAP and VERSUM_COLLECT_SWAP events', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'a7024b237e0a8fbcaea2ca7c3f13e58f',
      type: 'VERSUM_SWAP',
      opid: 137968317,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-12T11:31:40Z',
      level: 2024493,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      seller_address: 'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
      swap_id: TEST_SWAP_ID,
      start_price: TEST_PRICE,
      end_price: TEST_PRICE,
      amount: '19',
      end_time: '2022-01-13T11:31:40Z',
      burn_on_end: false,
    },
    {
      id: 'ae92a3dd0fb91abf83c49dcc32849f7a',
      type: 'VERSUM_COLLECT_SWAP',
      implements: 'SALE',
      opid: 137973176,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-12T11:46:40Z',
      level: 2024523,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      swap_id: TEST_SWAP_ID,
      buyer_address: 'tz1fb6jz7rh4H7AojLShvhiXKaSNDyvkH7sM',
      seller_address: 'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
      price: TEST_PRICE,
      amount: '1',
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: 'VERSUM_SWAP',
      contract_address: 'KT1GyRAJNdizF1nojQz62uGYkx8WFRUJm9X5',
      created_at: '2022-01-12T11:31:40Z',
      swap_id: TEST_SWAP_ID,
      seller_address: 'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
      amount: 19,
      amount_left: 18,
      price: TEST_PRICE,
      start_price: TEST_PRICE,
      end_price: TEST_PRICE,
      burn_on_end: false,
      end_time: '2022-01-13T11:31:40Z',
      status: 'active',
    },
  ]);
});

test('handles VERSUM_SWAP and VERSUM_COLLECT_SWAP events, sold out case', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'a7024b237e0a8fbcaea2ca7c3f13e58f',
      type: 'VERSUM_SWAP',
      opid: 137968317,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-12T11:31:40Z',
      level: 2024493,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      seller_address: 'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
      swap_id: TEST_SWAP_ID,
      start_price: TEST_PRICE,
      end_price: TEST_PRICE,
      amount: '19',
      end_time: '2022-01-13T11:31:40Z',
      burn_on_end: false,
    },
    {
      id: 'ae92a3dd0fb91abf83c49dcc32849f7a',
      type: 'VERSUM_COLLECT_SWAP',
      implements: 'SALE',
      opid: 137973176,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-12T11:46:40Z',
      level: 2024523,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      swap_id: TEST_SWAP_ID,
      buyer_address: 'tz1fb6jz7rh4H7AojLShvhiXKaSNDyvkH7sM',
      seller_address: 'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
      price: TEST_PRICE,
      amount: '19',
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: 'VERSUM_SWAP',
      contract_address: 'KT1GyRAJNdizF1nojQz62uGYkx8WFRUJm9X5',
      created_at: '2022-01-12T11:31:40Z',
      swap_id: TEST_SWAP_ID,
      seller_address: 'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
      amount: 19,
      amount_left: 0,
      price: TEST_PRICE,
      start_price: TEST_PRICE,
      end_price: TEST_PRICE,
      status: 'sold_out',
      burn_on_end: false,
      end_time: '2022-01-13T11:31:40Z',
    },
  ]);
});

test('handles VERSUM_CANCEL_SWAP events', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'a7024b237e0a8fbcaea2ca7c3f13e58f',
      type: 'VERSUM_SWAP',
      opid: 137968317,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-12T11:31:40Z',
      level: 2024493,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      seller_address: 'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
      swap_id: TEST_SWAP_ID,
      start_price: TEST_PRICE,
      end_price: TEST_PRICE,
      amount: '19',
      end_time: '2022-01-13T11:31:40Z',
      burn_on_end: false,
    },
    {
      id: '574dc83f1eee4120ac0318be9b88f53f',
      type: 'VERSUM_CANCEL_SWAP',
      opid: 137968798,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-12T11:33:10Z',
      level: 2024496,
      fa2_address: TEST_FA2_ADDRESS,
      seller_address: 'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
      //artist_address: 'tz1ZAzUws7fduRQNHRKsaxnq8sKoM1RbdgDq',
      token_id: TEST_TOKEN_ID,
      swap_id: TEST_SWAP_ID,
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: 'VERSUM_SWAP',
      contract_address: 'KT1GyRAJNdizF1nojQz62uGYkx8WFRUJm9X5',
      created_at: '2022-01-12T11:31:40Z',
      swap_id: TEST_SWAP_ID,
      seller_address: 'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
      amount: 19,
      amount_left: 19,
      price: TEST_PRICE,
      start_price: TEST_PRICE,
      end_price: TEST_PRICE,
      status: 'canceled',
      burn_on_end: false,
      end_time: '2022-01-13T11:31:40Z',
    },
  ]);
});

test('handles VERSUM_MAKE_OFFER and VERSUM_ACCEPT_OFFER events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '713b7a038e6fd989d286263ef628fffd',
      type: 'VERSUM_MAKE_OFFER',
      opid: 138091385,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-12T17:02:50Z',
      level: 2025153,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      offer_id: TEST_SWAP_ID,
      buyer_address: 'tz1NBAh46Vyz7CdNLpnZ68jpN6nBFH4LSboy',
      //artist_address: 'tz1aWL8AMR6CH4NMdUuiLekQbQ5TPYMzvtuQ',
      //royalties: '200',
      price: TEST_PRICE,
      amount: '1',
    },
    {
      id: '802cd42c75cea1519d22232fe1bd27f0',
      type: 'VERSUM_ACCEPT_OFFER',
      implements: 'SALE',
      opid: 138277717,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-13T01:19:50Z',
      level: 2026133,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      offer_id: TEST_SWAP_ID,
      buyer_address: 'tz1NBAh46Vyz7CdNLpnZ68jpN6nBFH4LSboy',
      seller_address: 'tz1cALmpTf7EeeSBXHAX2rcnR4WAP8tSWkt6',
      price: TEST_PRICE,
      amount: '1',
    },
  ];

  const { offers } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(offers).toEqual([
    {
      type: 'VERSUM_OFFER',
      contract_address: 'KT1GyRAJNdizF1nojQz62uGYkx8WFRUJm9X5',
      created_at: '2022-01-12T17:02:50Z',
      offer_id: TEST_SWAP_ID,
      buyer_address: 'tz1NBAh46Vyz7CdNLpnZ68jpN6nBFH4LSboy',
      price: TEST_PRICE,
      amount: 1,
      status: 'fulfilled',
    },
  ]);
});

test('handles VERSUM_CANCEL_OFFER events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '713b7a038e6fd989d286263ef628fffd',
      type: 'VERSUM_MAKE_OFFER',
      opid: 138091385,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-12T17:02:50Z',
      level: 2025153,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      offer_id: TEST_SWAP_ID,
      buyer_address: 'tz1NBAh46Vyz7CdNLpnZ68jpN6nBFH4LSboy',
      //artist_address: 'tz1aWL8AMR6CH4NMdUuiLekQbQ5TPYMzvtuQ',
      //royalties: '200',
      price: TEST_PRICE,
      amount: '1',
    },
    {
      id: 'ce6e23490d06cdea60e5fb10b4be132c',
      type: 'VERSUM_CANCEL_OFFER',
      opid: 138283703,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-13T01:39:50Z',
      level: 2026173,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      offer_id: TEST_SWAP_ID,
      buyer_address: 'tz1Ym9Ued9v2N2wwsrtQ52HRGGn7qDmzuUZU',
      //seller_address: 'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
      //artist_address: 'tz2TG7nYDasJzWPrLgbk7f3D4uyHo2ADdWgB',
      price: TEST_PRICE,
      amount: '1',
    },
  ];

  const { offers } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(offers).toEqual([
    {
      type: 'VERSUM_OFFER',
      contract_address: 'KT1GyRAJNdizF1nojQz62uGYkx8WFRUJm9X5',
      created_at: '2022-01-12T17:02:50Z',
      offer_id: TEST_SWAP_ID,
      buyer_address: 'tz1NBAh46Vyz7CdNLpnZ68jpN6nBFH4LSboy',
      price: TEST_PRICE,
      amount: 1,
      status: 'canceled',
    },
  ]);
});

test('sets the token metadata correctly', () => {
  const metadata = {
    symbol: ' OBJKT',
    name: 'something great',
    artifactUri: 'ipfs://aaa',
    displayUri: 'ipfs://bbb',
    thumbnailUri: 'ipfs://ccc',
    externalUri: 'ipfs://ddd',
    formats: [{ mimeType: 'video/mp4' }],
    rights: 'MIT',
    rightUri: 'ipfs://eee',
    creators: ['aaa'],
    contributors: ['bbb'],
    tags: ['aaaa', 'bbbb'],
    attributes: [
      { name: 'foo', val: 'foo val' },
      { name: 'bar', val: 'bar val' },
    ],
  };

  const { token, tags } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, [], 'processed', metadata as any);

  expect(token).toMatchObject({
    metadata_status: 'processed',
    symbol: 'OBJKT',
    name: 'something great',
    artifact_uri: 'ipfs://aaa',
    display_uri: 'ipfs://bbb',
    thumbnail_uri: 'ipfs://ccc',
    external_uri: 'ipfs://ddd',
    mime_type: 'video/mp4',
    rights: 'MIT',
    right_uri: 'ipfs://eee',
    creators: ['aaa'],
    contributors: ['bbb'],
    attributes: [
      {
        name: 'foo',
        val: 'foo val',
      },
      {
        name: 'bar',
        val: 'bar val',
      },
    ],
  });

  expect(tags).toEqual(['aaaa', 'bbbb']);
});

test('calculates price related properties correctly', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'e209b0de7efae600d9f9ef8d227b60e6',
      type: 'HEN_SWAP_V2',
      opid: 112502455,
      ophash: TEST_OPHASH,
      timestamp: '2021-11-20T08:09:52Z',
      level: 1879135,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '545194',
      seller_address: 'tz1Q1UgXfAv2sWNCapibCakdBjB68hk6QuoV',
      artist_address: 'tz1c8riGC9WHnrncStfM5jwKyhUwwRfb31hQ',
      swap_id: '1626767',
      price: '1830000',
      royalties: '150',
      amount: '1',
    },
    {
      id: 'a7024b237e0a8fbcaea2ca7c3f13e58f',
      type: 'VERSUM_SWAP',
      opid: 137968317,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-12T11:31:40Z',
      level: 2024493,
      fa2_address: 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW',
      token_id: '2',
      seller_address: 'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
      //artist_address: 'tz1c8riGC9WHnrncStfM5jwKyhUwwRfb31hQ', // TODO: add this
      swap_id: '0',
      start_price: '5000000',
      end_price: '5000000',
      amount: '19',
      end_time: '2022-01-13T11:31:40Z',
      burn_on_end: false,
    },
    {
      id: '6ae69441b0fa64347981cc12401c0deb',
      type: 'OBJKT_CONCLUDE_ENGLISH_AUCTION',
      implements: 'SALE',
      opid: 58462934,
      ophash: TEST_OPHASH,
      timestamp: '2021-07-06T00:28:42Z',
      level: 1544673,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '104051',
      seller_address: 'tz1LcDMi4TAPL31ZRvkYDm4fAXFWRugCzxPY',
      buyer_address: 'tz1Q71RJHgo7gvLtcXwMdsG7B4EccY9SmJiS',
      artist_address: 'tz1gdno6FuKgE5WC1VKnqxb8qQQEuYrbKCub',
      reserve: '1000000',
      start_time: '2021-07-05T22:09:28Z',
      end_time: '2021-07-06T00:19:02Z',
      price: '1000000',
      extension_time: '600',
      royalties: '100',
      price_increment: '1000000',
      auction_id: '10060',
    },
    {
      id: '49d7b043d413f87043282e2ce0bc5306',
      type: 'TEIA_COLLECT',
      implements: 'SALE',
      opid: 164940000,
      ophash: TEST_OPHASH,
      timestamp: '2022-01-31T11:22:08Z',
      level: 2077595,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '531011',
      swap_id: '0',
      buyer_address: 'tz1abTpHKkdo5YTM1DosZZVx9p8cjv4hMMTB',
      seller_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      artist_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      price: '100000',
    },
    {
      id: '9909b01937459a2ba0d6facf413b5ee1',
      type: 'OBJKT_FULFILL_ASK_V2',
      implements: 'SALE',
      opid: 170995822,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-10T18:48:24Z',
      level: 2106438,
      price: '5000000',
      fa2_address: 'KT1FReMp4U1KipyH53xXUnnjtdRQZaLnQpUj',
      token_id: '567',
      ask_id: '1000004',
      seller_address: 'tz1f6Kdmw8tCgirihestPV4duyXzdMaFCmAw',
      buyer_address: 'tz1cgAJDiPHM8HYX8nfvRuXgaBEZeJFgGw3K',
      amount: '1',
      // artist_address: 'tz1iZ2TPEShFC8TqHsXLA9RXdV7tSv8E3aLe', TODO: add
    },
  ];

  const { token } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(token).toMatchObject({
    price: '1830000',
    last_sales_price: '5000000',
    highest_sales_price: '5000000',
    lowest_sales_price: '100000',
    first_sales_price: '1000000',
    last_sale_at: '2022-02-10T18:48:24Z',
    sales_count: '3',
  });
});

test('handles 8BID_8X8_COLOR_MINT events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '14c9c6d982d4ec8d7eaef5b6717d07f9',
      type: '8BID_8X8_COLOR_MINT',
      opid: 176179849,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-20T15:11:00Z',
      level: 2134259,
      fa2_address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
      token_id: '2',

      editions: '9',
      artist_address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
      token_name: 'Cat001',
      creator_name: 'Hrtk',
      token_description: 'This is cat.',
      metadata_uri: 'http://localhost:9999/',
      rgb: '639bff639bff639bff639bff639bff639bff639bff639bff639bff222034639bff222034639bff639bff639bff639bff639bff222034222034222034639bff639bff639bff639bff639bff222034222034222034639bff639bff222034639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034639bff639bff222034639bff639bff639bff639bff639bff639bff639bff639bff639bff639bff',
    },
  ];

  const { token } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(token).toMatchObject({
    platform: '8BIDOU',
    metadata_status: 'processed',
    name: 'Cat001',
    description: 'This is cat.',
    eightbid_rgb:
      '639bff639bff639bff639bff639bff639bff639bff639bff639bff222034639bff222034639bff639bff639bff639bff639bff222034222034222034639bff639bff639bff639bff639bff222034222034222034639bff639bff222034639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034639bff639bff222034639bff639bff639bff639bff639bff639bff639bff639bff639bff639bff',
    eightbid_creator_name: 'Hrtk',
    artist_address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
  });
});

test('handles 8BID_8X8_COLOR_SWAP and 8BID_8X8_COLOR_BUY events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '9c088c24ac09615570079afb80975a3b',
      type: '8BID_8X8_COLOR_SWAP',
      opid: 176179849,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-20T15:11:00Z',
      level: 2134259,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,

      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      price: TEST_PRICE,
      swap_id: TEST_SWAP_ID,
      royalties: '100',
      amount: '10',
    },
    {
      id: 'a4477dde3ea68ad1a31a631c61f24ea4',
      type: '8BID_8X8_COLOR_BUY',
      implements: 'SALE',
      opid: 176191154,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-20T15:38:00Z',
      level: 2134313,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,

      swap_id: TEST_SWAP_ID,
      buyer_address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      price: TEST_PRICE,
      total_price: TEST_PRICE,
      amount: '1',
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: '8BID_8X8_COLOR_SWAP',
      contract_address: 'KT1BvWGFENd4CXW5F3u4n31xKfJhmBGipoqF',
      created_at: '2022-02-20T15:11:00Z',
      swap_id: TEST_SWAP_ID,
      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      amount: 10,
      amount_left: 9,
      price: TEST_PRICE,
      status: 'active',
    },
  ]);
});

test('handles 8BID_8X8_COLOR_SWAP and 8BID_8X8_COLOR_BUY events, sold out case', () => {
  const events: Array<AnyEvent> = [
    {
      id: '9c088c24ac09615570079afb80975a3b',
      type: '8BID_8X8_COLOR_SWAP',
      opid: 176179849,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-20T15:11:00Z',
      level: 2134259,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,

      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      price: TEST_PRICE,
      swap_id: TEST_SWAP_ID,
      royalties: '100',
      amount: '1',
    },
    {
      id: 'a4477dde3ea68ad1a31a631c61f24ea4',
      type: '8BID_8X8_COLOR_BUY',
      implements: 'SALE',
      opid: 176191154,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-20T15:38:00Z',
      level: 2134313,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,

      swap_id: TEST_SWAP_ID,
      buyer_address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      price: TEST_PRICE,
      total_price: TEST_PRICE,
      amount: '1',
    },
  ];

  const { token, listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: '8BID_8X8_COLOR_SWAP',
      contract_address: 'KT1BvWGFENd4CXW5F3u4n31xKfJhmBGipoqF',
      created_at: '2022-02-20T15:11:00Z',
      swap_id: TEST_SWAP_ID,
      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      amount: 1,
      amount_left: 0,
      price: TEST_PRICE,
      status: 'sold_out',
    },
  ]);
});

test('filters out 8BID_8X8_COLOR_SWAP listings with incorrect royalties set', () => {
  const events: Array<AnyEvent> = [
    {
      id: '14c9c6d982d4ec8d7eaef5b6717d07f9',
      type: '8BID_8X8_COLOR_MINT',
      opid: 176179849,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-20T15:11:00Z',
      level: 2134259,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,

      editions: '10',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      token_name: 'Cat001',
      creator_name: 'Hrtk',
      token_description: 'This is cat.',
      metadata_uri: 'http://localhost:9999/',
      rgb: '639bff639bff639bff639bff639bff639bff639bff639bff639bff222034639bff222034639bff639bff639bff639bff639bff222034222034222034639bff639bff639bff639bff639bff222034222034222034639bff639bff222034639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034639bff639bff222034639bff639bff639bff639bff639bff639bff639bff639bff639bff639bff',
    },
    {
      id: '9c088c24ac09615570079afb80975a3b',
      type: '8BID_8X8_COLOR_SWAP',
      opid: 176179849,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-20T15:11:00Z',
      level: 2134259,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,

      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      price: TEST_PRICE,
      swap_id: TEST_SWAP_ID,
      royalties: '50',
      amount: '10',
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings.length).toBe(0);
});

test('filters out 8BID_8X8_COLOR_SWAP listings with incorrect artist_address set', () => {
  const events: Array<AnyEvent> = [
    {
      id: '14c9c6d982d4ec8d7eaef5b6717d07f9',
      type: '8BID_8X8_COLOR_MINT',
      opid: 176179849,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-20T15:11:00Z',
      level: 2134259,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,

      editions: '10',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      token_name: 'Cat001',
      creator_name: 'Hrtk',
      token_description: 'This is cat.',
      metadata_uri: 'http://localhost:9999/',
      rgb: '639bff639bff639bff639bff639bff639bff639bff639bff639bff222034639bff222034639bff639bff639bff639bff639bff222034222034222034639bff639bff639bff639bff639bff222034222034222034639bff639bff222034639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034639bff639bff222034639bff639bff639bff639bff639bff639bff639bff639bff639bff639bff',
    },
    {
      id: '9c088c24ac09615570079afb80975a3b',
      type: '8BID_8X8_COLOR_SWAP',
      opid: 176179849,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-20T15:11:00Z',
      level: 2134259,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,

      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcfraud',
      price: TEST_PRICE,
      swap_id: TEST_SWAP_ID,
      royalties: '100',
      amount: '10',
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings.length).toBe(0);
});

test('handles 8BID_8X8_COLOR_CANCEL_SWAP events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '9c088c24ac09615570079afb80975a3b',
      type: '8BID_8X8_COLOR_SWAP',
      opid: 176179849,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-20T15:11:00Z',
      level: 2134259,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,

      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      price: TEST_PRICE,
      swap_id: TEST_SWAP_ID,
      royalties: '100',
      amount: '1',
    },
    {
      id: 'dac294e3d10b2cb49ae94620951c4fd5',
      type: '8BID_8X8_COLOR_CANCEL_SWAP',
      opid: 180039728,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-28T05:34:04Z',
      level: 2155678,
      fa2_address: TEST_FA2_ADDRESS,
      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      token_id: TEST_TOKEN_ID,
      swap_id: TEST_SWAP_ID,
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: '8BID_8X8_COLOR_SWAP',
      contract_address: 'KT1BvWGFENd4CXW5F3u4n31xKfJhmBGipoqF',
      created_at: '2022-02-20T15:11:00Z',
      swap_id: TEST_SWAP_ID,
      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      amount: 1,
      amount_left: 1,
      price: TEST_PRICE,
      status: 'canceled',
    },
  ]);
});

test('handles 8BID_24X24_MONOCHROME_MINT events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '14c9c6d982d4ec8d7eaef5b6717d07f9',
      type: '8BID_24X24_MONOCHROME_MINT',
      opid: 176179849,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-20T15:11:00Z',
      level: 2134259,
      fa2_address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
      token_id: '2',

      editions: '9',
      artist_address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
      token_name: 'Cat001',
      creator_name: 'Hrtk',
      token_description: 'This is cat.',
      metadata_uri: 'http://localhost:9999/',
      rgb: '639bff639bff639bff639bff639bff639bff639bff639bff639bff222034639bff222034639bff639bff639bff639bff639bff222034222034222034639bff639bff639bff639bff639bff222034222034222034639bff639bff222034639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034639bff639bff222034639bff639bff639bff639bff639bff639bff639bff639bff639bff639bff',
    },
  ];

  const { token } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(token).toMatchObject({
    platform: '8BIDOU',
    metadata_status: 'processed',
    name: 'Cat001',
    description: 'This is cat.',
    eightbid_rgb:
      '639bff639bff639bff639bff639bff639bff639bff639bff639bff222034639bff222034639bff639bff639bff639bff639bff222034222034222034639bff639bff639bff639bff639bff222034222034222034639bff639bff222034639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034639bff639bff222034639bff639bff639bff639bff639bff639bff639bff639bff639bff639bff',
    eightbid_creator_name: 'Hrtk',
    artist_address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
  });
});

test('handles 8BID_24X24_MONOCHROME_SWAP and 8BID_24X24_MONOCHROME_BUY events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '9c088c24ac09615570079afb80975a3b',
      type: '8BID_24X24_MONOCHROME_SWAP',
      opid: 176179849,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-20T15:11:00Z',
      level: 2134259,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,

      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      price: TEST_PRICE,
      swap_id: TEST_SWAP_ID,
      royalties: '100',
      amount: '10',
    },
    {
      id: 'a4477dde3ea68ad1a31a631c61f24ea4',
      type: '8BID_24X24_MONOCHROME_BUY',
      implements: 'SALE',
      ophash: TEST_OPHASH,
      opid: 176191154,
      timestamp: '2022-02-20T15:38:00Z',
      level: 2134313,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,

      swap_id: TEST_SWAP_ID,
      buyer_address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      price: TEST_PRICE,
      total_price: TEST_PRICE,
      amount: '1',
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: '8BID_24X24_MONOCHROME_SWAP',
      contract_address: 'KT1AHBvSo828QwscsjDjeUuep7MgApi8hXqA',
      created_at: '2022-02-20T15:11:00Z',
      swap_id: TEST_SWAP_ID,
      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      amount: 10,
      amount_left: 9,
      price: TEST_PRICE,
      status: 'active',
    },
  ]);
});

test('handles 8BID_24X24_MONOCHROME_SWAP and 8BID_24X24_MONOCHROME_BUY events, sold out case', () => {
  const events: Array<AnyEvent> = [
    {
      id: '9c088c24ac09615570079afb80975a3b',
      type: '8BID_24X24_MONOCHROME_SWAP',
      opid: 176179849,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-20T15:11:00Z',
      level: 2134259,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,

      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      price: TEST_PRICE,
      swap_id: TEST_SWAP_ID,
      royalties: '100',
      amount: '1',
    },
    {
      id: 'a4477dde3ea68ad1a31a631c61f24ea4',
      type: '8BID_24X24_MONOCHROME_BUY',
      implements: 'SALE',
      opid: 176191154,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-20T15:38:00Z',
      level: 2134313,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,

      swap_id: TEST_SWAP_ID,
      buyer_address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      price: TEST_PRICE,
      total_price: TEST_PRICE,
      amount: '1',
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: '8BID_24X24_MONOCHROME_SWAP',
      contract_address: 'KT1AHBvSo828QwscsjDjeUuep7MgApi8hXqA',
      created_at: '2022-02-20T15:11:00Z',
      swap_id: TEST_SWAP_ID,
      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      amount: 1,
      amount_left: 0,
      price: TEST_PRICE,
      status: 'sold_out',
    },
  ]);
});

test('handles 8BID_24X24_MONOCHROME_CANCEL_SWAP events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '9c088c24ac09615570079afb80975a3b',
      type: '8BID_24X24_MONOCHROME_SWAP',
      opid: 176179849,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-20T15:11:00Z',
      level: 2134259,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,

      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      price: TEST_PRICE,
      swap_id: TEST_SWAP_ID,
      royalties: '100',
      amount: '1',
    },
    {
      id: 'dac294e3d10b2cb49ae94620951c4fd5',
      type: '8BID_24X24_MONOCHROME_CANCEL_SWAP',
      opid: 180039728,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-28T05:34:04Z',
      level: 2155678,
      fa2_address: TEST_FA2_ADDRESS,
      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      token_id: TEST_TOKEN_ID,
      swap_id: TEST_SWAP_ID,
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: '8BID_24X24_MONOCHROME_SWAP',
      contract_address: 'KT1AHBvSo828QwscsjDjeUuep7MgApi8hXqA',
      created_at: '2022-02-20T15:11:00Z',
      swap_id: TEST_SWAP_ID,
      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      amount: 1,
      amount_left: 1,
      price: TEST_PRICE,
      status: 'canceled',
    },
  ]);
});
/*
test('filters out 8BID_24X24_MONOCHROME_SWAP listings with incorrect royalties set', () => {
  const events: Array<AnyEvent> = [
    {
      id: '14c9c6d982d4ec8d7eaef5b6717d07f9',
      type: '8BID_24X24_MONOCHROME_MINT',
      opid: 176179849,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-20T15:11:00Z',
      level: 2134259,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,

      editions: '10',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      token_name: 'Cat001',
      creator_name: 'Hrtk',
      token_description: 'This is cat.',
      metadata_uri: 'http://localhost:9999/',
      rgb: '639bff639bff639bff639bff639bff639bff639bff639bff639bff222034639bff222034639bff639bff639bff639bff639bff222034222034222034639bff639bff639bff639bff639bff222034222034222034639bff639bff222034639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034639bff639bff222034639bff639bff639bff639bff639bff639bff639bff639bff639bff639bff',
    },
    {
      id: '9c088c24ac09615570079afb80975a3b',
      type: '8BID_24X24_MONOCHROME_SWAP',
      opid: 176179849,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-20T15:11:00Z',
      level: 2134259,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,

      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      price: TEST_PRICE,
      swap_id: TEST_SWAP_ID,
      royalties: '50',
      amount: '10',
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings.length).toBe(0);
});
*/

test('filters out 8BID_24X24_MONOCHROME_SWAP listings with incorrect artist_address set', () => {
  const events: Array<AnyEvent> = [
    {
      id: '14c9c6d982d4ec8d7eaef5b6717d07f9',
      type: '8BID_24X24_MONOCHROME_MINT',
      opid: 176179849,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-20T15:11:00Z',
      level: 2134259,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,

      editions: '10',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      token_name: 'Cat001',
      creator_name: 'Hrtk',
      token_description: 'This is cat.',
      metadata_uri: 'http://localhost:9999/',
      rgb: '639bff639bff639bff639bff639bff639bff639bff639bff639bff222034639bff222034639bff639bff639bff639bff639bff222034222034222034639bff639bff639bff639bff639bff222034222034222034639bff639bff222034639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034639bff639bff222034639bff639bff639bff639bff639bff639bff639bff639bff639bff639bff',
    },
    {
      id: '9c088c24ac09615570079afb80975a3b',
      type: '8BID_24X24_MONOCHROME_SWAP',
      opid: 176179849,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-20T15:11:00Z',
      level: 2134259,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,

      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcfraud',
      price: TEST_PRICE,
      swap_id: TEST_SWAP_ID,
      royalties: '100',
      amount: '10',
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings.length).toBe(0);
});

test('handles 8BID_24X24_COLOR_MINT events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '14c9c6d982d4ec8d7eaef5b6717d07f9',
      type: '8BID_24X24_COLOR_MINT',
      opid: 176179849,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-20T15:11:00Z',
      level: 2134259,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: '2',

      editions: '9',
      artist_address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
      token_name: 'Cat001',
      creator_name: 'Hrtk',
      token_description: 'This is cat.',
      metadata_uri: 'http://localhost:9999/',
      rgb: '639bff639bff639bff639bff639bff639bff639bff639bff639bff222034639bff222034639bff639bff639bff639bff639bff222034222034222034639bff639bff639bff639bff639bff222034222034222034639bff639bff222034639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034639bff639bff222034639bff639bff639bff639bff639bff639bff639bff639bff639bff639bff',
    },
  ];

  const { token } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(token).toMatchObject({
    metadata_status: 'processed',
    name: 'Cat001',
    description: 'This is cat.',
    eightbid_rgb:
      '639bff639bff639bff639bff639bff639bff639bff639bff639bff222034639bff222034639bff639bff639bff639bff639bff222034222034222034639bff639bff639bff639bff639bff222034222034222034639bff639bff222034639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034639bff639bff222034639bff639bff639bff639bff639bff639bff639bff639bff639bff639bff',
    eightbid_creator_name: 'Hrtk',
    artist_address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
  });
});

test('handles FX_MINT_V3 events', () => {
  const events: Array<AnyEvent> = [
    {
      id: '86bc7c8df4f3ab1e0ee5e154d23a290b',
      type: 'FX_MINT_V3',
      implements: 'SALE',
      opid: 207515122,
      ophash: TEST_OPHASH,
      timestamp: '2022-04-16T12:03:29Z',
      level: 2285825,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      editions: '1',
      seller_address: 'tz1MBrwe8EgiZJ5kgVEDnL5emVM294J5RiaW',
      artist_address: 'tz1MBrwe8EgiZJ5kgVEDnL5emVM294J5RiaW',
      buyer_address: 'tz1KfjPNG5riJC972A6vZXaDyzqqBxXCCmec',
      issuer_id: '10966',
      iteration: '3',
      royalties: '130',
      price: TEST_PRICE,
      metadata_uri: 'ipfs://QmZZVBKapDg2wXzwpDxdmL9Ah665h9ZzeJ9gYdbTZ4GBzf',
    },
  ];

  const { token } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(token).toMatchObject({
    platform: 'FXHASH',
    artist_address: 'tz1MBrwe8EgiZJ5kgVEDnL5emVM294J5RiaW',
    fx_issuer_id: '10966',
    fx_iteration: '3',
  });
});

test('handles FX_LISTING and FX_LISTING_ACCEPT events', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'cdec227a895401fb08b5b14422626d6d',
      type: 'FX_LISTING',
      opid: 207514809,
      ophash: TEST_OPHASH,
      timestamp: '2022-04-16T12:02:59Z',
      level: 2285824,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      swap_id: TEST_SWAP_ID,
      seller_address: 'tz1ck6scdncLedJyVViJfrfHwP3DVfxEBg5f',
      price: TEST_PRICE,
    },
    {
      id: '3af918e6fe110712a931195cd19e027c',
      type: 'FX_LISTING_ACCEPT',
      implements: 'SALE',
      opid: 207520063,
      ophash: TEST_OPHASH,
      timestamp: '2022-04-16T12:08:29Z',
      level: 2285835,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      swap_id: TEST_SWAP_ID,
      seller_address: 'tz1ck6scdncLedJyVViJfrfHwP3DVfxEBg5f',
      buyer_address: 'tz1RxdMQhHoQKxmtwqEC8h5yLHVghHdEPqEk',
      price: TEST_PRICE,
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toMatchObject([
    {
      type: 'FX_LISTING',
      contract_address: 'KT1GbyoDi7H1sfXmimXpptZJuCdHMh66WS9u',
      created_at: '2022-04-16T12:02:59Z',
      swap_id: TEST_SWAP_ID,
      seller_address: 'tz1ck6scdncLedJyVViJfrfHwP3DVfxEBg5f',
      amount: 1,
      amount_left: 0,
      price: TEST_PRICE,
      status: 'sold_out',
    },
  ]);
});

test('handles FX_CANCEL_OFFER events', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'cdec227a895401fb08b5b14422626d6d',
      type: 'FX_LISTING',
      opid: 207514809,
      ophash: TEST_OPHASH,
      timestamp: '2022-04-16T12:02:59Z',
      level: 2285824,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      swap_id: TEST_SWAP_ID,
      seller_address: 'tz1ck6scdncLedJyVViJfrfHwP3DVfxEBg5f',
      price: TEST_PRICE,
    },
    {
      id: '49285213fd457e9f5bd7f66ff74f59fb',
      type: 'FX_LISTING_CANCEL',
      opid: 207527459,
      ophash: TEST_OPHASH,
      timestamp: '2022-04-16T12:14:59Z',
      level: 2285848,
      fa2_address: TEST_FA2_ADDRESS,
      seller_address: 'tz1ck6scdncLedJyVViJfrfHwP3DVfxEBg5f',
      token_id: TEST_TOKEN_ID,
      swap_id: TEST_SWAP_ID,
    },
  ];

  const { listings } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(listings).toEqual([
    {
      type: 'FX_LISTING',
      contract_address: 'KT1GbyoDi7H1sfXmimXpptZJuCdHMh66WS9u',
      created_at: '2022-04-16T12:02:59Z',
      swap_id: TEST_SWAP_ID,
      seller_address: 'tz1ck6scdncLedJyVViJfrfHwP3DVfxEBg5f',
      amount: 1,
      amount_left: 1,
      price: TEST_PRICE,
      status: 'canceled',
    },
  ]);
});

test('sets the highest_offer_price property', () => {
  const events: Array<AnyEvent> = [
    {
      id: '6527967e1eb9f9161bf1bd9bba35a8a8',
      type: 'OBJKT_BID',
      opid: 57748983,
      ophash: TEST_OPHASH,
      timestamp: '2021-06-30T23:14:02Z',
      level: 1538313,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      bid_id: '1',
      buyer_address: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
      artist_address: 'tz1aWL8AMR6CH4NMdUuiLekQbQ5TPYMzvtuQ',
      royalties: '200',
      price: '1000',
    },
    {
      id: '6527967e1eb9f9161bf1bd9bba35a8a9',
      type: 'OBJKT_BID',
      opid: 57748984,
      ophash: TEST_OPHASH,
      timestamp: '2021-06-30T23:14:02Z',
      level: 1538313,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      bid_id: '2',
      buyer_address: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
      artist_address: 'tz1aWL8AMR6CH4NMdUuiLekQbQ5TPYMzvtuQ',
      royalties: '200',
      price: '5000',
    },
  ];

  const { token } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'unprocessed');

  expect(token.highest_offer_price).toBe('5000');
});

test('calculates sales count and sales volume correctly', () => {
  const events: Array<AnyEvent> = [
    {
      id: 'faa13edecca7cc1294fd1432ad0cfbe3',
      type: 'HEN_COLLECT',
      implements: 'SALE',
      opid: 52568902,
      ophash: TEST_OPHASH,
      timestamp: '2021-05-31T08:08:46Z',
      level: 1495010,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,
      buyer_address: 'tz1XGTjeqid5naxSviH3CBcfz944qHM6bNeD',
      seller_address: 'tz1NufWtpqS3nfR8VW1xFyWq4GWqb969keeR',
      swap_id: TEST_SWAP_ID,
      price: TEST_PRICE,
      amount: '1',
    },
    {
      id: 'a4477dde3ea68ad1a31a631c61f24ea4',
      type: '8BID_8X8_COLOR_BUY',
      implements: 'SALE',
      opid: 176191154,
      ophash: TEST_OPHASH,
      timestamp: '2022-02-20T15:38:00Z',
      level: 2134313,
      fa2_address: TEST_FA2_ADDRESS,
      token_id: TEST_TOKEN_ID,

      swap_id: TEST_SWAP_ID,
      buyer_address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      price: TEST_PRICE,
      total_price: '4000',
      amount: '2',
    },
  ];

  const { token } = compileToken(TEST_FA2_ADDRESS, TEST_TOKEN_ID, events, 'processed');

  expect(token.sales_count).toBe('3');
  expect(token.sales_volume).toBe('6000');
});

test('calcs the correct price diffs', () => {
  expect(calcPriceDiff(null, '10000000')).toBe(null);
  expect(calcPriceDiff('15000000', null)).toBe(null);
  expect(calcPriceDiff(null, null)).toBe(null);
  expect(calcPriceDiff('15000000', '10000000')).toBe('5000000');
  expect(calcPriceDiff('15000000', '20000000')).toBe('-5000000');
  expect(calcPriceDiff('15000000', '15000000')).toBe('0');
  expect(calcPriceDiff('0', '0')).toBe('0');
});

test('calcs the correct price percentages', () => {
  expect(calcPricePct(null, '10000000')).toBe(null);
  expect(calcPricePct('15000000', null)).toBe(null);
  expect(calcPricePct(null, null)).toBe(null);
  expect(calcPricePct('15000000', '10000000')).toBe('50');
  expect(calcPricePct('20000000', '10000000')).toBe('100');
  expect(calcPricePct('15000000', '20000000')).toBe('-25');
  expect(calcPricePct('15000000', '15000000')).toBe('0');
  expect(calcPricePct('15000000', '0')).toBe('15000000');
  expect(calcPricePct('0', '15000000')).toBe('-100');
  expect(calcPricePct('0', '0')).toBe('0');
});
