/**
 * Generates a pseudorandom number between min and max
 * @param min
 * @param max
 * @returns number
 */
export const generateNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;
