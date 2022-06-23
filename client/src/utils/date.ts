export const getDayLabel = (date: Date) =>
  new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);

export const getFirstDayOfWeek = (year: number, month: number, day: number) => {
  const input = new Date(year, month - 1, day);

  while ([1, 2, 3, 4, 5, 6, 0].indexOf(input.getDay()) > 0) {
    input.setDate(input.getDate() - 1);
  }

  return input;
};

export const getWeek = (start: Date) => {
  return new Array(7).fill(null).map((weekday, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
};

export const formatWeekdayMonthDay = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
};

export const formatSeconds = (seconds: number) => {
  const hours = Math.floor(seconds / (60 * 60));
  const minutes = seconds / (60 * 60) - hours;
  const pad = (number: number) => (number < 10 ? `0${number}` : number);

  return `${hours}:${pad(Math.round(Number(minutes.toFixed(2)) * 60))}`;
};

export const isSameDay = (a: Date, b: Date) => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};
