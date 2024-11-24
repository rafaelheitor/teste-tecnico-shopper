export class RideHelper {
  public static calulateCost(distance: number, costPerKm: number) {
    const distanceInKm = distance / 1000;
    const value = distanceInKm * costPerKm;

    return Math.round(value * 100) / 100;
  }

  public static formatDurationFromString(duration: string): string {
    const match = duration.match(/^(\d+)([smh])$/);

    if (!match) {
      throw new Error(
        "Invalid duration format. Use a format like '395s', '45m', or '2h'."
      );
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    if (unit === "s") {
      if (value < 60) {
        return `${value}s`;
      } else if (value < 3600) {
        const minutes = Math.floor(value / 60);
        const seconds = value % 60;
        return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
      } else {
        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value % 3600) / 60);
        return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
      }
    } else if (unit === "m") {
      if (value < 60) {
        return `${value}m`;
      } else {
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
      }
    } else if (unit === "h") {
      return `${value}h`;
    } else {
      throw new Error(
        "Invalid unit. Use 's' for seconds, 'm' for minutes, or 'h' for hours."
      );
    }
  }
}
