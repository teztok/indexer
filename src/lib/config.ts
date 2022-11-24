import fs from 'fs';

require('dotenv').config();

const defaultConfig = {
  eventProducerConcurrency: 4, // TODO: 1?
  fetchMetadataConcurrency: 4,
  eventProcessorConcurrency: 4,
  rebuildConcurrency: 1,
  rebuildPollInterval: 500,
  workerPollInterval: 500,
  startBlock: 1365000,
  maxBlocksPerIteration: 1000,
  tzktApiUrl: process.env.TZKT_API || 'https://api.mainnet.tzkt.io/v1',
  fetchMetadataTimeout: process.env.FETCH_METADATA_TIMEOUT ? parseInt(process.env.FETCH_METADATA_TIMEOUT, 10) : 40000,
  metadataMaxFilesize: 1024 * 30, // 30kb
  thumbnailWidths: [320, 640, 960],
  allowedContractAddresses: ['KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton'], // if empty, all contracts are allowed
  ignoredContractAddresses: [
    'KT1AFA2mwNUMNd4SsujE1YYp29vd8BZejyKW', // hDAO
    'KT1M81KrJr6TxYLkZkVqcpSTNKGoya8XytWT', // ECOIN NETWORK
    'KT1WtCq6FuL2kYTK1x7AkmpPjb8wEJZTUwvX', // wTaco
    'KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW', // Youves Synthetic Asset
    'KT1ErKVqEhG9jxXgUG2KGLW3bNM7zXHX8SDF', // Unobtanium
    'KT1AM3PV1cwmGRw28DVTgsjjsjHvmL6z4rGh', // akaDAO
    'KT18fp5rcTW7mbWDmzFwjLDUhs5MeJmagDSZ', // Wrapped Tokens Contract
    'KT1LRboPna9yQY9BrjtQYDS1DVxhKESK4VVd', // Wrap Governance Token
    'KT193D4vozYnhGJQVtw7CoxxqphqUEEwK6Vb', // Quipuswap Governance Token
    'KT1Wa8yqRBpFCusJWgcQyjhRz7hUQAmFxW7j', // FLAME
    'KT1Xobej4mc6XgEjDoJoHtTKgbD1ELMvcQuL', // YOU Governance
    'KT1VHd7ysjnvxEzwtjBAmYAmasvVCfPpSkiG', // sCasino Tokens
    'KT19ovJhcsUn4YU8Q5L3BGovKSixfbWcecEA', // Salsa
    'KT1XPFjZqCULSnqfKaaYy8hJjeY63UNSGwXg', // Crunchy.Network DAO Token
    'KT1CS2xKGHNPTauSh5Re4qE3N9PCfG5u4dPx', // Spice Token
    'KT18hYjnko76SBVv6TaCT4kU6B32mJk6JWLZ', // MATH Token
    'KT19wuExNXayErfuCkcy6Z56cd1FWzF96xXk', // AQRtz
    'KT1F8gkt9o4a2DKwHVsZv9akrF7ZbaYBHpMy', // MIMEY
    'KT1UsSfaXyqcjSVPeiD7U1bWgKy3taYN7NWY', // Plenty Bridge FA2
    'KT1C9X9s5rpVJGxwVuHEVBLYEdAQ1Qw8QDjH', // TezDAO
    'KT1BRhcRAdLia3XQT1mPSofHyrmYpRddgj3s', // tzDrops
    'KT1GBZmSxmnKJXGMdMLbugPfLyUPmuLSMwKS', // Tezos Domains NameRegistry
    'KT1SovvF5KRQjBiVX8cHFmEoMc7H54ehxstV',
    'KT1PnUZCp3u2KzWr93pn4DD7HAJnm3rWVrgn',
    'KT1JXxK3bd39ayLiiBdKm2cdReYnVSG3bkzK',
    'KT1Qf46j2x37sAN4t2MKRQRVt9gc4FZ5duMs',
    'KT1XnTn74bUtxHfDtBmm2bGZAQfhPbvKWR8o',
    'KT1ExpspQSag2x5dATrBxEQzrHP5PJd28fA4',
    'KT1J9Ys872gGuDLiLUBssMo9FBsBd4ZdhJkj',
    'KT1VPY88synoNLH4HyTvQ9eFSaxhMpM1vZEG',
    'KT1CegZeeBZLjvy2oD4gcZwf17ucs4fwvXH8',
    'KT1K4jn23GonEmZot3pMGth7unnzZ6EaMVjY',
    'KT1UUjqN2tVHb2xEXS6XHs1GbuV1F6cDTAiT',
    'KT1EVPNZtekBirJhvALU5gNJS2F3ibWZXnpd',
    'KT1U4FkT3wFxGbiCWAdJSwFB1tzdC5WGrTub',
    'KT1T87QbpXEVgkwsNPzz8iRoah3SS3D1MDmh',
    'KT1BEHqhkuqpBoMKuMZSQNx1fEwWp4dranEH',
    'KT1TjQMZTESm7UpRfRey9b46EmcPmpkpHyEa',
    'KT1BVgsihWTDsszuL47NRznzV3gz65uKj9TV',
    'KT1SEgjiCQYhY4frASUNEsYVTdyUbvZbrmZr',
    'KT1NyxQa2V54sc1s2rL4CuCjM6GyX22BKqAV',
    'KT1TGzfW1ME3QzfiHWgTUnTyJubv5mk2ZuHK',
    'KT1LbBbK4XQVmbQQiHdqzWxANM4ZdASQvdSA',
    'KT18quSVkqhbJS38d5sbRAEkXd5GoNqmAoro',
    'KT19SH9xxZcNKK5uiFuD7XUX8DzzrBGXHVwK',
    'KT1Pmb16c5K5SXaMpXnb5pneu87oAngLdYv5',
    'KT1QQvdg7TGZAH85HtgNvQuoekNRegvQPk8R',
    'KT1CxE36bXiCJnLZ9C9z1Ma921qu3ksmeZxc',
    'KT1PYdfipZK4it4Lq7wqhcKuueuuRTUEpcwY',
    'KT1NN1NgmKFTW5FUWiyxVjUt3kH9bCiqgxLW',
    'KT1UefQz7nP8BuuDk5Dd5LWo22N1ZPB7JB5o',
    'KT1E7p6ZB5QQ74DidB6cSanxkEv1xF2YT9or',
    'KT1U8jQyUkwsYVpgogrjSAKyQXi8kWengpzp',
    'KT1EBpRMdK98rPpaXqJeW4822WAdwXYNL64d',
    'KT1FHewqgFXCjTJbYvLMhWL335ZV1qupN1c2',
    'KT1KgNVokovu4dSBFZXmFXgUni5TypwMBbRS',
    'KT1DX7UdxtzW7bEBihW31kV8Ge4MojAgrLNW',
    'KT1WWZKv8sHrfRyjKVwsjugBEs3XoAZ4eWgB',
    'KT1UUqpFMF1PL9kc6LptW6c2v7KUwUJVSENC',
    'KT1RBLbqbdej7xy1bbqb4pG7YQJxFxQhc42Z',
    'KT1X125rpfx7v2jxApYKQknh5gkkDWHJVuCn',
    'KT1EAuMMJgtZ4uR9HpjkhcyAQQtDZSsadUR4',
    'KT1VLvdV1u268eVzBFEFr72JgEKhq2MU6NqJ',
    'KT1Hracv2fkYoMHb1kx2P6mwmE4bkZ3jo11i',
    'KT1TPUhn1tfnZ6V2VShDGWe2y5pQoXycrAoQ',
    'KT1G7eYQMbwdYb6dbHMuUfV2Bbrn9cYmc6wW',
    'KT1M234AC3kz9uQ9vse8caidhKUMrZ3S2YjN',
    'KT1EtCPwceFWty18zjVU8jeo2dcbCVxFMm1r',
    'KT1XJsggBSsByyqSwA2UdVBXcqa2gQZeTjkX',
    'KT1WiDfeeRVpY2ao4ps4oJUgXi1wMWtD6sFa',
    'KT1LZfTkqoJDza1QEizM7WoUcsHb4jznEnWt',
    'KT1GeH12st1t3sVnvUDxR8UKm6ouXxai1vnp',
    'KT1VAbfwhE9DaZWdja4hg6CF77YPc1Ne9qvK',
    'KT1MYqsWXuVFFXssjKXJNZWmXcL3bmf3dH1L',
    'KT1RHoasnafRATyhvELE1d2XfrgZPSDTFPEn',
    'KT1PBJcT5ayGf4tjHRyvh2tTx7DpBUudoGyA',
    'KT1HMDDEwHLHcLs9YiLRx9GbSexww3439aca',
    'KT1V5yCUQ73nUjrbk82ALcrGNdRFNk3k2tvX',
    'KT1KRqNfeVBXJ26bgqfQD3sPma7Wv6Mc1rfc',
    'KT1Lj9MAgFHgxa12GazkK1RQBNppEp2dsyhQ',
    'KT1M76m8hddoSYAKEZro523VBJ9fLZsEA6fZ',
    'KT1JeDD6MN5MoAryMhdLzeNCLjtatFDecxsa',
    'KT1Mg7Jaxz9n6YM9XjbDLhAjbuWa9bzhAAy9',
    'KT1R52Gk7LzWvyV41oP9dRUbboHs4yVTXAZT',
    'KT1XGA2DDdNJnmNdM8VSfsnfttVv5AYaQMbX',
    'KT1JJUWAb6WHoKpzT2Ga5Y4rgMAkeptKHqQ8',
    'KT1QgvxaXga2U2JJ6fh7Aqdeye7YPN3ZWig6',
    'KT1TwydTCPv6EPJnVBPu8rHsPS4xTG69vdQ1',
    'KT1KN8cJVfr6VJ7fYyYaeNVAtcd8m15sqqiC',
    'KT1MxjTwTB5nxuQ4LrtzPCyktBXMA5XJFe3N',
    'KT1PMfohCLwrnazZEGSEpewhCShyXnPv5i2p',
    'KT1MdVSf3ZCSbWtMmtLrL6jYFtLNLnVUNtqS',
    'KT1L2nx5c8ABUEDpcowfVE6jVmiJKU9DzqZ2',
    'KT1DdxRFoVEjE2FtsuEL1p2iippu6xCw8XhS',
    'KT1NYhjbPh1mPz6DoBsgBRzpLAUTAJbLP9TU',
    'KT1Puorq4KZYqcYjoGREEzGi8aYg4FjfiMRb',
    'KT1BWvkCamCVgAbSJwZn2hriECV2uChm1Hn8',
    'KT1Lj7ntVnkktiK9DZpEf5xDq1co5PeKS9sj',
    'KT1EXQDkQK5eW7hKZdMYYcwoVpHmGfXkd5QR',
    'KT1ERcGUJositnhteQPqrYKEwtBya3D6Z9pw',
    'KT1FmazgyqcxqiKT31CdEbjnw32h7F4a1zGD',
    'KT1Kgn6s7PHsc6ykJSEuELUb9pLMY3zvoQXn',
    'KT1WNQspJzgUQ4UnqRrzZFKexkP1ZeLTYFLW',
    'KT1EDSsAZQgj4STv7ritBBoo4a1vUmS7yCko',
    'KT1EdnTmo2ry5gEZD3PUFhkD1Nm7kMAHwK3g',
    'KT1RNVvATTSoha3yYVteATvhFSj92QqsKswm',
    'KT1VLcPguq8ZYbVcae2aPdnoRegniA16iZxB',
    'KT1CQP8yjNJM3cn1hyJYtqhmzwUBvv7Xdwg5',
    'KT1Q3Z9VwmSG6wFNLebD9yRm7PENXHJxHn3n',
    'KT1L7f4upsW2S6sW35C2kKsBsd8FqCrTW8c3',
    'KT1RP2ckShbnWh3FYSBfqj7LcQUtdTmR3X15',
    'KT1N6eu73zztodRsxhJSMEU7R7sxmyBcCV2t',
    'KT1MwQ7j3imPPyLRCaqsrn9zB79i7rnepmhJ',
    'KT1WWTaedGrBp3gn727KGma8moFPHkUhsAMs',
    'KT1V1fnhD8F2TyF1cSFDJM3cFjKDHFZ7BjJh',
    'KT1MdBEZd21VuyM9G1RLzUdogfvzv7p6ZM2N',
    'KT1TRtYkzHivDvRAQxYNDBmdnyVfjGtDUZrU',
    'KT1Edj7sMUFvrUetdDZLs2K9wusJjUF9Fm7P',
  ],
};

let customConfig = {};

try {
  customConfig = JSON.parse(fs.readFileSync('../../data/teztok.json', { encoding: 'utf8', flag: 'r' }));
} catch (err) {}

const config = { ...defaultConfig, ...customConfig };

export default config;
