import type { RawEvent } from "../types";
import { Timeline } from "./timeline";
import type { GeneratorConfig, User } from "./types";

export class EventBuilder {
  generateEventForUser(user: User, config: GeneratorConfig): RawEvent[] {
    const events: RawEvent[] = [];
    const { features, days } = config;

    let isAuthenticated = false;
    let sessionCounter = 0;

    // 🔹 SIGNUP
    const signupDate = Timeline.randomDateWithinDays(days);
    events.push({
      eventType: "signup",
      userId: user.id,
      timestamp: Timeline.safeDate(signupDate).toISOString(),
    });

    if (user.type === "drop_off") return events;

    const sessionCount = this.getSessionCount(user.type);
    let lastSessionEnd = signupDate;

    for (let s = 0; s < sessionCount; s++) {
      const sessionId = `session_${user.id}_${sessionCounter++}`;

      // 🔹 SESSION START (tidak overlap)
      const gapMs = this.random(1, 3) * 24 * 60 * 60 * 1000;
      const sessionStart = new Date(lastSessionEnd.getTime() + gapMs);

      const sessionDuration = this.getSessionDuration(user.type) * 60 * 1000;
      const sessionEnd = new Date(sessionStart.getTime() + sessionDuration);

      let sessionAuth = isAuthenticated;
      let failCount = 0;

      let currentTime = sessionStart.getTime() + this.random(10, 30) * 1000;

      // 🔹 OPTIONAL LOGIN (awal session)
      if (!sessionAuth && Math.random() < 0.6) {
        currentTime += this.random(10, 30) * 1000;

        events.push({
          eventType: "login",
          userId: user.id,
          timestamp: Timeline.safeDate(new Date(currentTime)).toISOString(),
          properties: {
            sessionId,
            success: true,
            method: Math.random() > 0.8 ? "sso" : "password",
          },
        });

        sessionAuth = true;
        isAuthenticated = true;
      }

      // 🔹 EVENTS
      const eventCount =
        user.type === "activated_only"
          ? 1
          : user.type === "power_user"
            ? this.random(3, 6)
            : this.random(2, 4);

      for (let j = 0; j < eventCount; j++) {
        currentTime += this.random(10, 90) * 1000;

        if (currentTime > sessionEnd.getTime()) break;

        const feature = this.randomFeature(Object.keys(features));
        const requiresAuth = features[feature].authRequired;

        let success = !requiresAuth
          ? true
          : sessionAuth
            ? Math.random() < 0.85
            : false;

        // 🔥 FAIL → LOGIN (realistic behavior)
        if (!success && requiresAuth) {
          failCount++;

          if (failCount >= 2 && !sessionAuth) {
            events.push({
              eventType: "login",
              userId: user.id,
              timestamp: Timeline.safeDate(new Date(currentTime)).toISOString(),
              properties: {
                sessionId,
                success: true,
                method: "password",
              },
            });

            sessionAuth = true;
            isAuthenticated = true;

            success = true;
          }
        }

        events.push({
          eventType: "feature_used",
          userId: user.id,
          timestamp: Timeline.safeDate(new Date(currentTime)).toISOString(),
          properties: {
            feature,
            requiresAuth,
            success,
            sessionId,
          },
        });
      }

      // 🔹 OPTIONAL LOGOUT
      if (sessionAuth && Math.random() < 0.6) {
        currentTime += this.random(10, 30) * 1000;

        if (currentTime > sessionEnd.getTime())
          currentTime = sessionEnd.getTime();

        events.push({
          eventType: "logout",
          userId: user.id,
          timestamp: Timeline.safeDate(new Date(currentTime)).toISOString(),
          properties: { sessionId },
        });

        sessionAuth = false;
        isAuthenticated = false;
      }

      lastSessionEnd = sessionEnd;
    }

    // 🔹 UPGRADE (REALISTIC TIMING)
    if (user.type === "power_user" && Math.random() < 0.7) {
      const upgradeTime = new Date(
        lastSessionEnd.getTime() + this.random(1, 48) * 60 * 60 * 1000,
      );

      events.push({
        eventType: "upgrade",
        userId: user.id,
        timestamp: Timeline.safeDate(upgradeTime).toISOString(),
        properties: {
          plan: "pro",
        },
      });
    }

    return events;
  }

  // =========================
  // HELPERS
  // =========================
  private getSessionCount(type: User["type"]) {
    switch (type) {
      case "activated_only":
        return 1;
      case "engaged":
        return this.random(2, 4);
      case "power_user":
        return this.random(3, 6);
      default:
        return 0;
    }
  }

  private getSessionDuration(type: User["type"]) {
    if (type === "power_user") return this.random(10, 25);
    if (type === "engaged") return this.random(5, 15);
    return this.random(2, 8);
  }

  private random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private randomFeature(features: string[]) {
    return features[Math.floor(Math.random() * features.length)];
  }
}
