import FxMintIssuerV4Handler from './fx_mint_issuer_v4';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates FX_MINT_ISSUER_V4 events', async () => {
  const transactions: Transactions = [
    {
      id: 491770836156416,
      level: 3241863,
      timestamp: '2023-03-20T07:46:59Z',
      block: 'BKqCfwXtVcMmEzAC4zUqEvqsWoFeV7PemsRoDMzAUMoGdpe8ETF',
      hash: 'ooxUebr54KznKcjn1SnKUtJynFxG6TKYgTwkvDfAYKqihcqZnbB',
      counter: 80868502,
      sender: {
        address: 'tz1WqQNft26985ZiQGvQ5U57hgLerDekAJeJ',
      },
      target: {
        address: 'KT1Xpmp15KfqoePNW9HczFmqaGNHwadV2a3b',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint_issuer',
        value: {
          tags: ['101'],
          codex: {
            codex_entry: {
              type: '0',
              value: '697066733a2f2f516d6552544c5a34473371676e346e464d3234613777654e7753726d4862375a774a66355067576a3333474a5731',
            },
          },
          amount: '995',
          enabled: true,
          pricing: {
            details: '05070703060090b476',
            pricing_id: '0',
            lock_for_reserves: false,
          },
          metadata: '697066733a2f2f516d66506f48464759436935787355334e4467567979656346714e474a6a454c687355715a533757554a4d787051',
          reserves: [],
          royalties: '100',
          open_editions: null,
          primary_split: [
            {
              pct: '1000',
              address: 'tz1WqQNft26985ZiQGvQ5U57hgLerDekAJeJ',
            },
          ],
          royalties_split: [
            {
              pct: '1000',
              address: 'tz1WqQNft26985ZiQGvQ5U57hgLerDekAJeJ',
            },
          ],
          input_bytes_size: '0',
          mint_ticket_settings: null,
        },
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        fees: '50',
        admin: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
        ledger: 411393,
        paused: false,
        big_map: 411397,
        metadata: 411394,
        addresses: 411389,
        lock_time: '3600',
        all_tokens: '26079',
        locked_eps: false,
        user_actions: 411396,
        codex_entries: 411390,
        reserve_methods: 411395,
        all_gentk_tokens: '376',
        pricing_contracts: {
          '0': {
            address: 'KT1V24J6FVuKPU3xy6gVF6wJ3zdRXBheQhaV',
            enabled: true,
          },
          '1': {
            address: 'KT1MFgHKorMWXeVL6qrpgjZmemirafppSg9q',
            enabled: true,
          },
        },
        codex_entries_count: '31',
        entrypoints_enabled: 411391,
        gentk_void_metadata: '697066733a2f2f516d5a5a56424b617044673277587a77704478646d4c39416836363568395a7a654a3967596462545a3447427a66',
        referrer_fees_share: '200',
        issuer_codex_updates: 411392,
      },
      diffs: [
        {
          bigmap: 411396,
          path: 'user_actions',
          action: 'add_key',
          content: {
            hash: 'exprubH949GcAJNhyjwn3ztwFgkeKkLNL82HReoPaz1dmjEwpLTmox',
            key: 'tz1WqQNft26985ZiQGvQ5U57hgLerDekAJeJ',
            value: {
              last_minted: [],
              last_minted_time: '1970-01-01T00:00:00Z',
              last_issuer_minted: '26078',
              last_issuer_minted_time: '2023-03-20T07:46:59Z',
            },
          },
        },
        {
          bigmap: 411393,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'exprtf9Z35N5xjK1FyyNsveQHyPoH9xJuaJsuzQzhpfEyWSUHj2pQR',
            key: '26078',
            value: {
              tags: ['101'],
              author: 'tz1WqQNft26985ZiQGvQ5U57hgLerDekAJeJ',
              supply: '995',
              balance: '995',
              enabled: true,
              codex_id: '30',
              metadata: '697066733a2f2f516d66506f48464759436935787355334e4467567979656346714e474a6a454c687355715a533757554a4d787051',
              reserves: [],
              royalties: '100',
              pricing_id: '0',
              has_tickets: false,
              open_editions: null,
              primary_split: [
                {
                  pct: '1000',
                  address: 'tz1WqQNft26985ZiQGvQ5U57hgLerDekAJeJ',
                },
              ],
              locked_seconds: '3600',
              royalties_split: [
                {
                  pct: '1000',
                  address: 'tz1WqQNft26985ZiQGvQ5U57hgLerDekAJeJ',
                },
              ],
              input_bytes_size: '0',
              iterations_count: '0',
              timestamp_minted: '2023-03-20T07:46:59Z',
              lock_price_for_reserves: false,
            },
          },
        },
        {
          bigmap: 411390,
          path: 'codex_entries',
          action: 'add_key',
          content: {
            hash: 'exprtZhHTrdNn1Y4YwWj4TQn2esLgkFKPMVC94qvrYJN6E3m6Uo1Jc',
            key: '30',
            value: {
              type: '0',
              value: ['697066733a2f2f516d6552544c5a34473371676e346e464d3234613777654e7753726d4862375a774a66355067576a3333474a5731'],
              author: 'tz1WqQNft26985ZiQGvQ5U57hgLerDekAJeJ',
              locked: true,
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [FxMintIssuerV4Handler]);

  expect(events).toStrictEqual([
    {
      id: 'aabecfb2bdfaab5e2041cc0c761de498',
      type: 'FX_MINT_ISSUER_V4',
      opid: '491770836156416',
      ophash: 'ooxUebr54KznKcjn1SnKUtJynFxG6TKYgTwkvDfAYKqihcqZnbB',
      timestamp: '2023-03-20T07:46:59Z',
      level: 3241863,
      fa2_address: 'KT1EfsNuqwLAWDd3o4pvfUx1CAh5GMdTrRvr',
      issuer_id: '26078',
      editions: '995',
      artist_address: 'tz1WqQNft26985ZiQGvQ5U57hgLerDekAJeJ',
      is_verified_artist: true,
      royalties: '100',
      metadata_uri: 'ipfs://QmfPoHFGYCi5xsU3NDgVyyecFqNGJjELhsUqZS7WUJMxpQ',
    },
  ]);
});
