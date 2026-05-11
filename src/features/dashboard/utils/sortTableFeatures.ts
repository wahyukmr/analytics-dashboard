import type { TableRow, SortConfig } from "../types";

export function sortTableFeatures(
  rows: TableRow[],
  sortConfig: SortConfig,
): TableRow[] {
  if (rows.length === 0) return [];
  console.log("sortTable");

  const sorted = [...rows].sort((a, b) => {
    const { key, direction } = sortConfig;

    const compare = a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;
    return direction === "asc" ? compare : -compare;
  });

  return sorted;
}
