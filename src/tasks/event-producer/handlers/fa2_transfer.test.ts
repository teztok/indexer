import Fa2TransferHandler from './fa2_transfer';
import { Transactions } from '../../../types';
import { transactionsToEvents } from '../event-producer';

test('creates FA2_TRANSFER events', async () => {
  const transactions: Transactions = [
    {
      id: 52568926,
      level: 1495010,
      timestamp: '2021-05-31T08:08:46Z',
      block: 'BLkpsMYFS3ueoDCXxhE6LBv2RuFBEU1je9XW5QHrb4bZWSfC5gX',
      hash: 'op8dmZUuY4qu2Kp7Hok9DQVMzXr1YZrsLaA2C4svAmtQCiaXmNZ',
      counter: 14596089,
      sender: {
        alias: 'hic et nunc Minter',
        address: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
      },
      target: {
        alias: 'hic et nunc NFTs',
        address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      },
      parameter: {
        entrypoint: 'transfer',
        value: [
          {
            txs: [
              {
                to_: 'tz1ejpAPJZAe2boiKUGwb6cq5dckTZ8hXn2A',
                amount: '1',
                token_id: '58486',
              },
              {
                to_: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
                amount: '10',
                token_id: '58487',
              },
            ],
            from_: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
          },
        ],
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1ejpAPJZAe2boiKUGwb6cq5dckTZ8hXn2A',
      },
    },
  ];

  const events = transactionsToEvents(transactions, [Fa2TransferHandler]);

  expect(events).toStrictEqual([
    {
      id: 'eb8c302cdafd7a647e11faecfcf005d9',
      type: 'FA2_TRANSFER',
      opid: 52568926,
      ophash: 'op8dmZUuY4qu2Kp7Hok9DQVMzXr1YZrsLaA2C4svAmtQCiaXmNZ',
      timestamp: '2021-05-31T08:08:46Z',
      level: 1495010,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      from_address: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
      to_address: 'tz1ejpAPJZAe2boiKUGwb6cq5dckTZ8hXn2A',
      amount: '1',
      token_id: '58486',
    },
    {
      id: '808cdf5971acca39f248906bccd2dc81',
      type: 'FA2_TRANSFER',
      opid: 52568926,
      ophash: 'op8dmZUuY4qu2Kp7Hok9DQVMzXr1YZrsLaA2C4svAmtQCiaXmNZ',
      timestamp: '2021-05-31T08:08:46Z',
      level: 1495010,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      from_address: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
      to_address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
      amount: '10',
      token_id: '58487',
    },
  ]);
});
