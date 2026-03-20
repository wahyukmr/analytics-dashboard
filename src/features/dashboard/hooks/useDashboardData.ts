import { MockEventGenerator } from "../data/mockEventGenerator";
import type { DateRange, SortConfig } from "../types";
import {
  buildChartPoints,
  buildTableRows,
  computeMetrics,
  filterByDate,
  normalizeEvents,
  sortTableRows,
} from "../utils";

interface DashboardData {
  range: DateRange;
  sortConfig: SortConfig;
}

export type UseDashboardDataReturn = ReturnType<typeof useDashboardData>;

export function useDashboardData({ range, sortConfig }: DashboardData) {
  const mockEventGenerator = new MockEventGenerator();
  const mockEvents = mockEventGenerator.generateMockEvents({
    userCount: 100,
    maxDaysBack: 60,
  });
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
