import { startNewChallenge } from '../api';
import { tasks, achievements } from './test.mocks/data.mocks';

describe('startNewChallenge - main functionality', () => {
  test('Should return new challenge', () => {
    const actual = startNewChallenge(tasks, achievements, 30, 5);
    expect(actual).toHaveProperty('id');
    expect(actual).toHaveProperty('state');
    expect(actual).toHaveProperty('startDate');
    expect(actual).toHaveProperty('tasksOrder');
    expect(actual).toHaveProperty('tasksStatus');
    expect(actual).toHaveProperty('achievements');
    expect(actual).toHaveProperty('achievementsStatus');
  });
  test('Should return new challenge with randomly picket tasks', () => {
    const actual1 = startNewChallenge(tasks, achievements, 30, 5).tasksOrder;
    const actual2 = startNewChallenge(tasks, achievements, 30, 5).tasksOrder;
    const result1 = actual1[0].description === actual2[0].description;
    const result2 = actual1[10].description === actual2[10].description;
    const result3 = actual1[10].description === actual2[15].description;
    const result4 = actual1[10].description === actual2[25].description;
    expect(result1 && result2).toBeFalsy();
    expect(result3 && result4).toBeFalsy();
  });
});
