import React, { useState } from "react";
import type {
  NormalizedEvent,
  SortConfig,
  SortKey,
} from "../../dashboardTypes";
import { useTableData } from "./useTableData";

export default function TableView({
  filteredEvents,
}: {
  filteredEvents: NormalizedEvent[];
}): React.JSX.Element {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "usage",
    direction: "asc",
  });

  const sortedRows = useTableData(filteredEvents, sortConfig);

  const handleChangeSort = (key: SortKey) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  console.log("DataTable");

  const renderHeader = (key: SortKey, label: string) => {
    const isActive = sortConfig?.key === key;
    const dir = isActive ? sortConfig?.direction : undefined;
    const ariaSort = isActive
      ? dir === "asc"
        ? "ascending"
        : "descending"
      : "none";
    const indicator = isActive ? (dir === "asc" ? "▲" : "▼") : "⇵";

    return (
      <th
        aria-sort={ariaSort}
        style={{
          padding: "8px",
          borderRight: "1px solid gray",
        }}
      >
        <button
          type="button"
          onClick={() => handleChangeSort(key)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            font: "inherit",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            margin: "0 auto",
            padding: "0",
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
    <section className="table">
      <table
        style={{
          width: "100%",
          backgroundColor: "#1A1A1A",
          borderRadius: "16px",
          borderSpacing: "5px",
        }}
      >
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th
              style={{
                padding: "8px",
                borderRight: "1px solid gray",
              }}
            >
              Feature
            </th>
            {renderHeader("usage", "Usage")}
            <th style={{ padding: "8px" }}>Unique Users</th>
          </tr>
        </thead>

        <tbody>
          {sortedRows?.map((row) => (
            <tr key={row.feature}>
              <td style={{ padding: "8px" }}>{row.feature}</td>
              <td style={{ padding: "8px" }}>{row.usage}</td>
              <td style={{ padding: "8px" }}>{row.uniqueUsers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
