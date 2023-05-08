import crypto from "crypto";

export const hash = (text: string): string => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return hash.digest('hex').toString();
};