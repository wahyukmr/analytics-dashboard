import type { NormalizedEvent, DateRange } from "./dashboardTypes";
import { filterByDateRange } from "./domain";

export function useDashboardData(
  eventData: NormalizedEvent[],
  dateRange: DateRange,
) {
  return filterByDateRange(eventData, dateRange);
}
