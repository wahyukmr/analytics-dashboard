import type { RawEvent } from "../types";

const FEATURES = ["export_csv", "analytics_view", "dashboard_share"] as const;

export function generateMockEvents(userCount: number): RawEvent[] {
  const events: RawEvent[] = [];

  for (let i = 1; i <= userCount; i++) {
    const userId = `u${i}`;

    const signupDate = new Date(2026, 2, Math.floor(Math.random() * 20) + 1);

    // signup
    events.push({
      id: `signup-${i}`,
      userId,
      eventType: "signup",
      plan: "free",
      timestamp: signupDate.toISOString(),
    });

    // login events
    const loginCount = Math.floor(Math.random() * 5) + 1;

    for (let j = 0; j < loginCount; j++) {
      const date = new Date(signupDate);
      date.setDate(date.getDate() + j);

      events.push({
        id: `login-${i}-${j}`,
        userId,
        eventType: "login",
        plan: "free",
        timestamp: date.toISOString(),
      });
    }

    // feature usage
    if (Math.random() > 0.3) {
      const feature = FEATURES[Math.floor(Math.random() * FEATURES.length)];

      events.push({
        id: `feature-${i}`,
        userId,
        eventType: "feature_used",
        feature,
        plan: "free",
        timestamp: signupDate.toISOString(),
      });
    }

    // upgrade chance
    if (Math.random() > 0.7) {
      const upgradeDate = new Date(signupDate);
      upgradeDate.setDate(upgradeDate.getDate() + 3);

      events.push({
        id: `upgrade-${i}`,
        userId,
        eventType: "upgrade",
        plan: "pro",
        timestamp: upgradeDate.toISOString(),
      });
    }
  }

  return events;
}
