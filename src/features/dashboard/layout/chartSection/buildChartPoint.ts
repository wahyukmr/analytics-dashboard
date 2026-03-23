import type { ChartPoint, NormalizedEvent } from "../../dashboardTypes";

export function buildChartPoints(events: NormalizedEvent[]): ChartPoint[] {
  const dailyUsers = new Map<string, Set<string>>(); // date -> set of userIds

  for (const event of events) {
    if (!dailyUsers.has(event.date)) {
      dailyUsers.set(event.date, new Set());
    }
    dailyUsers.get(event.date)!.add(event.userId);
  }

  return Array.from(dailyUsers.entries())
    .map(([date, users]) => ({
      date,
      dau: users.size,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
