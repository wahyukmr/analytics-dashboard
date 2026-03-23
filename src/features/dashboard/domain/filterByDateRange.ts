import type { DateRange, NormalizedEvent } from "../dashboardTypes";

export function filterByDateRange(
  events: NormalizedEvent[],
  range: DateRange,
): NormalizedEvent[] {
  return events.filter((event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    let startDate: Date;

    switch (range) {
      case "today":
        startDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        );
        break;
      case "last_7_days":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        break;
      case "this_month":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case "last_month":
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        break;
      case "3_months_ago":
        startDate = new Date(today.getFullYear(), today.getMonth() - 3, 1);
        break;
      default:
        return true; // No filtering if range is unrecognized
    }

    return eventDate >= startDate && eventDate <= today;
  });
}
