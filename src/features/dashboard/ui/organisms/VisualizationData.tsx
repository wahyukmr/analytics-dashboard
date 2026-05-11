import React, { useState } from "react";
import type { EventStore } from "../../types";
import DateRangePickerSection from "../molecules/DateRangePickerSection";
import MetricsSection from "../molecules/MetricsSection";
import {
  useEngagement,
  useFeatureUsage,
  useFilteredContext,
  useFunnel,
  useMetrics,
  useRetention,
} from "../../hooks";
import { FunnelSection } from "../molecules/FunnelSection";
import EngagementSection from "../molecules/EngagementSection";
import FeatureTable from "../molecules/FeatureTable";
import { RetentionSection } from "../molecules/RetentionSection";
import type { EventFilter } from "../../processing/types";

export default function VisualizationData({
  eventStore,
  workspaceTimezone,
}: {
  eventStore: EventStore;
  workspaceTimezone: string;
}): React.JSX.Element {
  console.log("visual data component rendered");
  const [filter, setFilter] = useState<EventFilter>({
    dateRange: "all",
    plan: "all",
  });
  // imnplement timezone
  const context = useFilteredContext(eventStore, filter);
  const metrics = useMetrics(eventStore, context);
  const funnel = useFunnel(eventStore, context);
  const engagement = useEngagement(eventStore, context);
  const featureUsage = useFeatureUsage(eventStore, context);
  const retention = useRetention(eventStore, context);

  return (
    <>
      <DateRangePickerSection
        filter={filter}
        onChange={(patch) => setFilter((prev) => ({ ...prev, ...patch }))}
      />
      <MetricsSection metricData={metrics} />
      <EngagementSection engagement={engagement} />
      <FunnelSection funnelData={funnel} />
      <FeatureTable data={featureUsage} />
      <RetentionSection data={retention} />
    </>
  );
}
