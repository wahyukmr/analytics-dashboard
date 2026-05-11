export type EventType =
  | "signup"
  | "login"
  | "logout"
  | "feature_used"
  | "upgrade";

export interface RawEvent {
  eventType: EventType;
  userId: string;
  timestamp: string;
  properties?: Record<string, any>;
}

export interface NormalizedEvent {
  eventType: EventType;
  userId: string;
  timestamp: number;
  properties?: Record<string, any>;
}

export interface EventStore {
  events: NormalizedEvent[];

  byUser: Map<string, number[]>;
  bySession: Map<string, number[]>;
  byFeature: Map<string, number[]>;

  byDay: Map<number, number[]>;

  proUsers: Set<string>;
  uniqueUsers: Set<string>;

  version: number;
}

export interface FilteredContext {
  eventIndexes: number[];
  userIds: Set<string>;
}

export interface ActivationConfig {
  eventType: EventType;
  condition?: (event: NormalizedEvent) => boolean;
}
