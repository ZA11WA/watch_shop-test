export const formatNumber = (digit: number) => {
  return new Intl.NumberFormat("pl-PL").format(digit);
};
