// returns a hidden version of an email passed in displaying only 3 letters
export const hideEmail = (email: string) => {
  const len = email.replace(/@.*/, "").length;
  const partialEmail = email.replace(
    /(\w{3})[\w.-]+@([\w.]+\w)/,
    `$1${"*".repeat(len - 3)}@$2`
  );
  return partialEmail;
};
