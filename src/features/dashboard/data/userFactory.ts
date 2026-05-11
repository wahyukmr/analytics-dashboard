import type { GeneratorConfig, User, UserType } from "./types";

export interface UserFactoryInterface {
  generateUsers(config: GeneratorConfig): User[];
}

/**
 * Generate users + assign behavior
 */
export class UserFactory implements UserFactoryInterface {
  generateUsers(config: GeneratorConfig): User[] {
    const users: User[] = [];
    const { totalUsers, behaviorDistribution } = config;

    for (let i = 0; i < totalUsers; i++) {
      const userType = this.pickUserType(behaviorDistribution);
      users.push({
        id: `user_${i + 1}`,
        type: userType,
      });
    }

    return users;
  }

  private pickUserType(
    behaviorDistribution: GeneratorConfig["behaviorDistribution"],
  ): UserType {
    const random = Math.random();

    if (random < behaviorDistribution.dropOff) return "drop_off";
    if (random < behaviorDistribution.dropOff + behaviorDistribution.activated)
      return "activated_only";
    if (
      random <
      behaviorDistribution.dropOff +
        behaviorDistribution.activated +
        behaviorDistribution.engaged
    )
      return "engaged";

    return "power_user";
  }
}
