import type { FeatureUsage } from "./types";
import type { EventStore, FilteredContext } from "../types";
/**
 * Feature Usage Analysis: Calculate how many users interacted with each feature and the total usage count for each feature. This helps identify which features are most popular and how many users are engaging with them.
 */
export function computeFeatureUsage(
  store: EventStore,
  context: FilteredContext,
): FeatureUsage[] {
  const result: FeatureUsage[] = [];
  const totalUsers = context.userIds.size;
  const contextUsers = context.userIds;

  for (const [feature, events] of store.byFeature) {
    let usage = 0;
    const users = new Set<string>();

    for (const idx of events) {
      const event = store.events[idx];
      if (!contextUsers.has(event.userId)) continue;

      usage++;
      users.add(event.userId);
    }

    const uniqueUsers = users.size;

    result.push({
      feature,
      usage,
      uniqueUsers: users.size,
      usagePerUser: uniqueUsers > 0 ? usage / uniqueUsers : 0,
      adoptionRate: totalUsers > 0 ? uniqueUsers / totalUsers : 0,
    });
  }
  return result;
}
