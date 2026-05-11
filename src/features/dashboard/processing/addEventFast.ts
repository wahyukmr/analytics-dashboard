import type { NormalizedEvent } from "../types";
import type { EventStore } from "../types";
import { toDayBucket } from "../utils";

export function addEventFast(store: EventStore, event: NormalizedEvent) {
  store.events.push(event);
  const eventIndex = store.events.length - 1;

  // unique users
  store.uniqueUsers.add(event.userId);

  // byUser
  if (!store.byUser.has(event.userId)) {
    store.byUser.set(event.userId, []);
  }
  store.byUser.get(event.userId)!.push(eventIndex);

  // bySession
  const sessionId = event.properties?.sessionId;
  if (sessionId) {
    if (!store.bySession.has(sessionId)) {
      store.bySession.set(sessionId, []);
    }
    store.bySession.get(sessionId)!.push(eventIndex);
  }

  // byFeature
  const feature = event.properties?.feature;
  if (feature && event.properties?.success) {
    if (!store.byFeature.has(feature)) {
      store.byFeature.set(feature, []);
    }
    store.byFeature.get(feature)!.push(eventIndex);
  }

  // byDay
  const dayBucket = toDayBucket(event.timestamp); // remove time-of-day from timestamp
  if (!store.byDay.has(dayBucket)) {
    store.byDay.set(dayBucket, []);
  }
  store.byDay.get(dayBucket)!.push(eventIndex);

  // segment
  if (event.properties?.plan === "pro") {
    store.proUsers.add(event.userId);
  }
}
