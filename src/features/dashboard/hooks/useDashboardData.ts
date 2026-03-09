import { mockEvents } from "../data/mockEvents";
import type { DateRange } from "../types";
import { filterByDate } from "../utils/filter";
import { computeMetrics } from "../utils/metrics";
import { normalizeEvents } from "../utils/normalize";

export function useDashboardData(range: DateRange) {
  const normalized = normalizeEvents(mockEvents);

  const filtered = filterByDate(normalized, range);

  const metrics = computeMetrics(filtered);

  return {
    metrics,
  };
}
