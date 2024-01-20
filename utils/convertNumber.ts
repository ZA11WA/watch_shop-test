export const convertNumber = (digit: number) => {
  return new Intl.NumberFormat("pl-PL").format(digit);
};
