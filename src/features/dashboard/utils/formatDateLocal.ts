export function formatDateLocal(timestamp: number, timezone: string): string {
  console.log("formatdate");

  return new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(timestamp));
}
