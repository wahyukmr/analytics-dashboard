import type { DatePresent } from "../processing/types";

export function getStartDay(range: DatePresent): Date {
  const now = new Date();

  const year = now.getUTCFullYear();

  const month = now.getUTCMonth();

  const date = now.getUTCDate();

  switch (range) {
    case "today":
      return new Date(Date.UTC(year, month, date));

    case "last_7_days":
      return new Date(Date.UTC(year, month, date - 7));

    case "this_month":
      return new Date(Date.UTC(year, month, 1));

    case "last_month":
      return new Date(Date.UTC(year, month - 1, 1));

    case "3_months_ago":
      return new Date(Date.UTC(year, month - 3, 1));

    default:
      return new Date(0);
  }
}
