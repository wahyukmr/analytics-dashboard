import React, { useState } from "react";
import { fetchMockEvents } from "./dashboardApi";
import type { DateRange } from "./dashboardTypes";
import { useDashboardData } from "./useDashboardData";
import {
  ChartView,
  DateRangePickerView,
  MetricsView,
  TableView,
} from "./layout";

export default function DashboardView(): React.JSX.Element {
  const [eventData] = useState(() => fetchMockEvents());
  const [filter, setFilter] = useState<DateRange>("today");

  const filteredEvents = useDashboardData(eventData, filter);

  console.log("DashboardView");

  return (
    <div className="dashboard container">
      <h1 className="dashboard-title">Analytics Dashboard</h1>

      <DateRangePickerView dateRange={filter} onChangeDateRange={setFilter} />

      <MetricsView filteredEvents={filteredEvents} />

      <ChartView filteredEvents={filteredEvents} />

      <TableView filteredEvents={filteredEvents} />
    </div>
  );
}
