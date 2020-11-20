import { getDayOfChallenge } from '../utils';

describe('getDayOfChallenge - main functionality', () => {
  test('Should return days passed form start date till current date', () => {
    const startDate = new Date('November 1, 2020 00:00:00');
    const currentDate1 = new Date('November 1, 2020 03:24:00');
    const currentDate2 = new Date('November 20, 2020 03:24:00');
    const currentDate3 = new Date('December 20, 2020 03:24:00');
    const currentDate4 = new Date('November 8, 2020 00:00:00');
    const result1 = getDayOfChallenge(startDate, currentDate1);
    const result2 = getDayOfChallenge(startDate, currentDate2);
    const result3 = getDayOfChallenge(startDate, currentDate3);
    const result4 = getDayOfChallenge(startDate, currentDate4);
    expect(result1).toBe(0);
    expect(result2).toBe(19);
    expect(result3).toBe(49);
    expect(result4).toBe(7);
  });
  test('Should return undefined if start date > current date', () => {
    const startDate = new Date('November 1, 2020 00:00:00');
    const currentDate = new Date('December 20, 2019 03:24:00');
    const result = getDayOfChallenge(startDate, currentDate);
    expect(result).toBeUndefined();
  });
});
