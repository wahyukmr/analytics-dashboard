import type { EventStore } from "../types";

export function createEventStore(): EventStore {
  return {
    events: [],

    byUser: new Map(),
    bySession: new Map(),
    byFeature: new Map(),

    byDay: new Map(),

    proUsers: new Set(),
    uniqueUsers: new Set(),

    version: 0,
  };
}
