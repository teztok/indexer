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
    {
      id: 268672904,
      level: 2472925,
      timestamp: '2022-06-22T15:02:44Z',
      block: 'BLRDGDe1JxiVhZZ7HTzrCuS5FdtEQQFgnvYMc1rPqPdrudrQpeN',
      hash: 'opZEYSLU6vvUNJPMhzCYvmUNM5DDD8RfFDuvnhDenb4foWDjwXY',
      counter: 61982008,
      sender: {
        address: 'tz1Sue5xUeUPLu7nn2ECAEGrskJVBDWG8a1K',
      },
      target: {
        alias: 'hic et nunc Minter',
        address: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint_OBJKT',
        value: {
          amount: '1',
          address: 'tz1Sue5xUeUPLu7nn2ECAEGrskJVBDWG8a1K',
          metadata: '697066733a2f2f516d61706555694b6a4734634c484d7243595379355a6e716546634c4831634c6753627955587659396a75353269',
          royalties: '100',
        },
      },
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
        swap_id: '348155',
        metadata: 521,
        objkt_id: '750008',
        royalties: 522,
      },
      diffs: [
        {
          bigmap: 522,
          path: 'royalties',
          action: 'add_key',
          content: {
            hash: 'exprvGcfkdJE9oDo9A5sUFpStHGUKxbMAdHub3KwmxijEwuCGk72BK',
            key: '750007',
            value: {
              issuer: 'tz1Sue5xUeUPLu7nn2ECAEGrskJVBDWG8a1K',
              royalties: '100',
            },
          },
        },
      ],
      nonce: null,
    },
    {
      id: 268672905,
      level: 2472925,
      timestamp: '2022-06-22T15:02:44Z',
      block: 'BLRDGDe1JxiVhZZ7HTzrCuS5FdtEQQFgnvYMc1rPqPdrudrQpeN',
      hash: 'opZEYSLU6vvUNJPMhzCYvmUNM5DDD8RfFDuvnhDenb4foWDjwXY',
      counter: 61982008,
      sender: {
        alias: 'hic et nunc Minter',
        address: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
      },
      target: {
        alias: 'hic et nunc NFTs',
        address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint',
        value: {
          amount: '1',
          address: 'tz1Sue5xUeUPLu7nn2ECAEGrskJVBDWG8a1K',
          token_id: '750007',
          token_info: {
            '': '697066733a2f2f516d61706555694b6a4734634c484d7243595379355a6e716546634c4831634c6753627955587659396a75353269',
          },
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1Sue5xUeUPLu7nn2ECAEGrskJVBDWG8a1K',
      },
      storage: {
        ledger: 511,
        paused: false,
        metadata: 512,
        operators: 513,
        all_tokens: '750008',
        administrator: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
        token_metadata: 514,
      },
      diffs: [
        {
          bigmap: 514,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'exprvGcfkdJE9oDo9A5sUFpStHGUKxbMAdHub3KwmxijEwuCGk72BK',
            key: '750007',
            value: {
              token_id: '750007',
              token_info: {
                '': '697066733a2f2f516d61706555694b6a4734634c484d7243595379355a6e716546634c4831634c6753627955587659396a75353269',
              },
            },
          },
        },
        {
          bigmap: 511,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'expru6yuptkdgMvvzypeJ4c3PJCDRrfxxEiyf6JFydYpQVLXmZaBEC',
            key: {
              nat: '750007',
              address: 'tz1Sue5xUeUPLu7nn2ECAEGrskJVBDWG8a1K',
            },
            value: '1',
          },
        },
      ],
      nonce: 4,
    },
    {
      id: 268672906,
      level: 2472925,
      timestamp: '2022-06-22T15:02:44Z',
      block: 'BLRDGDe1JxiVhZZ7HTzrCuS5FdtEQQFgnvYMc1rPqPdrudrQpeN',
      hash: 'opZEYSLU6vvUNJPMhzCYvmUNM5DDD8RfFDuvnhDenb4foWDjwXY',
      counter: 61982009,
      sender: {
        address: 'tz1Sue5xUeUPLu7nn2ECAEGrskJVBDWG8a1K',
      },
      target: {
        alias: 'hic et nunc Minter',
        address: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint_OBJKT',
        value: {
          amount: '1',
          address: 'tz1Sue5xUeUPLu7nn2ECAEGrskJVBDWG8a1K',
          metadata: '697066733a2f2f516d5a704339594a5a4a324855543665376a425639785734426d417142424273694d727661786a536e444a7a3855',
          royalties: '100',
        },
      },
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
        swap_id: '348155',
        metadata: 521,
        objkt_id: '750009',
        royalties: 522,
      },
      diffs: [
        {
          bigmap: 522,
          path: 'royalties',
          action: 'add_key',
          content: {
            hash: 'exprvSG1mkd3R1KdWfKyw6VMXRYkt7jr4qzu34EneBTHjaD4nLrdGg',
            key: '750008',
            value: {
              issuer: 'tz1Sue5xUeUPLu7nn2ECAEGrskJVBDWG8a1K',
              royalties: '100',
            },
          },
        },
      ],
      nonce: null,
    },
    {
      id: 268672907,
      level: 2472925,
      timestamp: '2022-06-22T15:02:44Z',
      block: 'BLRDGDe1JxiVhZZ7HTzrCuS5FdtEQQFgnvYMc1rPqPdrudrQpeN',
      hash: 'opZEYSLU6vvUNJPMhzCYvmUNM5DDD8RfFDuvnhDenb4foWDjwXY',
      counter: 61982009,
      sender: {
        alias: 'hic et nunc Minter',
        address: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
      },
      target: {
        alias: 'hic et nunc NFTs',
        address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint',
        value: {
          amount: '1',
          address: 'tz1Sue5xUeUPLu7nn2ECAEGrskJVBDWG8a1K',
          token_id: '750008',
          token_info: {
            '': '697066733a2f2f516d5a704339594a5a4a324855543665376a425639785734426d417142424273694d727661786a536e444a7a3855',
          },
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1Sue5xUeUPLu7nn2ECAEGrskJVBDWG8a1K',
      },
      storage: {
        ledger: 511,
        paused: false,
        metadata: 512,
        operators: 513,
        all_tokens: '750009',
        administrator: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
        token_metadata: 514,
      },
      diffs: [
        {
          bigmap: 514,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'exprvSG1mkd3R1KdWfKyw6VMXRYkt7jr4qzu34EneBTHjaD4nLrdGg',
            key: '750008',
            value: {
              token_id: '750008',
              token_info: {
                '': '697066733a2f2f516d5a704339594a5a4a324855543665376a425639785734426d417142424273694d727661786a536e444a7a3855',
              },
            },
          },
        },
        {
          bigmap: 511,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'expruvafPFTkmCRbFHCA7cx16xoQCMTnY8eSEaT7rm6XgpZqXdCddK',
            key: {
              nat: '750008',
              address: 'tz1Sue5xUeUPLu7nn2ECAEGrskJVBDWG8a1K',
            },
            value: '1',
          },
        },
      ],
      nonce: 5,
    },
  ];

  const events = transactionsToEvents(transactions, [HenMintHandler]);

  expect(events).toStrictEqual([
    {
      id: '339d569daacae576a29e29fd9255dcde',
      type: 'HEN_MINT',
      opid: '112502347',
      ophash: 'oo28HoW9LEbrA28M7XbDEvRmPqaA7QxPVmYbAUoAcKNAgXdDokB',
      timestamp: '2021-11-20T08:09:22Z',
      level: 1879134,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '545563',
      editions: '1',
      artist_address: 'tz1XUcZvBxAMMSqeMsfA4tunmEfTUcbEXQ88',
      is_verified_artist: true,
      royalties: '100',
      metadata_uri: 'ipfs://QmUuZ2GYamdpPE8TUYzQkQC2jjnq7oiYVeZwdKpB4SCarG',
      royalty_shares: {
        decimals: 3,
        shares: {
          tz1XUcZvBxAMMSqeMsfA4tunmEfTUcbEXQ88: '100',
        },
      },
    },
    {
      artist_address: 'tz1Sue5xUeUPLu7nn2ECAEGrskJVBDWG8a1K',
      is_verified_artist: true,
      editions: '1',
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      id: '848a62ea451b5bce284c9dab8c7e39e9',
      level: 2472925,
      metadata_uri: 'ipfs://QmapeUiKjG4cLHMrCYSy5ZnqeFcLH1cLgSbyUXvY9ju52i',
      ophash: 'opZEYSLU6vvUNJPMhzCYvmUNM5DDD8RfFDuvnhDenb4foWDjwXY',
      opid: '268672904',
      royalties: '100',
      royalty_shares: {
        decimals: 3,
        shares: {
          tz1Sue5xUeUPLu7nn2ECAEGrskJVBDWG8a1K: '100',
        },
      },
      timestamp: '2022-06-22T15:02:44Z',
      token_id: '750007',
      type: 'HEN_MINT',
    },
    {
      artist_address: 'tz1Sue5xUeUPLu7nn2ECAEGrskJVBDWG8a1K',
      is_verified_artist: true,
      editions: '1',
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      id: '58235e4ed9167cfe5403d14dc80fa4d2',
      level: 2472925,
      metadata_uri: 'ipfs://QmZpC9YJZJ2HUT6e7jBV9xW4BmAqBBBsiMrvaxjSnDJz8U',
      ophash: 'opZEYSLU6vvUNJPMhzCYvmUNM5DDD8RfFDuvnhDenb4foWDjwXY',
      opid: '268672906',
      royalties: '100',
      royalty_shares: {
        decimals: 3,
        shares: {
          tz1Sue5xUeUPLu7nn2ECAEGrskJVBDWG8a1K: '100',
        },
      },
      timestamp: '2022-06-22T15:02:44Z',
      token_id: '750008',
      type: 'HEN_MINT',
    },
  ]);
});
