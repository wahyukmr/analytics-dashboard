import React from "react";
import type { TableRow, SortConfig, SortKey } from "../types";

interface DataTableProps {
  rows: TableRow[];
  onSort: (key: SortKey) => void;
  sortConfig: SortConfig;
}

function DataTable({
  rows,
  onSort,
  sortConfig,
}: DataTableProps): React.JSX.Element {
  const renderHeader = (key: SortKey, label: string) => {
    const isActive = sortConfig.key === key;
    const dir = isActive ? sortConfig.direction : undefined;
    const ariaSort = isActive
      ? dir === "asc"
        ? "ascending"
        : "descending"
      : "none";
    const indicator = isActive ? (dir === "asc" ? "▲" : "▼") : "⇵";

    return (
      <th aria-sort={ariaSort} style={{ textAlign: "left", padding: "8px" }}>
        <button
          type="button"
          onClick={() => onSort(key)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            font: "inherit",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: 0,
          }}
          aria-label={`Sort by ${label}`}
        >
          <span>{label}</span>
          <span aria-hidden>{indicator}</span>
        </button>
      </th>
    );
  };

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ padding: "8px" }}>Feature</th>
          {renderHeader("usage", "Usage")}
          <th style={{ padding: "8px" }}>Unique Users</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => (
          <tr key={row.feature}>
            <td style={{ padding: "8px" }}>{row.feature}</td>
            <td style={{ padding: "8px" }}>{row.usage}</td>
            <td style={{ padding: "8px" }}>{row.uniqueUsers}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default React.memo(DataTable);
