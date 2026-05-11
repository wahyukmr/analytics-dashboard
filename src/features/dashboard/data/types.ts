/**
 * User types based on their engagement and behavior patterns:
 * - drop_off: signup → (stop).
 * - activated_only: signup → feature_used (1x) → stop.
 * - engaged: signup → feature_used (multiple) → return sessions.
 * - power_user: signup → feature_used (many) → repeated sessions → upgrade.
 */
export type UserType = "drop_off" | "activated_only" | "engaged" | "power_user";

type BehaviorDistribution = {
  dropOff: number;
  activated: number;
  engaged: number;
  power: number;
};

export interface User {
  id: string;
  type: UserType;
}

export interface GeneratorConfig {
  totalUsers: number;
  days: number;
  features: {
    [featureName: string]: {
      [key: string]: any;
    };
  };
  behaviorDistribution: BehaviorDistribution;
}
