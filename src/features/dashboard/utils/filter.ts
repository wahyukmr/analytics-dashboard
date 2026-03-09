import type { DateRange, NormalizedEvent } from "../types";

export function filterByDate(
  events: NormalizedEvent[],
  range: DateRange,
): NormalizedEvent[] {
  return events.filter((event) => {
    return event.date >= range.startDate && event.date <= range.endDate;
  });
}
