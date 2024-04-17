export const getTime = (time: string) => {
  const year = time.slice(0, 4);
  const month = time.slice(5, 7);
  const date = time.slice(8, 10);
  const hour = time.slice(11, 13);
  const minute = time.slice(14, 16);
  return { year, month, date, hour, minute };
};
