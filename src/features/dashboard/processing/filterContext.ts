import type { EventStore, FilteredContext } from "../types";
import { getStartDay, toDayBucket } from "../utils";
import type { EventFilter } from "./types";

export function filterContext(
  store: EventStore,
  filter: EventFilter,
  cache: Map<string, FilteredContext>,
): FilteredContext {
  const { plan = "all", dateRange } = filter;

  // Caching
  const cacheKey = `${store.version}-${dateRange}-${plan}`;
  console.log(
    "filterContext store.events.length:",
    store.events.length,
    "filter:",
    filter,
    "cacheKey:",
    cacheKey,
  );
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  let eventIndexes: number[] = [];

  console.log("cek filter context");

  if (dateRange === "all") {
    eventIndexes = store.events.map((_, index) => index);
  } else {
    const now = Date.now();
    const startDay = toDayBucket(getStartDay(dateRange).getTime());
    const endDay = toDayBucket(now);

    for (let day = startDay; day <= endDay; day++) {
      const indexes = store.byDay.get(day);

      if (!indexes) continue;

      eventIndexes.push(...indexes);
    }
  }

  if (plan !== "all") {
    eventIndexes = eventIndexes.filter((index) => {
      const event = store.events[index];
      const isPro = store.proUsers.has(event.userId);
      return plan === "pro" ? isPro : !isPro;
    });
  }

  const userIds = new Set<string>();
  for (const index of eventIndexes) {
    userIds.add(store.events[index].userId);
  }

  const result = { eventIndexes, userIds };

  cache.set(cacheKey, result);

  return result;
}
