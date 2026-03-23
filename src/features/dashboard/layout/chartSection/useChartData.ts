import type { NormalizedEvent } from "../../dashboardTypes";
import { buildChartPoints } from "./buildChartPoint";

export function useChartData(filteredEvents: NormalizedEvent[]) {
  return buildChartPoints(filteredEvents);
}
