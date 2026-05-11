import { funnelConfig } from "../constant/analytics";
import { computeFunnel } from "../derived";
import type { useFilteredContext } from "./useFilteredContext";
import type { useProcessedEvents } from "./useProcessedEvents";

export function useFunnel(
  store: ReturnType<typeof useProcessedEvents>,
  context: ReturnType<typeof useFilteredContext>,
) {
  console.time("funnel");

  const result = computeFunnel(store, context, funnelConfig);

  console.timeEnd("funnel");

  return result;
}
