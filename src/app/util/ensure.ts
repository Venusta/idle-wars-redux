
export const ensure = <T>(argument: T | undefined | null, message: string = "You fucked up"): T => {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}
