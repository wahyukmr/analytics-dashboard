import React from "react";
import type { useEngagement } from "../../hooks";
import EngagementStats from "./EngagementStats";
import DAUChart from "./DAUChart";

export default function EngagementSection({
  engagement,
}: {
  engagement: ReturnType<typeof useEngagement>;
}): React.JSX.Element {
  console.log("engagement component rendered");

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <DAUChart data={engagement.dau} />
      </div>

      <EngagementStats stats={engagement.stats} />
    </div>
  );
}
