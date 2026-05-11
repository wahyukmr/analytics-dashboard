import type { Retention } from "./types";
import type { EventStore, FilteredContext } from "../types";
import { DAY_MS } from "../constant/analytics";

/**
 * Retention Analysis (user lifecycle): Calculate how many users return to use the product after their initial interaction (e.g., signup) over specific time periods (e.g., day 1, day 7, day 30).
 */
export function computeRetention(
  store: EventStore,
  context: FilteredContext,
  retentionDays: number[] = [1, 7, 30],
): Retention[] {
  const cohorts = new Map<
    number,
    {
      users: number;
      buckets: Map<number, number>;
    }
  >();

  for (const userId of context.userIds) {
    const events = store.byUser.get(userId);

    if (!events || events.length === 0) continue;

    let signupTs: number | null = null;
    let minReturnDay: number | null = null;

    for (const idx of events) {
      const event = store.events[idx];
      // 🔹 find signup
      if (signupTs === null && event.eventType === "signup") {
        signupTs = event.timestamp;
        continue;
      }
      if (signupTs !== null && event.timestamp > signupTs) {
        const diffDays = Math.floor((event.timestamp - signupTs) / DAY_MS);

        if (diffDays > 0) {
          if (minReturnDay === null || diffDays < minReturnDay) {
            minReturnDay = diffDays;
          }
        }
      }
    }

    if (signupTs === null) continue;

    // COHORTING: group users by their signup day (cohort)
    const cohortDay = Math.floor(signupTs / DAY_MS);

    if (!cohorts.has(cohortDay)) {
      cohorts.set(cohortDay, { users: 0, buckets: new Map() });
    }
    const cohort = cohorts.get(cohortDay)!;
    cohort.users++;

    // RETENTION: check if user returns within retention days
    if (minReturnDay !== null) {
      for (const day of retentionDays) {
        if (minReturnDay <= day) {
          cohort.buckets.set(day, (cohort.buckets.get(day) ?? 0) + 1);
        }
      }
    }
  }

  // BUILD RESULT: calculate retention rate for each cohort and return as array
  const result: Retention[] = [];

  for (const [cohortDay, cohort] of cohorts) {
    const retention: Retention["retention"] = {};

    for (const day of retentionDays) {
      retention[`day${day}`] =
        cohort.users > 0
          ? ((cohort.buckets.get(day) ?? 0) / cohort.users) * 100
          : 0;
    }

    result.push({
      cohortDate: new Date(cohortDay * DAY_MS).toISOString().slice(0, 10),
      cohortSize: cohort.users,
      retention,
    });
  }

  return result;
}
