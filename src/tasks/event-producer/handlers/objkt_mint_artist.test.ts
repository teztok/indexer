import ObjktMintArtistHandler from './objkt_mint_artist';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_MINT_ARTIST events', async () => {
  const transactions: Transactions = [
    {
      id: 114017578,
      level: 1888131,
      timestamp: '2021-11-23T14:31:52Z',
      block: 'BKy3PaADCcGUS9qwoAf672gsRECFdz619GLcc6PuPRXkhkTeuRd',
      hash: 'ooCVLqTMQATVgMgLUjzjr8qEPtaymbfqb6RYjxL3GgbsFtj9P6K',
      counter: 33152955,
      sender: {
        alias: 'GhoulishGroom',
        address: 'tz1UxW1chiPvekzf23ze4L17JY26jTUtHsMF',
      },
      target: {
        alias: 'objkt.com Minting Factory',
        address: 'KT1Aq4wWmVanpQhq4TTfjZXB5AjFpx15iQMM',
      },
      parameter: {
        entrypoint: 'mint_artist',
        value: {
          target: 'tz1UxW1chiPvekzf23ze4L17JY26jTUtHsMF',
          editions: '15',
          metadata_cid: '697066733a2f2f516d634877485877344a4c46486d6967556a5078715772445876726f4d44444e7970756a4c614b3375764b786438',
          collection_id: '2437',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
    },
    {
      id: 114017579,
      level: 1888131,
      timestamp: '2021-11-23T14:31:52Z',
      block: 'BKy3PaADCcGUS9qwoAf672gsRECFdz619GLcc6PuPRXkhkTeuRd',
      hash: 'ooCVLqTMQATVgMgLUjzjr8qEPtaymbfqb6RYjxL3GgbsFtj9P6K',
      counter: 33152955,
      sender: {
        alias: 'objkt.com Minting Factory',
        address: 'KT1Aq4wWmVanpQhq4TTfjZXB5AjFpx15iQMM',
      },
      target: {
        address: 'KT1NYs2KnP8ckRWbhDDBLC5u7TLNG9zRVCv6',
      },
      parameter: {
        entrypoint: 'mint',
        value: {
          amount: '15',
          address: 'tz1UxW1chiPvekzf23ze4L17JY26jTUtHsMF',
          metadata: {
            '': '697066733a2f2f516d634877485877344a4c46486d6967556a5078715772445876726f4d44444e7970756a4c614b3375764b786438',
          },
          token_id: '18',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: {
        alias: 'GhoulishGroom',
        address: 'tz1UxW1chiPvekzf23ze4L17JY26jTUtHsMF',
      },
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktMintArtistHandler]);

  expect(events).toStrictEqual([
    {
      id: '13c2af1e341001696d0a94f320bfec6c',
      type: 'OBJKT_MINT_ARTIST',
      opid: 114017578,
      timestamp: '2021-11-23T14:31:52Z',
      level: 1888131,
      fa2_address: 'KT1NYs2KnP8ckRWbhDDBLC5u7TLNG9zRVCv6',
      artist_address: 'tz1UxW1chiPvekzf23ze4L17JY26jTUtHsMF',
      collection_id: '2437',
      token_id: '18',
      editions: '15',
      metadata_uri: 'ipfs://QmcHwHXw4JLFHmigUjPxqWrDXvroMDDNypujLaK3uvKxd8',
    },
  ]);
});
