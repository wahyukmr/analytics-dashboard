export class Timeline {
  static randomDateWithinDays(days: number): Date {
    const now = new Date();
    const past = new Date();
    past.setDate(now.getDate() - days);

    return new Date(
      past.getTime() + Math.random() * (now.getTime() - past.getTime()),
    );
  }

  static safeDate(date: Date): Date {
    const now = new Date();
    return date > now ? now : date;
  }
}
