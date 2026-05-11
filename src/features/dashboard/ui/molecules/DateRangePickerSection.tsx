import React from "react";
import type {
  DatePresent,
  EventFilter,
  PlanType,
} from "../../processing/types";

interface Props {
  filter: EventFilter;
  onChange: (patch: Partial<EventFilter>) => void;
  features?: string[];
}

export default function DateRangePickerSection({
  filter,
  onChange,
}: Props): React.JSX.Element {
  const plans: PlanType[] = ["all", "free", "pro"];
  console.log("date range picker component rendered");

  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="flex items-center gap-2">
        <label className="text-sm text-neutral-300">Date Range</label>
        <select
          className="bg-neutral-800 text-sm p-1 rounded"
          value={filter.dateRange}
          onChange={(e) =>
            onChange({ dateRange: e.target.value as DatePresent })
          }
        >
          <option value="today">Today</option>
          <option value="last_7_days">Last 7 Days</option>
          <option value="this_month">This Month</option>
          <option value="last_month">Last Month</option>
          <option value="3_months_ago">3 Months Ago</option>
          <option value="all">All</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-neutral-300">Plan</label>
        <select
          className="bg-neutral-800 text-sm p-1 rounded"
          value={filter.plan ?? "all"}
          onChange={(e) => onChange({ plan: e.target.value as PlanType })}
        >
          {plans.map((p) => (
            <option key={p} value={p}>
              {p === "all" ? "All" : p.charAt(0).toUpperCase() + p.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
