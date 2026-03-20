import type { RawEvent } from "../types";
import { clampToNow } from "../utils";
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

// /**
//  * Simple seeded random (deterministic)
//  */
// function createRandom(seed = Date.now()) {
//   let value = seed;
//   return () => {
//     value = (value * 16807) % 2147483647;
//     return (value - 1) / 2147483646;
//   };
// }

// /**
//  * Clamp date to not exceed now
//  */
// function clampToNow(date: Date, now: Date) {
//   return date > now ? new Date(now) : date;
// }

// /**
//  * Pick persona based on weighted probability
//  */
// function pickPersona(rand: () => number): UserPersona {
//   const r = rand();

//   if (r < 0.5) return "casual";   // 50%
//   if (r < 0.85) return "active";  // 35%
//   return "power";                 // 15%
// }

// /**
//  * Generate realistic login pattern
//  */
// function generateLoginDays(
//   persona: UserPersona,
//   rand: () => number
// ): number[] {
//   switch (persona) {
//     case "casual":
//       return [0, 2, 5].filter(() => rand() > 0.5);

//     case "active":
//       return Array.from({ length: 7 }, (_, i) => i).filter(() => rand() > 0.2);

//     case "power":
//       return Array.from({ length: 14 }, (_, i) => i); // almost daily
//   }
// }

// /**
//  ** MAIN GENERATOR: Making realistic mock events based on user personas and behavior patterns
//  * Flow: User -> Specific user type (persona) -> Make signup event -> Generate login events based on persona -> Probably add feature usage and upgrades based on persona
//  */
// export function generateMockEvents({
//   userCount,
//   maxDaysBack = 30,
//   seed,
// }: GeneratorOptions): RawEvent[] {
//   const randomStable = createRandom(seed);
//   const now = new Date();

//   const events: RawEvent[] = [];

//   for (let i = 1; i <= userCount; i++) {
//     const userId = `u${i}`;
//     const persona = pickPersona(randomStable);

//     /**
//      * Signup date (always in past)
//      */
//     const daysAgo = Math.floor(randomStable() * maxDaysBack);

//     const signupDate = new Date(now);
//     signupDate.setDate(now.getDate() - daysAgo);
//     signupDate.setHours(
//       Math.floor(randomStable() * 24),
//       Math.floor(randomStable() * 60),
//       0,
//       0
//     );

//     events.push({
//       id: `signup-${i}`,
//       userId,
//       eventType: "signup",
//       plan: "free",
//       timestamp: signupDate.toISOString(),
//     });

//     /**
//      * LOGIN EVENTS (behavior-based)
//      */
//     const loginDays = generateLoginDays(persona, randomStable);

//     for (const dayOffset of loginDays) {
//       const date = new Date(signupDate);
//       date.setDate(date.getDate() + dayOffset);

//       const safeDate = clampToNow(date, now);

//       if (safeDate <= now) {
//         events.push({
//           id: `login-${i}-${dayOffset}`,
//           userId,
//           eventType: "login",
//           plan: "free",
//           timestamp: safeDate.toISOString(),
//         });
//       }
//     }

//     /**
//      * FEATURE USAGE (depends on persona)
//      */
//     const featureChance = {
//       casual: 0.3,
//       active: 0.6,
//       power: 0.9,
//     }[persona];

//     if (randomStable() < featureChance) {
//       const feature =
//         FEATURES[Math.floor(randomStable() * FEATURES.length)];

//       events.push({
//         id: `feature-${i}`,
//         userId,
//         eventType: "feature_used",
//         feature,
//         plan: "free",
//         timestamp: signupDate.toISOString(),
//       });
//     }

//     /**
//      * UPGRADE (only realistic for active/power)
//      */
//     const upgradeChance = {
//       casual: 0.05,
//       active: 0.2,
//       power: 0.6,
//     }[persona];

//     if (randomStable() < upgradeChance) {
//       const upgradeDate = new Date(signupDate);
//       upgradeDate.setDate(upgradeDate.getDate() + 3);

//       const safeUpgradeDate = clampToNow(upgradeDate, now);

//       if (safeUpgradeDate <= now) {
//         events.push({
//           id: `upgrade-${i}`,
//           userId,
//           eventType: "upgrade",
//           plan: "pro",
//           timestamp: safeUpgradeDate.toISOString(),
//         });
//       }
//     }
//   }

//   return events;
// }
