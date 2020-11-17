import { getRandomInt } from './getRandomInt';

export function getRandomOrders(value: number): number[] {
  const random: number[] = [];
  while (random.length < value) {
    const int = getRandomInt(value);
    if (!random.includes(int)) {
      random.push(int);
    }
  }

  return random;
}
