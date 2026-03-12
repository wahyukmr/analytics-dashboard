import { mockEvents } from "../data/mockEvents";
import type { DateRange, SortConfig } from "../types";
import {
  buildChartPoints,
  buildTableRows,
  computeMetrics,
  filterByDate,
  normalizeEvents,
  sortTableRows,
} from "../utils";

export function useDashboardData(range: DateRange, sortConfig: SortConfig) {
  const normalized = normalizeEvents(mockEvents);

  const filtered = filterByDate(normalized, range);

  const metrics = computeMetrics(filtered);

  const chartPoints = buildChartPoints(filtered);

  const tableRows = buildTableRows(filtered);

  const sortedRows = sortTableRows(tableRows, sortConfig);

  return {
    metrics,
    chartPoints,
    tableRows: sortedRows,
  };
}
