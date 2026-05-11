import type { NormalizedEvent } from "../types";

export type DatePresent =
  | "today"
  | "last_7_days"
  | "this_month"
  | "last_month"
  | "3_months_ago"
  | "all";

export type PlanType = "all" | "free" | "pro";

export interface PreparedData {
  events: NormalizedEvent[];
  proUsers: Set<string>;
}

export interface EventFilter {
  dateRange: DatePresent;
  plan: PlanType;
}
