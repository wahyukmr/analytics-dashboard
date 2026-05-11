import { useMemo, useRef } from "react";
import { filterContext } from "../processing";
import type { EventFilter } from "../processing/types";
import type { EventStore, FilteredContext } from "../types";

export function useFilteredContext(store: EventStore, filter: EventFilter) {
  const cacheRef = useRef(new Map<string, FilteredContext>());
  const prevVersionRef = useRef<number | null>(null);

  return useMemo(() => {
    // Clear cache when the store was rebuilt to avoid stale entries.
    if (prevVersionRef.current !== store.version) {
      cacheRef.current.clear();
      prevVersionRef.current = store.version;
    }
    console.time("filtered events");

    const result = filterContext(store, filter, cacheRef.current);

    console.timeEnd("filtered events");

    console.log(result);

    return result;
  }, [store.version, filter]);
}
