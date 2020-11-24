import { getAchievements } from '../api';
import { challengesList } from './test.mocks/data.mocks';

describe('getAchievements - main functionality', () => {
  test('Should returns an array of achievements by the challenge id', () => {
    const challenges = [...challengesList];
    const challengeId = '1';
    const actual = getAchievements(challengeId, challenges);
    expect(actual[0]).toHaveProperty('id');
    expect(actual[0]).toHaveProperty('image');
    expect(actual[0]).toHaveProperty('description');
  });
  test('Should returns null if there id no challenge with that id', () => {
    const challenges = [...challengesList];
    const challengeId = '3';
    const result = getAchievements(challengeId, challenges);
    expect(result).toBeNull();
  });
});
