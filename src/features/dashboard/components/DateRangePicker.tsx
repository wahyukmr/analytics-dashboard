import React from "react";
import type { DateRange } from "../types";

interface DateRangePickerProps {
  value: DateRange;
  onChangeDate: (newRange: DateRange) => void;
}

export default function DateRangePicker({
  value,
  onChangeDate,
}: DateRangePickerProps): React.JSX.Element {
  return (
    <div className="date-range-picker">
      <label htmlFor="date-range">Date Range:</label>
      <select
        id="date-range"
        value={value}
        onChange={(e) => onChangeDate(e.target.value as DateRange)}
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
