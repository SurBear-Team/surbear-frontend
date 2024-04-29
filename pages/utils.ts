import dayjs from "dayjs";

export const getTime = (time: string, asString?: boolean) => {
  if (time === null) {
    return null;
  } else {
    const dayJs = dayjs(time);
    const year = dayJs.year();
    const month = dayJs.month() + 1;
    const date = dayJs.date();
    const hour = dayJs.hour();
    const minute = dayJs.minute();
    if (asString === true) {
      return `${year}.${month}.${date}`;
    } else {
      return { year, month, date, hour, minute };
    }
  }
};

export const getAge = (age: string) => {
  if (age === "UNDER_TWENTY") {
    return "10대";
  } else if (age === "TWENTIES") {
    return "20대";
  } else if (age === "THIRTIES") {
    return "30대";
  } else if (age === "FOURTIES") {
    return "40대";
  } else if (age === "FIFTIES") {
    return "50대";
  } else if (age === "OVER_SIXTIES") {
    return "60대";
  }
};
