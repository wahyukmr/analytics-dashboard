import { featureList } from "../constant/analytics";
import { EventBuilder } from "./eventBuilder";
import { MockEventGenerator } from "./generator";
import { UserFactory } from "./userFactory";

export const mockEventFetcher = () => {
  const rawEvents = new MockEventGenerator(
    new EventBuilder(),
    new UserFactory(),
    {
      totalUsers: 100000,
      days: 30,
      features: featureList,
      behaviorDistribution: {
        dropOff: 0.4,
        activated: 0.3,
        engaged: 0.2,
        power: 0.1,
      },
    },
  );
  return rawEvents.generate();
};
