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
    {
      id: 798075662630912,
      level: 4422291,
      timestamp: '2023-10-18T10:39:27Z',
      block: 'BLPcdMeadSdXxxDX7HHCduY4qHAHrdU1Jr8C93wxSqmabxsJJsb',
      hash: 'onxxz87NragUFoTTMeDWBUxepDdjAwa32rnaZyeasUyLNrorRNe',
      counter: 69256629,
      nonce: null,
      sender: {
        alias: 'Laurent Houdard',
        address: 'tz1UNsJpUXT6HT69rssmHhENz1dVLPrhDPTw',
      },
      target: {
        address: 'KT1Xpmp15KfqoePNW9HczFmqaGNHwadV2a3b',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint_issuer',
        value: {
          tags: [],
          codex: {
            codex_entry: {
              type: '2',
              value: '1b38905f9bd468811905023d5216c2e2274203bd45e9902bbdbbfd71b8d2f9ed',
            },
          },
          amount: '32',
          enabled: false,
          pricing: {
            details: '0507070306008090a10f',
            pricing_id: '0',
            lock_for_reserves: false,
          },
          metadata:
            '6f6e636866733a2f2f66343931323466663061613836633737316331316130613933643264366532323339393739636530303432383232376363666530613733633432306263646362',
          reserves: [
            {
              data: '05020000001f07040a0000001600005fdb0f114b266608160167558bb58e777417a7470002',
              amount: '2',
              method_id: '0',
            },
          ],
          royalties: '150',
          open_editions: null,
          primary_split: [
            {
              pct: '1000',
              address: 'tz1UNsJpUXT6HT69rssmHhENz1dVLPrhDPTw',
            },
          ],
          royalties_split: [
            {
              pct: '1000',
              address: 'tz1UNsJpUXT6HT69rssmHhENz1dVLPrhDPTw',
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
        all_tokens: '29235',
        locked_eps: false,
        user_actions: 411396,
        codex_entries: 411390,
        reserve_methods: 411395,
        all_gentk_tokens: '125014',
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
        codex_entries_count: '3187',
        entrypoints_enabled: 411391,
        gentk_void_metadata: '697066733a2f2f516d5a5a56424b617044673277587a77704478646d4c39416836363568395a7a654a3967596462545a3447427a66',
        referrer_fees_share: '200',
        issuer_codex_updates: 411392,
      },
      diffs: [
        {
          bigmap: 411396,
          path: 'user_actions',
          action: 'update_key',
          content: {
            hash: 'expruJEXeyRii8sSFzVKsvgiZ8L4CTD6ypfsNC735NUspaaCNsjfJR',
            key: 'tz1UNsJpUXT6HT69rssmHhENz1dVLPrhDPTw',
            value: {
              last_minted: ['124068'],
              last_minted_time: '2023-10-14T20:35:47Z',
              last_issuer_minted: '29234',
              last_issuer_minted_time: '2023-10-18T10:39:27Z',
            },
          },
        },
        {
          bigmap: 411393,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'exprut4UFtKwXsn529wC6FFhvs8SsDkAJjA5fL2t4Z9vh4cpk8kzwG',
            key: '29234',
            value: {
              tags: [],
              author: 'tz1UNsJpUXT6HT69rssmHhENz1dVLPrhDPTw',
              supply: '32',
              balance: '32',
              enabled: false,
              codex_id: '3186',
              metadata:
                '6f6e636866733a2f2f66343931323466663061613836633737316331316130613933643264366532323339393739636530303432383232376363666530613733633432306263646362',
              reserves: [
                {
                  data: '05020000001f07040a0000001600005fdb0f114b266608160167558bb58e777417a7470002',
                  amount: '2',
                  method_id: '0',
                },
              ],
              royalties: '150',
              pricing_id: '0',
              has_tickets: false,
              open_editions: null,
              primary_split: [
                {
                  pct: '1000',
                  address: 'tz1UNsJpUXT6HT69rssmHhENz1dVLPrhDPTw',
                },
              ],
              locked_seconds: '0',
              royalties_split: [
                {
                  pct: '1000',
                  address: 'tz1UNsJpUXT6HT69rssmHhENz1dVLPrhDPTw',
                },
              ],
              input_bytes_size: '0',
              iterations_count: '0',
              timestamp_minted: '2023-10-18T10:39:27Z',
              lock_price_for_reserves: false,
            },
          },
        },
        {
          bigmap: 411390,
          path: 'codex_entries',
          action: 'add_key',
          content: {
            hash: 'exprvKwHEhtsjJBgBxRb6pge6uWgACvMYM7MvWovEEDDxYfvP4XGJ9',
            key: '3186',
            value: {
              type: '2',
              value: ['1b38905f9bd468811905023d5216c2e2274203bd45e9902bbdbbfd71b8d2f9ed'],
              author: 'tz1UNsJpUXT6HT69rssmHhENz1dVLPrhDPTw',
              locked: true,
            },
          },
        },
      ],
    },
    {
      id: 861533381853184,
      level: 4673461,
      timestamp: '2023-12-01T14:33:04Z',
      block: 'BKpDKC385geahtPVRf3y2aPABMqFKo1hhdYZLg57YjkJogEsDkv',
      hash: 'oobzWamNn7f5y1STa4i2FhQQgjzKNDHAwrMEtL2FHnuboJ57pW3',
      counter: 41263789,
      nonce: null,
      sender: {
        address: 'tz1bmPatnVaBa8brRzQ15i4vWzcBtdwJAkbn',
      },
      target: {
        address: 'KT1Xpmp15KfqoePNW9HczFmqaGNHwadV2a3b',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint_issuer',
        value: {
          tags: [],
          codex: {
            codex_entry: {
              type: '0',
              value: '697066733a2f2f516d646474664c546179507076366157584150414766654b6335434c72387157424a323772347638416a50315171',
            },
          },
          amount: '0',
          enabled: false,
          pricing: {
            details: '05070703060080dac409',
            pricing_id: '0',
            lock_for_reserves: false,
          },
          metadata: '697066733a2f2f516d523166426b61456272786453667a6e776157467933774e677a6264506d795451414233764534656673364c58',
          reserves: [],
          royalties: '100',
          open_editions: {
            extra: '',
            closing_time: '2023-12-01T17:22:00Z',
          },
          primary_split: [
            {
              pct: '1000',
              address: 'tz1bmPatnVaBa8brRzQ15i4vWzcBtdwJAkbn',
            },
          ],
          royalties_split: [
            {
              pct: '1000',
              address: 'tz1bmPatnVaBa8brRzQ15i4vWzcBtdwJAkbn',
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
        all_tokens: '29572',
        locked_eps: false,
        user_actions: 411396,
        codex_entries: 411390,
        reserve_methods: 411395,
        all_gentk_tokens: '139897',
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
        codex_entries_count: '3524',
        entrypoints_enabled: 411391,
        gentk_void_metadata: '697066733a2f2f516d5a5a56424b617044673277587a77704478646d4c39416836363568395a7a654a3967596462545a3447427a66',
        referrer_fees_share: '200',
        issuer_codex_updates: 411392,
      },
      diffs: [
        {
          bigmap: 411396,
          path: 'user_actions',
          action: 'update_key',
          content: {
            hash: 'expruUcPCD76QjAFLMzvokZ5mxMwwuhFvTzQEkEV5d4FgKjQ3zVZwk',
            key: 'tz1bmPatnVaBa8brRzQ15i4vWzcBtdwJAkbn',
            value: {
              last_minted: ['137727'],
              last_minted_time: '2023-12-01T13:40:24Z',
              last_issuer_minted: '29571',
              last_issuer_minted_time: '2023-12-01T14:33:04Z',
            },
          },
        },
        {
          bigmap: 411393,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'expruRRdCZ13yif7wj55AuKXqB8EvmbmkX7ona7NjyrFxF1SBcYyr6',
            key: '29571',
            value: {
              tags: [],
              author: 'tz1bmPatnVaBa8brRzQ15i4vWzcBtdwJAkbn',
              supply: '0',
              balance: '0',
              enabled: false,
              codex_id: '3523',
              metadata: '697066733a2f2f516d523166426b61456272786453667a6e776157467933774e677a6264506d795451414233764534656673364c58',
              reserves: [],
              royalties: '100',
              pricing_id: '0',
              has_tickets: false,
              open_editions: {
                extra: '',
                closing_time: '2023-12-01T17:22:00Z',
              },
              primary_split: [
                {
                  pct: '1000',
                  address: 'tz1bmPatnVaBa8brRzQ15i4vWzcBtdwJAkbn',
                },
              ],
              locked_seconds: '0',
              royalties_split: [
                {
                  pct: '1000',
                  address: 'tz1bmPatnVaBa8brRzQ15i4vWzcBtdwJAkbn',
                },
              ],
              input_bytes_size: '0',
              iterations_count: '0',
              timestamp_minted: '2023-12-01T14:33:04Z',
              lock_price_for_reserves: false,
            },
          },
        },
        {
          bigmap: 411390,
          path: 'codex_entries',
          action: 'add_key',
          content: {
            hash: 'expru8NTYdTMHRaSCasbASd4jRHsB8GP4R22K8WDPs7XjWUnRiTfii',
            key: '3523',
            value: {
              type: '0',
              value: ['697066733a2f2f516d646474664c546179507076366157584150414766654b6335434c72387157424a323772347638416a50315171'],
              author: 'tz1bmPatnVaBa8brRzQ15i4vWzcBtdwJAkbn',
              locked: true,
            },
          },
        },
      ],
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
    {
      id: '9eab418e64cda51a621cc64afdcfe197',
      type: 'FX_MINT_ISSUER_V4',
      artist_address: 'tz1UNsJpUXT6HT69rssmHhENz1dVLPrhDPTw',
      editions: '32',
      fa2_address: 'KT1EfsNuqwLAWDd3o4pvfUx1CAh5GMdTrRvr',
      is_verified_artist: true,
      issuer_id: '29234',
      level: 4422291,
      metadata_uri: 'onchfs://f49124ff0aa86c771c11a0a93d2d6e2239979ce00428227ccfe0a73c420bcdcb',
      ophash: 'onxxz87NragUFoTTMeDWBUxepDdjAwa32rnaZyeasUyLNrorRNe',
      opid: '798075662630912',
      royalties: '150',
      timestamp: '2023-10-18T10:39:27Z',
    },
    {
      artist_address: 'tz1bmPatnVaBa8brRzQ15i4vWzcBtdwJAkbn',
      editions: '0', // Open Edition
      fa2_address: 'KT1EfsNuqwLAWDd3o4pvfUx1CAh5GMdTrRvr',
      id: '267c16d6214dd57b71e306a01f19d04b',
      is_verified_artist: true,
      issuer_id: '29571',
      level: 4673461,
      metadata_uri: 'ipfs://QmR1fBkaEbrxdSfznwaWFy3wNgzbdPmyTQAB3vE4efs6LX',
      ophash: 'oobzWamNn7f5y1STa4i2FhQQgjzKNDHAwrMEtL2FHnuboJ57pW3',
      opid: '861533381853184',
      royalties: '100',
      timestamp: '2023-12-01T14:33:04Z',
      type: 'FX_MINT_ISSUER_V4',
    },
  ]);
});
