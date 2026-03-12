import React, { useState } from "react";
import type { DateRange } from "../types";
import { useDashboardData } from "../hooks/useDashboardData";

export default function DashboardPage(): React.JSX.Element {
  const [dateRange] = useState<DateRange>({
    startDate: "2026-03-01",
    endDate: "2026-03-07",
  });

  const { metrics, chartPoints } = useDashboardData(dateRange);

  return (
    <div>
      <h1>Dashboard</h1>

      <p>DAU: {metrics.dau}</p>
      <p>Signups: {metrics.totalSignups}</p>
      <p>Upgrades: {metrics.totalUpgrades}</p>
      <p>Conversion Rate: {metrics.conversionRate.toFixed(2)}%</p>

      <pre>{JSON.stringify(chartPoints, null, 2)}</pre>
    </div>
  );
}
