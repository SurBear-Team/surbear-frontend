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

export const getTimeAsString = (time: string) => {
  if (time === null) {
    return "";
  } else {
    const { year, month, date } = getTime(time);
    return `${year}.${month}.${date}`;
  }
};

export const getAge = (age: string) => {
  if (age === "UNDER_TWENTY") {
    return "20대 미만";
  } else if (age === "TWENTIES") {
    return "20대";
  } else if (age === "THIRTIES") {
    return "30대";
  } else if (age === "FOURTIES") {
    return "40대";
  } else if (age === "FIFTIES") {
    return "50대";
  } else if (age === "OVER_SIXTIES") {
    return "60대 이상";
  }
};

export const getConstAge = (age: string) => {
  if (age === "20대 미만") {
    return "UNDER_TWENTY";
  } else if (age === "20대") {
    return "TWENTIES";
  } else if (age === "30대") {
    return "THIRTIES";
  } else if (age === "40대") {
    return "FOURTIES";
  } else if (age === "50대") {
    return "FIFTIES";
  } else if (age === "60대 이상") {
    return "OVER_SIXTIES";
  }
};
