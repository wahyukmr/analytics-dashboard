import { useMemo } from "react";
import { prepareEvents, buildStoreFromPrepared } from "../processing";
import type { RawEvent } from "../types";

export function useProcessedEvents(rawEvents: RawEvent[]) {
  return useMemo(() => {
    const preparedEvents = prepareEvents(rawEvents);

    console.time("build store");

    const result = buildStoreFromPrepared(preparedEvents);

    console.timeEnd("build store");

    return result;
  }, [rawEvents]);
}
