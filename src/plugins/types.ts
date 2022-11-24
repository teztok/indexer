import { TeiaSubjktRegistryEvent } from './teia/handlers/teia_subjkt_registry';
import { TeiaSplitContractOriginationEvent } from './teia/handlers/teia_split_contract_origination';
import { TeiaSplitContractSignEvent } from './teia/handlers/teia_split_contract_sign';

export type AnyPluginEvent = TeiaSubjktRegistryEvent | TeiaSplitContractOriginationEvent | TeiaSplitContractSignEvent;
