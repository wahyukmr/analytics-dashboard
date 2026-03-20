export function clampToNow(date: Date, now: Date) {
  return date > now ? new Date() : date;
}
