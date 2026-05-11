import React from "react";
import type { FunnelResult } from "../../derived/types";

function humanizeStep(step: string) {
  return step.charAt(0).toUpperCase() + step.slice(1).replaceAll("_", " ");
}

function FunnelStepRow({
  totalBase,
  step,
}: {
  totalBase: number;
  step: FunnelResult["steps"][number];
}) {
  const width =
    totalBase > 0 ? Math.max(6, (step.usersAtStep / totalBase) * 100) : 0;

  return (
    <div className="flex items-center gap-4 py-2">
      <div className="w-48">
        <div className="text-sm font-medium text-neutral-200">
          {humanizeStep(step.step)}
        </div>
        <div className="text-xs text-neutral-500">
          {step.usersAtStep} {step.usersAtStep > 1 ? "users" : "user"}
        </div>
      </div>

      <div className="flex-1">
        <div className="bg-neutral-800 h-4 rounded overflow-hidden">
          <div
            className="h-4 rounded"
            style={{
              width: `${width}%`,
              background: `linear-gradient(90deg,#3b82f6,#06b6d4)`,
            }}
          />
        </div>
      </div>

      <div className="w-44 text-right">
        <div className="text-sm text-neutral-300">
          {step.conversionRateFromPrevious.toFixed(1)}%
        </div>
        <div className="text-xs text-neutral-500">
          drop {step.dropOffFromPrevious}
        </div>
      </div>
    </div>
  );
}

export function FunnelSection({
  funnelData,
}: {
  funnelData: FunnelResult;
}): React.JSX.Element {
  const base = funnelData.steps[0]?.usersAtStep ?? 0;
  console.log("funnel component rendered");

  return (
    <section className="p-6 rounded-xl bg-neutral-900 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Conversion Funnel</h2>
        <div className="text-sm text-neutral-400">
          Total steps: {funnelData.steps.length}
        </div>
      </div>

      <div className="space-y-3">
        {funnelData.steps.map((s) => (
          <FunnelStepRow key={s.step} totalBase={base} step={s} />
        ))}
      </div>

      {funnelData.dropOffDetails.length > 0 && (
        <div className="mt-6 text-sm text-neutral-400">
          <div className="font-medium text-neutral-200 mb-2">
            Drop-off details
          </div>
          <ul className="space-y-1">
            {funnelData.dropOffDetails.map((d) => (
              <li key={d.step} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                <span className="text-neutral-300">{humanizeStep(d.step)}</span>
                <span className="ml-auto text-xs text-neutral-500">
                  {d.users.length} {d.users.length > 1 ? "users" : "user"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
