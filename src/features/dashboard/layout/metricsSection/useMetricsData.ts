import type { NormalizedEvent } from "../../dashboardTypes";
import { computeMetrics } from "./computeMetrics";

export function useMetricsData(filteredEvents: NormalizedEvent[]) {
  return computeMetrics(filteredEvents);
}
