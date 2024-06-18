interface IDateProvider {
  dateNow(): Date;

  convertToUTC(date: Date): string;

  addHours(hours: number): Date;

  addDays(days: number): Date;

  compareInHours(start_date: Date, end_date: Date): number;

  compareInDays(start_date: Date, end_date: Date): number;

  compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
