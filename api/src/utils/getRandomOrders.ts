export const getRandomOrders = (value: number): number[] => {
  const random: number[] = [...new Array(value).keys()]
    .sort(() => Math.random() - 0.5)
    .splice(0, value);

  return random;
};
