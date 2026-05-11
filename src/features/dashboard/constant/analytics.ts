import type { FunnelConfig } from "../derived/types";
import type { ActivationConfig, NormalizedEvent } from "../types";

export const funnelConfig: FunnelConfig = {
  steps: [
    { stepType: "signup" },
    { stepType: "login" },
    {
      stepType: "feature_used",
      condition: (e: NormalizedEvent) =>
        e.properties?.feature === "create_project" &&
        e.properties?.success === true,
      label: "create_project",
    },
    { stepType: "upgrade" },
  ],
};

export const activationConfig: ActivationConfig = {
  eventType: "feature_used",
  condition: (e: NormalizedEvent) =>
    e.properties?.feature === "create_project" &&
    e.properties?.success === true,
};

export const featureList = {
  create_project: { authRequired: true },
  export_data: { authRequired: true },
  invite_team: { authRequired: true },
  update_task: { authRequired: true },
  view_homepage: { authRequired: false },
  view_pricing: { authRequired: false },
};

export const DAY_MS = 24 * 60 * 60 * 1000;
