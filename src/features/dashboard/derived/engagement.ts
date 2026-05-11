import type { EventStore, FilteredContext } from "../types";
import type { Engagement } from "./types";

export function computeEngagement(
  store: EventStore,
  context: FilteredContext,
): Engagement {
  const totalUsers = context.userIds.size;
  const totalEvents = context.eventIndexes.length;
  const uniqueSessions = new Set<string>();
  const uniqueUserSessions = new Set<string>();
  const uniqueUserFeatures = new Set<string>();

  for (const index of context.eventIndexes) {
    const event = store.events[index];

    const userId = event.userId;

    const sessionId = event.properties?.sessionId;
    if (sessionId) {
      uniqueSessions.add(sessionId);
      uniqueUserSessions.add(`${userId}-${sessionId}`);
    }

    const feature = event.properties?.feature;
    if (feature && event.properties?.success) {
      uniqueUserFeatures.add(`${userId}-${feature}`);
    }
  }

  return {
    avgEventsPerUser: totalUsers > 0 ? totalEvents / totalUsers : 0,
    avgEventsPerSession:
      uniqueSessions.size > 0 ? totalEvents / uniqueSessions.size : 0,
    avgSessionPerUser:
      totalUsers > 0 ? uniqueUserSessions.size / totalUsers : 0,
    featureDepth: totalUsers > 0 ? uniqueUserFeatures.size / totalUsers : 0,
  };
}
