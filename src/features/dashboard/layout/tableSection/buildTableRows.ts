import type { NormalizedEvent, TableRow } from "../../dashboardTypes";

export function buildTableRows(events: NormalizedEvent[]): TableRow[] {
  const featureMap = new Map<string, { usage: number; users: Set<string> }>();

  for (const event of events) {
    if (event.eventType !== "feature_used" || !event.feature) continue;

    const { feature } = event;

    if (!featureMap.has(feature)) {
      featureMap.set(feature, { usage: 0, users: new Set() });
    }

    const featureData = featureMap.get(feature)!;
    featureData.usage += 1;
    featureData.users.add(event.userId);
  }

  return Array.from(featureMap.entries()).map(
    ([feature, { usage, users }]) => ({
      feature: feature as TableRow["feature"],
      usage,
      uniqueUsers: users.size,
    }),
  );
}
