import { getTaskArchive } from '../api';
import { challengesList } from './test.mocks/data.mocks';

describe('getTaskArchive - main functionality', () => {
  test('Should return all past tasks with their results by the challenge id', () => {
    const challengeId = '1';
    const expectedResult = [
      {
        id: '1',
        description: 'Go to bed before 11:00 PM',
        status: {
          state: 'success',
          updated: new Date('November 2, 2020 00:00:00'),
        },
      },
    ];
    const actualResult = getTaskArchive(challengeId, challengesList);
    expect(actualResult).toEqual(expectedResult);
  });
  test('Should return null if there id no challenge with that id', () => {
    const challengeId = '10';
    const result = getTaskArchive(challengeId, challengesList);
    expect(result).toBeNull();
  });
});
