import dayjs from "dayjs";

export const getTime = (time: string) => {
  const dayJs = dayjs(time);
  const year = dayJs.year();
  const month = dayJs.month() + 1;
  const date = dayJs.date();
  const hour = dayJs.hour();
  const minute = dayJs.minute();
  return { year, month, date, hour, minute };
};
