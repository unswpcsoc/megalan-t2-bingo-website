export const generateNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;
