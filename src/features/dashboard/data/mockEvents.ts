import type { RawEvent } from "../types";

export const mockEvents: RawEvent[] = [
  {
    id: "e1",
    userId: "u1",
    eventType: "signup",
    plan: "free",
    timestamp: "2026-03-01T08:10:00Z",
  },
  {
    id: "e2",
    userId: "u1",
    eventType: "login",
    plan: "free",
    timestamp: "2026-03-01T09:00:00Z",
  },
  {
    id: "e3",
    userId: "u2",
    eventType: "signup",
    plan: "pro",
    timestamp: "2026-03-02T10:15:00Z",
  },
  {
    id: "e4",
    userId: "u2",
    eventType: "feature_used",
    feature: "analytics_view",
    plan: "pro",
    timestamp: "2026-03-02T10:20:00Z",
  },
  {
    id: "e5",
    userId: "u1",
    eventType: "feature_used",
    feature: "export_csv",
    plan: "free",
    timestamp: "2026-03-03T11:00:00Z",
  },
  {
    id: "e6",
    userId: "u3",
    eventType: "signup",
    plan: "free",
    timestamp: "2026-03-03T12:30:00Z",
  },
  {
    id: "e7",
    userId: "u3",
    eventType: "upgrade",
    plan: "pro",
    timestamp: "2026-03-04T09:45:00Z",
  },
  {
    id: "e8",
    userId: "u2",
    eventType: "feature_used",
    feature: "dashboard_share",
    plan: "pro",
    timestamp: "2026-03-04T13:20:00Z",
  },
];
