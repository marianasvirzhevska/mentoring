import { getRandomInt } from '../utils';

describe('getRandomInt - main functionality', () => {
  test('Should return only integers', () => {
    const actual1 = getRandomInt(100, 1);
    const actual2 = getRandomInt(2, -0.2);
    const actual3 = getRandomInt(30, -3.7);
    expect(Number.isInteger(actual1)).toBeTruthy();
    expect(Number.isInteger(actual2)).toBeTruthy();
    expect(Number.isInteger(actual3)).toBeTruthy();
  });
  test('Should return random integers from min to max range', () => {
    const actual1 = getRandomInt(50, 1);
    const actual2 = getRandomInt(50, 1);
    const actual3 = getRandomInt(50, 1);
    expect(actual1).not.toBe(actual2);
    expect(actual1).not.toBe(actual3);
    expect(actual2).not.toBe(actual3);
  });
  test('Should return random integers from 0 to max range if min value is not provided', () => {
    const actual1 = getRandomInt(20);
    const actual2 = getRandomInt(20);
    const actual3 = getRandomInt(20);
    expect(actual1).not.toBe(actual2);
    expect(actual1).not.toBe(actual3);
    expect(actual2).not.toBe(actual3);
  });
});
