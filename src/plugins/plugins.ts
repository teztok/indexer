import { TransactionHandler, OriginationHandler, Task, Metadata, Token, AnyListing, AnyOffer, Holding } from '../types';
import { AnyEvent } from '../tasks/event-producer/handlers/index';

interface RebuildTokenPayload {
  token_id: string;
  fa2_address: string;
  events: Array<AnyEvent>;
  token: Token;
  listings: Array<AnyListing>;
  offers: Array<AnyOffer>;
  holders: Record<string, Holding>;
  tags: Array<string>;
  royaltyReceivers: Array<{ receiver_address: string; royalties: string }> | null;
  metadata: Metadata;
}

type RebuildListener = (type: string, payload: any) => Promise<any>;
type TokenRebuildListener = (payload: RebuildTokenPayload) => Promise<any>;
type EventsProducedListener = (events: Array<AnyEvent>) => Promise<any>;
type MetadataFetchedListener = (metadataUri: string, metadata: any) => Promise<any>;

export const transactionHandlers: Array<TransactionHandler<AnyEvent>> = [];
export const originationHandlers: Array<OriginationHandler<AnyEvent>> = [];
export const tasks: Array<Task> = [];

const rebuildListeners: Array<RebuildListener> = [];
const tokenRebuildListeners: Array<TokenRebuildListener> = [];
const eventsProducedListeners: Array<EventsProducedListener> = [];
const metadataFetchedListeners: Array<MetadataFetchedListener> = [];

export function registerTransactionEventHandler(handler: TransactionHandler<AnyEvent>) {
  transactionHandlers.push(handler);
}

export function registerOriginationEventHandler(handler: OriginationHandler<AnyEvent>) {
  originationHandlers.push(handler);
}

export function registerTask(task: Task) {
  tasks.push(task);
}

export function onRebuild(listener: RebuildListener) {
  rebuildListeners.push(listener);
}

export function onTokenRebuild(listener: TokenRebuildListener) {
  tokenRebuildListeners.push(listener);
}

export function onEventsProduced(listener: EventsProducedListener) {
  eventsProducedListeners.push(listener);
}

export function onMetadataFetched(listener: MetadataFetchedListener) {
  metadataFetchedListeners.push(listener);
}

export async function triggerRebuild(...args: Parameters<RebuildListener>) {
  for (const listener of rebuildListeners) {
    await listener(...args);
  }
}

export async function triggerTokenRebuild(...args: Parameters<TokenRebuildListener>) {
  for (const listener of tokenRebuildListeners) {
    await listener(...args);
  }
}

export async function triggerEventsProduced(...args: Parameters<EventsProducedListener>) {
  for (const listener of eventsProducedListeners) {
    await listener(...args);
  }
}

export async function triggerMetadataFetched(...args: Parameters<MetadataFetchedListener>) {
  for (const listener of metadataFetchedListeners) {
    await listener(...args);
  }
}
