import TypedCancelSwapHandler from './typed_cancel_swap';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates TYPED_CANCEL_SWAP events', async () => {
  const transactions: Transactions = [
    {
      id: 266080271,
      level: 2464873,
      timestamp: '2022-06-19T17:25:29Z',
      block: 'BMCzRoA4LYwS4wcW1KSBJgcnFj1rxQZqz61dPAFmHAhoNZrUmjn',
      hash: 'op7FQgciJNvACJ6ary6AqaKFJmArH63NWUfE1u9i8TAaq9j1n4b',
      counter: 54590488,
      sender: {
        address: 'tz1SSaHGZpTxYsczPDVuybvFS1BLyALHbiVx',
      },
      target: {
        alias: 'typed marketplace',
        address: 'KT1VoZeuBMJF6vxtLqEFMoc4no5VDG789D7z',
      },
      amount: 0,
      parameter: {
        entrypoint: 'cancel_swap',
        value: '44',
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        fee: '50',
        swaps: 196868,
        counter: '57',
        manager: 'tz1aqMiWgnFddGZSTsEMSe8qbXkVGn7C4cg5',
        metadata: 196867,
        royalties: '100',
        allowed_fa2s: 196866,
        swaps_paused: false,
        fee_recipient: 'tz1aqMiWgnFddGZSTsEMSe8qbXkVGn7C4cg5',
        collects_paused: false,
      },
      diffs: [
        {
          bigmap: 196868,
          path: 'swaps',
          action: 'remove_key',
          content: {
            hash: 'exprthVBDU9Nha7JjFMs45HyfgfkPHR941Rvt2qUeY4XZj3xF6V4EP',
            key: '44',
            value: {
              fa2: 'KT1J6NY5AU61GzUX51n59wwiZcGJ9DrNTwbK',
              issuer: 'tz1SSaHGZpTxYsczPDVuybvFS1BLyALHbiVx',
              creator: 'tz1SSaHGZpTxYsczPDVuybvFS1BLyALHbiVx',
              objkt_id: '53',
              royalties: '100',
              objkt_amount: '9999',
              xtz_per_objkt: '1000000',
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [TypedCancelSwapHandler]);

  expect(events).toStrictEqual([
    {
      id: 'a49d6d0893d35069989b282cedbb9865',
      type: 'TYPED_CANCEL_SWAP',
      opid: '266080271',
      ophash: 'op7FQgciJNvACJ6ary6AqaKFJmArH63NWUfE1u9i8TAaq9j1n4b',
      timestamp: '2022-06-19T17:25:29Z',
      level: 2464873,
      fa2_address: 'KT1J6NY5AU61GzUX51n59wwiZcGJ9DrNTwbK',
      seller_address: 'tz1SSaHGZpTxYsczPDVuybvFS1BLyALHbiVx',
      artist_address: 'tz1SSaHGZpTxYsczPDVuybvFS1BLyALHbiVx',
      token_id: '53',
      swap_id: '44',
    },
  ]);
});
