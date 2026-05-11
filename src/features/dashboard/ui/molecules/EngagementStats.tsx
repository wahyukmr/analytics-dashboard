import React from "react";
import type { useEngagement } from "../../hooks";
import Stat from "../atoms/Stat";

export default function EngagementStats({
  stats,
}: {
  stats: ReturnType<typeof useEngagement>["stats"];
}): React.JSX.Element {
  console.log("engagement stats");

  return (
    <div className="p-4 bg-neutral-900 rounded-xl space-y-3">
      <Stat
        label="Avg Events / User"
        value={stats.avgEventsPerUser.toFixed(2)}
      />
      <Stat
        label="Avg Events / Session"
        value={stats.avgEventsPerSession.toFixed(2)}
      />
      <Stat
        label="Sessions / User"
        value={stats.avgSessionPerUser.toFixed(2)}
      />
      <Stat label="Feature Depth" value={stats.featureDepth.toFixed(2)} />
    </div>
  );
}
