import { DAY_MS } from "../constant/analytics";

export function toDayBucket(timestamp: number): number {
  return Math.floor(timestamp / DAY_MS);
}
