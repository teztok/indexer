import HenMintHandler from './hen_mint';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates HEN_MINT events', async () => {
  const transactions: Transactions = [
    {
      id: 112502347,
      level: 1879134,
      timestamp: '2021-11-20T08:09:22Z',
      block: 'BLjkrXDZxqQosF7gBzcq61yoqhuFjfB9TpY3Af4p2aNEi1cU6j2',
      hash: 'oo28HoW9LEbrA28M7XbDEvRmPqaA7QxPVmYbAUoAcKNAgXdDokB',
      counter: 36645942,
      nonce: null,
      sender: {
        address: 'tz1XUcZvBxAMMSqeMsfA4tunmEfTUcbEXQ88',
      },
      target: {
        alias: 'hic et nunc Minter',
        address: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
      },
      parameter: {
        entrypoint: 'mint_OBJKT',
        value: {
          amount: '1',
          address: 'tz1XUcZvBxAMMSqeMsfA4tunmEfTUcbEXQ88',
          metadata: '697066733a2f2f516d55755a324759616d64705045385455597a516b5143326a6a6e71376f695956655a77644b7042345343617247',
          royalties: '100',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        hdao: 'KT1AFA2mwNUMNd4SsujE1YYp29vd8BZejyKW',
        size: '0',
        objkt: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
        swaps: 523,
        curate: 'KT1TybhR7XraG75JFYKSrh7KnxukMBT5dor6',
        locked: true,
        genesis: '2021-04-15T02:09:41Z',
        manager: 'KT1D4L7JewyDeA21wDzfWJgRmw948bLaKymb',
        swap_id: '348153',
        metadata: 521,
        objkt_id: '545564',
        royalties: 522,
      },
      diffs: [
        {
          bigmap: 522,
          path: 'royalties',
          action: 'add_key',
          content: {
            hash: 'expruZJjedK5gkUj8P4WLHMrRPisxRvL83eUnSeVZdATSR3TrEiA1q',
            key: '545563',
            value: {
              issuer: 'tz1XUcZvBxAMMSqeMsfA4tunmEfTUcbEXQ88',
              royalties: '100',
            },
          },
        },
      ],
    },
    {
      id: 112502348,
      level: 1879134,
      timestamp: '2021-11-20T08:09:22Z',
      block: 'BLjkrXDZxqQosF7gBzcq61yoqhuFjfB9TpY3Af4p2aNEi1cU6j2',
      hash: 'oo28HoW9LEbrA28M7XbDEvRmPqaA7QxPVmYbAUoAcKNAgXdDokB',
      counter: 36645942,
      nonce: 1,
      sender: {
        alias: 'hic et nunc Minter',
        address: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
      },
      target: {
        alias: 'hic et nunc NFTs',
        address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      },
      parameter: {
        entrypoint: 'mint',
        value: {
          amount: '1',
          address: 'tz1XUcZvBxAMMSqeMsfA4tunmEfTUcbEXQ88',
          token_id: '545563',
          token_info: {
            '': '697066733a2f2f516d55755a324759616d64705045385455597a516b5143326a6a6e71376f695956655a77644b7042345343617247',
          },
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1XUcZvBxAMMSqeMsfA4tunmEfTUcbEXQ88',
      },
      storage: {
        ledger: 511,
        paused: false,
        metadata: 512,
        operators: 513,
        all_tokens: '545564',
        administrator: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
        token_metadata: 514,
      },
    },
  ];

  const events = transactionsToEvents(transactions, [HenMintHandler]);

  expect(events).toStrictEqual([
    {
      id: '339d569daacae576a29e29fd9255dcde',
      type: 'HEN_MINT',
      opid: 112502347,
      ophash: 'oo28HoW9LEbrA28M7XbDEvRmPqaA7QxPVmYbAUoAcKNAgXdDokB',
      timestamp: '2021-11-20T08:09:22Z',
      level: 1879134,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '545563',
      editions: '1',
      artist_address: 'tz1XUcZvBxAMMSqeMsfA4tunmEfTUcbEXQ88',
      royalties: '100',
      metadata_uri: 'ipfs://QmUuZ2GYamdpPE8TUYzQkQC2jjnq7oiYVeZwdKpB4SCarG',
      royalty_shares: {
        decimals: 3,
        shares: {
          tz1XUcZvBxAMMSqeMsfA4tunmEfTUcbEXQ88: '100',
        },
      },
    },
  ]);
});
