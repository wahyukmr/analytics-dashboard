import { computeFeatureUsage } from "../derived";
import type { useFilteredContext } from "./useFilteredContext";
import type { useProcessedEvents } from "./useProcessedEvents";

export function useFeatureUsage(
  store: ReturnType<typeof useProcessedEvents>,
  context: ReturnType<typeof useFilteredContext>,
) {
  console.time("feature usage");

  const result = computeFeatureUsage(store, context);

  console.timeEnd("feature usage");

  return result;
}
