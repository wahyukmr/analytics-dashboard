import type { RawEvent } from "../types";
import type { EventBuilder } from "./eventBuilder";
import type { GeneratorConfig } from "./types";
import type { UserFactoryInterface } from "./userFactory";

export class MockEventGenerator {
  private eventBuilder: EventBuilder;
  private userFactory: UserFactoryInterface;
  private config: GeneratorConfig;

  constructor(
    eventBuilder: EventBuilder,
    userFactory: UserFactoryInterface,
    config: GeneratorConfig,
  ) {
    this.eventBuilder = eventBuilder;
    this.userFactory = userFactory;
    this.config = config;
  }

  /**
   * Generate all mock events for configured users.
   */
  generate(): RawEvent[] {
    const users = this.userFactory.generateUsers(this.config);

    const events: RawEvent[] = [];

    for (const user of users) {
      const userEvents = this.eventBuilder.generateEventForUser(
        user,
        this.config,
      );
      events.push(...userEvents);
    }

    // Optionally sort events by timestamp (ascending)
    // events.sort(
    //   (a, b) =>
    //     new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    // );

    return events;
  }
}
