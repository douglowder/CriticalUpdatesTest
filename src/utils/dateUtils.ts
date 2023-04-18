// Date-time utils for the persistent date hook and for date comparison

export const dateToTimeInSeconds = (date: Date | undefined) =>
  date ? Math.floor(date.getTime() / 1000) : -1;

export const date1GreaterThanDate2 = (date1: Date | undefined, date2: Date | undefined) =>
  dateToTimeInSeconds(date1) > dateToTimeInSeconds(date2);

export const dateDifferenceInSeconds = (date1: Date | undefined, date2: Date | undefined) =>
  dateToTimeInSeconds(date1) - dateToTimeInSeconds(date2);
