import React from "react";
import MetricCard from "./MetricCard";
import type { useMetrics } from "../../hooks";

export default function MetricsSection({
  metricData,
}: {
  metricData: ReturnType<typeof useMetrics>;
}): React.JSX.Element {
  console.log("metrics component rendered");

  const {
    upgradeRate,
    totalActiveUsers,
    totalSignups,
    totalUpgrades,
    activationRate,
  } = metricData;
  return (
    <section className="grid grid-cols-5 gap-4">
      <MetricCard label="Total Users" value={totalActiveUsers} />
      <MetricCard label="User Signups" value={totalSignups} />
      <MetricCard label="User Upgrades" value={totalUpgrades} />
      <MetricCard label="Upgrade Rate" value={`${upgradeRate.toFixed(1)}%`} />
      <MetricCard
        label="Activation Rate"
        value={`${activationRate.toFixed(1)}%`}
      />
    </section>
  );
}
