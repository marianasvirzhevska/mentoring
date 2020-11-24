import { getCurrentTask } from '../api';
import { StatusState } from '../constants';
import { challengesList } from './test.mocks/data.mocks';

describe('getCurrentTask - main functionality', () => {
  test('Should return null if there is no challenge with that id', () => {
    const currentChallenge = '2';
    const currentDate = new Date('November 8, 2020 00:00:00');
    const result = getCurrentTask(
      currentChallenge,
      challengesList,
      currentDate,
    );
    expect(result).toBeNull();
  });
  test('Should return current task with its status by the challenge id', () => {
    const currentChallengeId = '1';
    const currentDate = new Date('November 8, 2020 00:00:00');
    const expectedResult = {
      id: '7',
      description: 'Eat your breakfast in bed',
      status: {
        state: StatusState.PENDING,
        updated: new Date('November 3, 2020 00:00:00'),
      },
    };
    const actualResult = getCurrentTask(
      currentChallengeId,
      challengesList,
      currentDate,
    );
    expect(actualResult).toEqual(expectedResult);
  });
});
