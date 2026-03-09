import type { Metrics, NormalizedEvent } from "../types";

export function computeMetrics(events: NormalizedEvent[]): Metrics {
  const uniqueUsers = new Set<string>();
  let totalSignups = 0;
  let totalUpgrades = 0;

  for (const event of events) {
    uniqueUsers.add(event.userId);

    if (event.eventType === "signup") totalSignups++;
    if (event.eventType === "upgrade") totalUpgrades++;
  }

  const dau = uniqueUsers.size; // Daily Active Users
  const conversionRate =
    totalSignups > 0 ? (totalUpgrades / totalSignups) * 100 : 0; // Conversion Rate

  return {
    dau,
    totalSignups,
    totalUpgrades,
    conversionRate,
  };
}
