import type { FunnelConfig, FunnelResult, FunnelStepResult } from "./types";
import type { EventStore, FilteredContext } from "../types";
/**
 * Funnel Analysis: Determine how many users successfully completed each specific step.
 * * Note: This funnel is strict matching, meaning users must complete steps in the defined order without skipping. For example, if the funnel steps are [signup → onboarding → purchase], a user who completes signup and purchase but skips onboarding would not be counted as completing the funnel.
 */
export function computeFunnel(
  store: EventStore,
  context: FilteredContext,
  config: FunnelConfig,
): FunnelResult {
  const totalSteps = config.steps.length;
  const stepUsers: Set<string>[] = Array.from(
    { length: totalSteps },
    () => new Set(),
  );
  const dropOffMap = new Map<number, Set<string>>();

  for (const userId of context.userIds) {
    const events = store.byUser.get(userId);

    if (!events || events.length === 0) continue;

    let stepIndex = 0;

    // 🔥 STRICT MATCHING
    for (const idx of events) {
      const event = store.events[idx];
      if (stepIndex >= totalSteps) break;

      const step = config.steps[stepIndex];
      const matchType = event.eventType === step.stepType;
      const matchCondition = !step.condition || step.condition(event);

      if (!matchType || !matchCondition) continue;

      // ✅ MATCH!
      stepUsers[stepIndex].add(userId);
      stepIndex++;
    }

    // 🔥 DROP-OFF
    if (stepIndex < totalSteps) {
      const dropStep = Math.max(stepIndex - 1, 0);

      if (!dropOffMap.has(dropStep)) dropOffMap.set(dropStep, new Set());
      dropOffMap.get(dropStep)!.add(userId);
    }
  }

  const steps: FunnelStepResult[] = [];
  const dropOffDetails: FunnelResult["dropOffDetails"] = [];
  let prevUsers = 0;

  for (let i = 0; i < totalSteps; i++) {
    const usersAtStep = stepUsers[i].size;

    steps.push({
      step: config.steps[i].label ?? config.steps[i].stepType,
      usersAtStep,
      conversionRateFromPrevious:
        prevUsers > 0 ? (usersAtStep / prevUsers) * 100 : 0,
      dropOffFromPrevious: prevUsers > 0 ? prevUsers - usersAtStep : 0,
    });

    if (dropOffMap.has(i)) {
      dropOffDetails.push({
        step: config.steps[i].label ?? config.steps[i].stepType,

        users: Array.from(dropOffMap.get(i)!),
      });
    }

    prevUsers = usersAtStep;
  }

  return {
    steps,
    dropOffDetails,
  };
}
