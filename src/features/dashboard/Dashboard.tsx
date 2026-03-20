import React, { useState } from "react";
import type { DateRange, SortConfig, SortKey } from "./types";
import { useDashboardData } from "./hooks/useDashboardData";
import DashboardView from "./components/DashboardView";

export default function Dashboard(): React.JSX.Element {
  const [dateRange, setDateRange] = useState<DateRange>("today");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "usage",
    direction: "asc",
  });

  const dashboardData = useDashboardData({ range: dateRange, sortConfig });

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

  const handleChangeRange = (newRange: DateRange) => {
    setDateRange((prevRange) =>
      prevRange === newRange ? prevRange : newRange,
    );
  };

  return (
    <DashboardView
      {...dashboardData}
      dateRange={dateRange}
      sortConfig={sortConfig}
      onChangeSort={handleChangeSort}
      onChangeRange={handleChangeRange}
    />
  );
}
