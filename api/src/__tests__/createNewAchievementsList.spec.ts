import { createNewAchievementsList } from '../api';
import { achievements } from './test.mocks/data.mocks';

describe('createNewAchievementsList - main functionality', () => {
  test('Should returns an array of N random achievements', () => {
    const requiredIds = ['1', '2'];
    const result = createNewAchievementsList(achievements, requiredIds, 5);
    const requiredIds1 = ['1'];
    const result1 = createNewAchievementsList(achievements, requiredIds1, 3);
    expect(result.length).toBe(5);
    expect(result1.length).toBe(3);
  });
  test('Should returns an array of achievements with the required ones', () => {
    const requiredIds = ['1', '3'];
    const expected = [
      {
        id: '1',
        description: 'Complete each task 10 days in a row',
        image: '',
      },
      { id: '3', description: "Complete 2 Monday's tasks", image: '' },
    ];
    const result = createNewAchievementsList(achievements, requiredIds, 4);
    expect(result).toEqual(expect.arrayContaining(expected));
  });
  test('Should returns an array of unique achievements', () => {
    const requiredIds = ['1', '3'];
    const result = createNewAchievementsList(achievements, requiredIds, 7);
    expect(result.length).toBe([...new Set(result)].length);
  });
});
