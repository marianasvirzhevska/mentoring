import { getAchievements } from '../api';
import { challengesList } from './test.mocks/data.mocks';

describe('getAchievements - main functionality', () => {
  test('Should returns an array of achievements by the challenge id', () => {
    const challenges = [...challengesList];
    const challengeId = '1';
    const expectedResult = [
      {
        id: '1',
        description: 'Complete each task 10 days in a row',
        image: '',
        status: {
          state: 'pending',
          updated: new Date('November 1, 2020 00:00:00'),
        },
      },
      {
        id: '2',
        description: 'Complete five tasks before 10:00 AM',
        image: '',
        status: {
          state: 'pending',
          updated: new Date('November 1, 2020 00:00:00'),
        },
      },
      {
        id: '3',
        description: "Complete 2 Monday's tasks",
        image: '',
        status: {
          state: 'pending',
          updated: new Date('November 1, 2020 00:00:00'),
        },
      },
      {
        id: '4',
        description: 'Complete half of the tasks',
        image: '',
        status: {
          state: 'pending',
          updated: new Date('November 1, 2020 00:00:00'),
        },
      },
      {
        id: '5',
        description: 'Complete all tasks',
        image: '',
        status: {
          state: 'pending',
          updated: new Date('November 1, 2020 00:00:00'),
        },
      },
    ];
    const actualResult = getAchievements(challengeId, challenges);
    expect(actualResult).toEqual(expectedResult);
  });
  test('Should returns null if there id no challenge with that id', () => {
    const challenges = [...challengesList];
    const challengeId = '3';
    const result = getAchievements(challengeId, challenges);
    expect(result).toBeNull();
  });
});
