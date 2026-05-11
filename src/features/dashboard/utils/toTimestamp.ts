export function toTimestamp(iso: string): number {
  return Date.parse(iso);
}
