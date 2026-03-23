import React from "react";
import type { DateRange } from "../../dashboardTypes";

interface DateRangePickerProps {
  dateRange: DateRange;
  onChangeDateRange: (newRange: DateRange) => void;
}

export default function DateRangePickerView({
  dateRange,
  onChangeDateRange,
}: DateRangePickerProps): React.JSX.Element {
  console.log("DateRangePickerView");

  return (
    <div className="date-range-picker">
      <label htmlFor="date-range">Date Range:</label>
      <select
        id="date-range"
        value={dateRange}
        onChange={(e) => onChangeDateRange(e.target.value as DateRange)}
      >
        <option value="today">Today</option>
        <option value="last_7_days">Last 7 Days</option>
        <option value="this_month">This Month</option>
        <option value="last_month">Last Month</option>
        <option value="3_months_ago">3 Months Ago</option>
      </select>
    </div>
  );
}
