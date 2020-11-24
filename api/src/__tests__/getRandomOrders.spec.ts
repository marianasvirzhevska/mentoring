import { getRandomOrders } from '../utils';

describe('getRandomOrders - main functionality', () => {
  test('Should return an array', () => {
    const actual1 = getRandomOrders(100);
    const actual2 = getRandomOrders(2);
    const actual3 = getRandomOrders(30);
    expect(Array.isArray(actual1)).toBeTruthy();
    expect(Array.isArray(actual2)).toBeTruthy();
    expect(Array.isArray(actual3)).toBeTruthy();
  });
  test('Should return an array of unique integers', () => {
    const actual1 = getRandomOrders(100);
    const actual2 = getRandomOrders(2);
    const actual3 = getRandomOrders(30);
    const expected1 = new Set(actual1).size;
    const expected2 = new Set(actual2).size;
    const expected3 = new Set(actual3).size;
    expect(actual1.length).toBe(expected1);
    expect(actual2.length).toBe(expected2);
    expect(actual3.length).toBe(expected3);
  });
  test('Should return an array with length equal to provided number', () => {
    const actual1 = getRandomOrders(100);
    const actual2 = getRandomOrders(50);
    const actual3 = getRandomOrders(30);
    expect(actual1.length).toBe(100);
    expect(actual2.length).toBe(50);
    expect(actual3.length).toBe(30);
  });
});
