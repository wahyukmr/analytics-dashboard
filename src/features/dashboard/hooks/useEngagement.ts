import { computeChartPoints, computeEngagement } from "../derived";
import type { useFilteredContext } from "./useFilteredContext";
import type { useProcessedEvents } from "./useProcessedEvents";

interface EngagementReturn {
  dau: ReturnType<typeof computeChartPoints>;
  stats: Omit<ReturnType<typeof computeEngagement>, "dau">;
}

export function useEngagement(
  store: ReturnType<typeof useProcessedEvents>,
  context: ReturnType<typeof useFilteredContext>,
): EngagementReturn {
  console.time("engagement chart points");
  const dau = computeChartPoints(store, context);
  console.timeEnd("engagement chart points");

  console.time("engagement stats");
  const stats = computeEngagement(store, context);
  console.timeEnd("engagement stats");

  return {
    dau,
    stats,
  };
}
