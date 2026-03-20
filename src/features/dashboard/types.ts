type EventType = "signup" | "login" | "feature_used" | "upgrade";
type FeaturesType = "export_csv" | "analytics_view" | "dashboard_share";
type PlanType = "free" | "pro";

// Define user personas based on their behavior and engagement (casual = infrequent users, active = regular users, power = heavy user + upgrade)
export type UserPersona = "casual" | "active" | "power";

// Define the structure of the raw event data as received from the API
export interface RawEvent {
  id: string;
  userId: string;
  eventType: EventType;
  feature?: FeaturesType;
  plan: PlanType;
  timestamp: string; // ISO string
}

// Define the structure of the normalized event data used within the application
export interface NormalizedEvent {
  id: string;
  userId: string;
  eventType: EventType;
  feature?: FeaturesType;
  plan: PlanType;
  timestamp: Date; // JavaScript Date object
  date: string; // YYYY-MM-DD format for grouping
}

// Define the structure of the API response for fetching events
export type DateRange =
  | "today"
  | "last_7_days"
  | "this_month"
  | "last_month"
  | "3_months_ago";

export type SortKey = "feature" | "usage" | "uniqueUsers";
type SortDirection = "asc" | "desc";

export interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

export interface Metrics {
  dau: number; // Daily Active Users
  totalSignups: number; // Total number of signups
  totalUpgrades: number; // Total number of upgrades to Pro
  conversionRate: number; // Percentage of users who upgraded to Pro
}

export interface ChartPoint {
  date: string; // YYYY-MM-DD format
  dau: number; // Daily Active Users for that date
}

export interface TableRow {
  feature: FeaturesType;
  usage: number;
  uniqueUsers: number;
}
