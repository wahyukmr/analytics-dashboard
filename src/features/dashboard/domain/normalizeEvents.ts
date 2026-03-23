import type { NormalizedEvent, RawEvent } from "../dashboardTypes";

export function normalizeEvents(events: RawEvent[]): NormalizedEvent[] {
  return events.map((event) => {
    const timestamp = new Date(event.timestamp);

    return {
      ...event,
      timestamp,
      date: timestamp.toISOString().slice(0, 10), // Extract YYYY-MM-DD for grouping
    };
  });
}
