export const ensure = <T>(argument: T | undefined | null, message = "You fucked up"): T => {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
};
