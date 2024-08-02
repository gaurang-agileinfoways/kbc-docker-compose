export const DateUtils = {
  startDay: (date: string | Date) => {
    const startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, 0);
    return startDate;
  },
  endDay: (date: string | Date) => {
    const endDate = new Date(date);
    endDate.setUTCHours(23, 59, 59, 999);
    return endDate;
  },
  getNumberOfDays: (startDate: string | Date, endDate: string | Date) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.abs(start.getTime() - end.getTime());
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  },
};
