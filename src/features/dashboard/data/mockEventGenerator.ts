import type { RawEvent } from "../dashboardTypes";
import { clampToNow } from "./utils/date";
import { BehaviorService } from "./domain/behavior";
import { PersonaService } from "./domain/persona";
import { SeededRandom } from "./random/seededRandom";

/**
 * CONFIGURATION (production-style)
 */
const FEATURES = ["export_csv", "analytics_view", "dashboard_share"] as const;

interface GeneratorOptions {
  userCount: number;
  maxDaysBack?: number;
  seed?: number; // optional for deterministic
}

/**
 ** Making realistic mock events based on user personas and behavior patterns
 * Flow: User -> Specific user type (persona) -> Make signup event -> Generate login events based on persona -> Probably add feature usage and upgrades based on persona
 */
export class MockEventGenerator {
  private random: SeededRandom;
  private personaService: PersonaService;
  private behaviorService: BehaviorService;

  constructor(options?: { seed?: number }) {
    this.random = new SeededRandom(options?.seed);
    this.personaService = new PersonaService();
    this.behaviorService = new BehaviorService();
  }

  generateMockEvents({
    userCount,
    maxDaysBack = 30,
  }: GeneratorOptions): RawEvent[] {
    const now = new Date();
    const events: RawEvent[] = [];

    for (let i = 1; i < userCount; i++) {
      const userId = `u${i}`;

      const persona = this.personaService.pickPersona(
        this.random.next.bind(this.random),
      );

      const signupDate = this.generateSignupDate(now, maxDaysBack);

      // Signup event
      events.push(this.createEvent("signup", userId, signupDate, "free", i));

      // Login events based on behavior
      const loginDays = this.behaviorService.getLoginDays(
        persona,
        this.random.next.bind(this.random),
      );

      for (const dayOffset of loginDays) {
        const date = new Date(signupDate);
        date.setDate(date.getDate() + dayOffset);

        const safeDate = clampToNow(date, now);

        if (safeDate <= now) {
          events.push(
            this.createEvent(
              "login",
              userId,
              safeDate,
              "free",
              `${i}-${dayOffset}`,
            ),
          );
        }
      }

      // Feature usage based on persona
      const featureChance = this.behaviorService.getFeatureChances(persona);

      if (this.random.next() < featureChance) {
        const feature = this.random.choice([...FEATURES]);

        events.push({
          id: `feature-${i}`,
          userId,
          eventType: "feature_used",
          feature,
          plan: "free",
          timestamp: signupDate.toISOString(),
        });
      }

      // Upgrade based on persona
      const upgradeChance = this.behaviorService.getUpgradeChance(persona);

      if (this.random.next() < upgradeChance) {
        const upgradeDate = new Date(signupDate);
        upgradeDate.setDate(upgradeDate.getDate() + 3);

        const safeUpgradeDate = clampToNow(upgradeDate, now);

        if (safeUpgradeDate <= now) {
          events.push(
            this.createEvent(
              "upgrade",
              userId,
              safeUpgradeDate,
              "pro",
              `${i}-upgrade`,
            ),
          );
        }
      }
    }

    return events;
  }

  private generateSignupDate(now: Date, maxDaysBack: number): Date {
    const daysAgo = this.random.int(maxDaysBack);

    const date = new Date(now);
    date.setDate(now.getDate() - daysAgo);
    date.setHours(this.random.int(24), this.random.int(60), 0, 0);

    return date;
  }

  private createEvent(
    type: RawEvent["eventType"],
    userId: string,
    date: Date,
    plan: RawEvent["plan"],
    suffix: string | number,
  ): RawEvent {
    return {
      id: `${type}-${suffix}`,
      userId,
      eventType: type,
      plan,
      timestamp: date.toISOString(),
    };
  }
}
