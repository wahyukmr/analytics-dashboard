import { MockEventGenerator } from "./data/mockEventGenerator";
import { normalizeEvents } from "./domain";

export function fetchMockEvents() {
  const rawEvents = new MockEventGenerator();

  return normalizeEvents(
    rawEvents.generateMockEvents({
      userCount: 1000,
      maxDaysBack: 30,
    }),
  );
}
