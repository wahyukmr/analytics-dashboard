import React, { useState } from "react";
import type { DateRange, SortConfig, SortKey } from "../types";
import { useDashboardData } from "../hooks/useDashboardData";
import ChartSection from "./ChartSection";
import DataTable from "./DataTable";

export default function DashboardPage(): React.JSX.Element {
  const [dateRange] = useState<DateRange>({
    startDate: "2026-03-01",
    endDate: "2026-03-07",
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "usage",
    direction: "asc",
  });

  const { metrics, chartPoints, tableRows } = useDashboardData(
    dateRange,
    sortConfig,
  );

  const handleSort = (key: SortKey) => {
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

  return (
    <div>
      <h1>Dashboard</h1>

      <p>DAU: {metrics.dau}</p>
      <p>Signups: {metrics.totalSignups}</p>
      <p>Upgrades: {metrics.totalUpgrades}</p>
      <p>Conversion Rate: {metrics.conversionRate.toFixed(2)}%</p>

      <ChartSection data={chartPoints} />

      <DataTable rows={tableRows} onSort={handleSort} sortConfig={sortConfig} />
    </div>
  );
}
