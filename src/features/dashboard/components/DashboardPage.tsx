import React, { useState } from "react";
import type { DateRange, SortConfig, SortKey } from "../types";
import { useDashboardData } from "../hooks/useDashboardData";
import ChartSection from "./ChartSection";
import DataTable from "./DataTable";
import MetricCard from "./MetricCard";

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
    <div className="dashboard container">
      <h1>Analytics Dashboard</h1>

      <section className="metrics">
        <MetricCard label="Daily Active Users" value={metrics.dau} />
        <MetricCard label="Total Signups" value={metrics.totalSignups} />
        <MetricCard label="Total Upgrades" value={metrics.totalUpgrades} />
        <MetricCard
          label="Conversion Rate"
          value={`${metrics.conversionRate.toFixed(2)}%`}
        />
      </section>

      <section className="chart">
        <ChartSection data={chartPoints} />
      </section>

      <section className="table">
        <DataTable
          rows={tableRows}
          onSort={handleSort}
          sortConfig={sortConfig}
        />
      </section>
    </div>
  );
}
