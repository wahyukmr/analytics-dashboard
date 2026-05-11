import { computeRetention } from "../derived";
import type { useFilteredContext } from "./useFilteredContext";
import type { useProcessedEvents } from "./useProcessedEvents";

export function useRetention(
  store: ReturnType<typeof useProcessedEvents>,
  context: ReturnType<typeof useFilteredContext>,
) {
  console.time("retention");

  const result = computeRetention(store, context);

  console.timeEnd("retention");

  return result;
}
