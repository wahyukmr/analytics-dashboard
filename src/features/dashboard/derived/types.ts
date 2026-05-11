import type { EventType, NormalizedEvent } from "../types";

export interface Metrics {
  totalActiveUsers: number;
  totalSignups: number;
  totalUpgrades: number;
  upgradeRate: number;
  activationRate: number;
}

export interface FunnelConfig {
  steps: {
    stepType: EventType;
    condition?: (event: NormalizedEvent) => boolean;
    label?: string;
  }[];
}

export interface FunnelStepResult {
  step: string;
  usersAtStep: number;
  conversionRateFromPrevious: number;
  dropOffFromPrevious: number;
}

export interface FunnelResult {
  steps: FunnelStepResult[];
  dropOffDetails: {
    step: string;
    users: string[];
  }[];
}

export interface Engagement {
  avgEventsPerUser: number;
  avgEventsPerSession: number;
  avgSessionPerUser: number;
  featureDepth: number; // unique features per user
}

export interface FeatureUsage {
  feature: string;
  usage: number;
  uniqueUsers: number;
  usagePerUser: number; // average usage per user for this feature
  adoptionRate: number; // percentage of total users who used this feature
}

export interface Retention {
  cohortDate: string;
  cohortSize: number;
  retention: Record<string, number>;
}

export interface ChartPoint {
  date: string; // YYYY-MM-DD format
  dau: number; // Daily Active Users for that date
}

export interface TableRow {
  feature: string;
  usage: number;
  uniqueUsers: number;
}

export type SortKey = "feature" | "usage" | "uniqueUsers";
type SortDirection = "asc" | "desc";

export interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}
