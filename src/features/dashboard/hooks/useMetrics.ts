import { activationConfig } from "../constant/analytics";
import { computeMetrics } from "../derived";
import type { useFilteredContext } from "./useFilteredContext";
import type { useProcessedEvents } from "./useProcessedEvents";

export function useMetrics(
  store: ReturnType<typeof useProcessedEvents>,
  context: ReturnType<typeof useFilteredContext>,
) {
  console.time("metrics");

  const result = computeMetrics(store, context, activationConfig);

  console.timeEnd("metrics");

  return result;
}
