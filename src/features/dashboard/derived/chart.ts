import { DAY_MS } from "../constant/analytics";
import type { EventStore, FilteredContext } from "../types";
import type { ChartPoint } from "./types";

export function computeChartPoints(
  store: EventStore,
  context: FilteredContext,
): ChartPoint[] {
  const contextUsers = context.userIds;
  const result: ChartPoint[] = [];

  for (const [day, indexes] of store.byDay) {
    const users = new Set<string>();

    for (const index of indexes) {
      const event = store.events[index];

      if (contextUsers.has(event.userId)) {
        users.add(event.userId);
      }
    }

    result.push({
      date: new Date(day * DAY_MS).toISOString().slice(0, 10),
      dau: users.size,
    });
  }

  return result;
}
