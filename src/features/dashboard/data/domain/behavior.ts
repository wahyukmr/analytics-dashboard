import type { UserPersona } from "../../types";

export class BehaviorService {
  getLoginDays(persona: UserPersona, random: () => number): number[] {
    switch (persona) {
      case "casual":
        return [0, 2, 5].filter(() => random() > 0.5);

      case "active":
        return Array.from({ length: 7 }, (_, i) => i).filter(
          () => random() > 0.2,
        );

      case "power":
        return Array.from({ length: 14 }, (_, i) => i); // almost daily

      default:
        return [];
    }
  }

  getFeatureChances(persona: UserPersona): number {
    return {
      casual: 0.3,
      active: 0.6,
      power: 0.9,
    }[persona];
  }

  getUpgradeChance(persona: UserPersona): number {
    return {
      casual: 0.05,
      active: 0.2,
      power: 0.6,
    }[persona];
  }
}
