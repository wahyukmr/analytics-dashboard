import { addEventFast } from "./addEventFast";
import { createEventStore } from "./createEventStore";
import type { PreparedData } from "./types";

export function buildStoreFromPrepared(prepared: PreparedData) {
  const store = createEventStore();

  for (const event of prepared.events) {
    // Bulk insert without updating indexes for each event
    addEventFast(store, event);

    // Realtime insert with index update (uncomment if needed, but will be slower)
    // addEvent(store, event);
  }

  // Use a build timestamp as version so each rebuild has a unique id and
  // `filterContext` cache keys never collide between builds.
  store.version = Date.now();
  console.log(
    "store.events after build:",
    store.events.length,
    "store.version:",
    store.version,
  );

  return store;
}
