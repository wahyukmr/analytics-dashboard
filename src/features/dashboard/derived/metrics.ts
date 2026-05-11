import type { ActivationConfig, EventStore, FilteredContext } from "../types";
import type { Metrics } from "./types";

export function computeMetrics(
  store: EventStore,
  context: FilteredContext,
  config: ActivationConfig,
): Metrics {
  const signupUsers = new Set<string>();
  const upgradeUsers = new Set<string>();
  const activatedUsers = new Set<string>();

  for (const index of context.eventIndexes) {
    const event = store.events[index];

    if (event.eventType === "signup") {
      signupUsers.add(event.userId);
    }

    if (event.eventType === "upgrade") {
      upgradeUsers.add(event.userId);
    }

    const matchType = event.eventType === config.eventType;

    const matchCondition = config.condition?.(event) ?? true;

    if (matchType && matchCondition) {
      activatedUsers.add(event.userId);
    }
  }

  const totalSignups = signupUsers.size;

  return {
    totalActiveUsers: context.userIds.size,
    totalSignups,
    totalUpgrades: upgradeUsers.size,
    upgradeRate:
      totalSignups > 0 ? (upgradeUsers.size / totalSignups) * 100 : 0,
    activationRate:
      totalSignups > 0 ? (activatedUsers.size / totalSignups) * 100 : 0,
  };
}
