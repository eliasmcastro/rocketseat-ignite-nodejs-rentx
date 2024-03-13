interface IDateProvider {
  dateNow(): Date;

  convertToUTC(date: Date): string;

  addDays(days: number): Date;

  addHours(hours: number): Date;

  compareInHours(start_date: Date, end_date: Date): number;

  compareInDays(start_date: Date, end_date: Date): number;

  compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
