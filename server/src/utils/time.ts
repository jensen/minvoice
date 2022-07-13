export const parseDuration = (input: string) => {
  const [hours, minutes] = input.split(":");

  return Number(hours) * 3600 + Number(minutes) * 60;
};
