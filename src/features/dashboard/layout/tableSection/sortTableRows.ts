import type { SortConfig, TableRow } from "../../dashboardTypes";

export function sortTableRows(
  rows: TableRow[],
  sortConfig: SortConfig,
): TableRow[] {
  const sorted = [...rows].sort((a, b) => {
    const { key, direction } = sortConfig;

    let compare = 0;
    if (a[key] < b[key]) compare = -1;
    else if (a[key] > b[key]) compare = 1;

    return direction === "asc" ? compare : -compare;
  });

  return sorted;
}
