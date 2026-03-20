import React from "react";
import ChartSection from "./ChartSection";
import DataTable from "./DataTable";
import MetricCard from "./MetricCard";
import DateRangePicker from "./DateRangePicker";
import type { UseDashboardDataReturn } from "../hooks/useDashboardData";
import type { DateRange, SortConfig, SortKey } from "../types";

interface DashboardViewProps extends UseDashboardDataReturn {
  dateRange: DateRange;
  sortConfig: SortConfig;
  onChangeSort: (key: SortKey) => void;
  onChangeRange: (newRange: DateRange) => void;
}

export default function DashboardView({
  metrics,
  chartPoints,
  tableRows,
  dateRange,
  sortConfig,
  onChangeSort,
  onChangeRange,
}: DashboardViewProps): React.JSX.Element {
  return (
    <div className="dashboard container">
      <h1 className="dashboard-title">Analytics Dashboard</h1>

      <DateRangePicker value={dateRange} onChangeDate={onChangeRange} />

      <section className="metrics">
        <MetricCard label="Daily Active Users" value={metrics?.dau} />
        <MetricCard label="Total Signups" value={metrics?.totalSignups} />
        <MetricCard label="Total Upgrades" value={metrics?.totalUpgrades} />
        <MetricCard
          label="Conversion Rate"
          value={`${metrics?.conversionRate.toFixed(2)}%`}
        />
      </section>

      <section className="chart">
        <ChartSection data={chartPoints} />
      </section>

      <section className="table">
        <DataTable
          rows={tableRows}
          onChangeSort={onChangeSort}
          sortConfig={sortConfig}
        />
      </section>
    </div>
  );
}
