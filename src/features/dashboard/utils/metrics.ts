import type { Metrics, NormalizedEvent } from "../types";

export function computeMetrics(events: NormalizedEvent[]): Metrics {
  const activeUsers = new Set<string>();
  let totalSignups = 0;
  let totalUpgrades = new Set<string>();

  for (const event of events) {
    if (event.eventType === "login" || event.eventType === "feature_used")
      activeUsers.add(event.userId);

    if (event.eventType === "signup") totalSignups++;
    if (event.eventType === "upgrade") totalUpgrades.add(event.userId);
  }

  const dau = activeUsers.size; // Daily Active Users
  const conversionRate =
    totalSignups > 0 ? (totalUpgrades.size / totalSignups) * 100 : 0; // Conversion Rate

  return {
    dau,
    totalSignups,
    totalUpgrades: totalUpgrades.size,
    conversionRate,
  };
}
