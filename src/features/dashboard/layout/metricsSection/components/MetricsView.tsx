import React from "react";
import { useMetricsData } from "../useMetricsData";
import type { NormalizedEvent } from "../../../dashboardTypes";
import MetricCard from "./MetricCard";

export default function MetricsView({
  filteredEvents,
}: {
  filteredEvents: NormalizedEvent[];
}): React.JSX.Element {
  const { conversionRate, dau, totalSignups, totalUpgrades } =
    useMetricsData(filteredEvents);

  console.log("MetricView");

  return (
    <section className="metrics">
      <MetricCard label="Daily Active Users" value={dau} />
      <MetricCard label="Total Signups" value={totalSignups} />
      <MetricCard label="Total Upgrades" value={totalUpgrades} />
      <MetricCard
        label="Conversion Rate"
        value={`${conversionRate.toFixed(2)}%`}
      />
    </section>
  );
}
