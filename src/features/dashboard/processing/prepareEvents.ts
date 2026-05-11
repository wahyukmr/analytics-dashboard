import type { NormalizedEvent, RawEvent } from "../types";
import { toTimestamp } from "../utils";
import type { PreparedData } from "./types";

export function prepareEvents(events: RawEvent[]): PreparedData {
  const proUsers = new Set<string>();

  const normalized: NormalizedEvent[] = events
    .map((e) => {
      const ts = toTimestamp(e.timestamp);

      const plan = e.properties?.plan;
      if (plan === "pro") proUsers.add(e.userId);

      return ts && !Number.isNaN(ts)
        ? {
            eventType: e.eventType,
            userId: e.userId,
            timestamp: ts,
            ...(e.properties && { properties: e.properties }),
          }
        : null;
    })
    .filter((x): x is NormalizedEvent => x !== null);

  if (normalized.length !== events.length) {
    console.warn(
      "prepareEvents: some events had invalid timestamps and were dropped",
    );
  }

  normalized.sort((a, b) => a.timestamp - b.timestamp);

  return { events: normalized, proUsers };
}
