import TeiaSplitContractOriginationHandler from './teia_split_contract_origination';
import { originationsToEvents } from '../../../tasks/event-producer/event-producer';
import { Originations } from '../../../types';

test('creates TEIA_SPLIT_CONTRACT_ORIGINATION events', async () => {
  const originations: Originations = [
    {
      id: 66599251869696,
      nonce: 9,
      level: 1586585,
      timestamp: '2021-08-04T12:47:46Z',
      block: 'BMRRVC9xF2fKEuBJAX7BJi1hXUEugy4VLiPN7R62LDK7fMT8zrh',
      counter: 11941258,
      hash: 'oo28JbSrWr7NMy95qdba56m85TcA2poJCgteB5DWUEMrZvC1B38',
      initiator: {
        alias: '1x1',
        address: 'tz1YJvMiZyXnzvV9pxtAiuCFvaG7XoBZhbUQ',
      },
      sender: {
        address: 'KT1DoyD6kr8yLK8mRBFusyKYJUk2ZxNHKP1N',
      },
      status: 'applied',
      storage: {
        shares: {
          tz1YJvMiZyXnzvV9pxtAiuCFvaG7XoBZhbUQ: '45000',
          tz1ZUohCAkGjp7vPjQcC4VWcpgYZR1t3Si5C: '5000',
          tz1eggoxCes1qYRGLc3E1bg4uzuCUUuuQBb9: '5000',
          tz2Hz4TVJZjoQVks4SfWgt38RfZTmrHmVH62: '45000',
        },
        isPaused: false,
        totalShares: '100000',
        tokenAddress: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
        administrator: 'tz1YJvMiZyXnzvV9pxtAiuCFvaG7XoBZhbUQ',
        minterAddress: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
        registryAddress: 'KT1My1wDZHDGweCrJnQJi3wcFaS67iksirvj',
        coreParticipants: ['tz1YJvMiZyXnzvV9pxtAiuCFvaG7XoBZhbUQ', 'tz2Hz4TVJZjoQVks4SfWgt38RfZTmrHmVH62'],
        marketplaceAddress: 'KT1HbQepzV1nVGg8QVznG7z4RcHseD5kwqBn',
        proposedAdministrator: null,
      },
      originatedContract: {
        kind: 'smart_contract',
        address: 'KT1K8A2cqqpQTEHYpY9R7aAybCdcM3tNpXyu',
        typeHash: 1449840799,
        codeHash: -1760376355,
      },
    },
  ];

  const events = originationsToEvents(originations, [TeiaSplitContractOriginationHandler]);

  expect(events).toStrictEqual([
    {
      id: 'ea6ca50e20bb8aeb510d4d61ce62b5cf',
      type: 'TEIA_SPLIT_CONTRACT_ORIGINATION',
      opid: '66599251869696',
      ophash: 'oo28JbSrWr7NMy95qdba56m85TcA2poJCgteB5DWUEMrZvC1B38',
      timestamp: '2021-08-04T12:47:46Z',
      level: 1586585,
      contract_address: 'KT1K8A2cqqpQTEHYpY9R7aAybCdcM3tNpXyu',
      custom_data: {
        shares: {
          tz1YJvMiZyXnzvV9pxtAiuCFvaG7XoBZhbUQ: '45000',
          tz1ZUohCAkGjp7vPjQcC4VWcpgYZR1t3Si5C: '5000',
          tz1eggoxCes1qYRGLc3E1bg4uzuCUUuuQBb9: '5000',
          tz2Hz4TVJZjoQVks4SfWgt38RfZTmrHmVH62: '45000',
        },
        administrator: 'tz1YJvMiZyXnzvV9pxtAiuCFvaG7XoBZhbUQ',
        total_shares: '100000',
        core_participants: ['tz1YJvMiZyXnzvV9pxtAiuCFvaG7XoBZhbUQ', 'tz2Hz4TVJZjoQVks4SfWgt38RfZTmrHmVH62'],
      },
    },
  ]);
});
