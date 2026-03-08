type EventType = "signup" | "login" | "feature_used" | "upgrade";
type FeaturesType = "export_csv" | "analytics_view" | "dashboard_share";
type PlanType = "free" | "pro";

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
export type DateRange = {
  startDate: string; // YYYY-MM-DD format
  endDate: string;
};

export type SortKey = "feature" | "usage" | "conversion";
type SortDirection = "asc" | "desc";

export interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

export type Metrics = {
  dau: number; // Daily Active Users
  mau: number; // Monthly Active Users
  featureUsage: Record<FeaturesType, number>; // Usage count for each feature
  totalSignups: number; // Total number of signups
  totalUpgrades: number; // Total number of upgrades to Pro
  conversionRate: number; // Percentage of users who upgraded to Pro
};

export type ChartPoint = {
  date: string; // YYYY-MM-DD format
  dau: number; // Daily Active Users for that date
  mau: number; // Monthly Active Users for that date
};
