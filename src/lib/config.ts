import fs from 'fs';

require('dotenv').config();

const defaultConfig = {
  eventProducerConcurrency: 4,
  fetchMetadataConcurrency: 4,
  eventProcessorConcurrency: 4,
  eventProcessArtifactConcurrency: 0, // disable by default
  rebuildTokenConcurrency: 1,
  rebuildTokenPollInterval: 500,
  workerPollInterval: 500,
  startBlock: 1365000,
  maxBlocksPerIteration: 1000,
  tzktApiUrl: process.env.TZKT_API || 'https://api.mainnet.tzkt.io/v1',
  assetsUrl: 'https://assets.teztok.com/file/tezartifacts',
  metadataMaxFilesize: 1024 * 30, // 30kb
  thumbnailWidths: [320, 640, 960],
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
  ],
};

let customConfig = {};

try {
  customConfig = JSON.parse(fs.readFileSync('../../data/teztok.json', { encoding: 'utf8', flag: 'r' }));
} catch (err) {}

const config = { ...defaultConfig, ...customConfig };

export default config;
