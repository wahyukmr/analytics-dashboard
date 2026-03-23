import type { NormalizedEvent, SortConfig } from "../../dashboardTypes";
import { buildTableRows } from "./buildTableRows";
import { sortTableRows } from "./sortTableRows";

export function useTableData(
  filteredEvents: NormalizedEvent[],
  sortConfig: SortConfig,
) {
  return sortTableRows(buildTableRows(filteredEvents), sortConfig);
}
