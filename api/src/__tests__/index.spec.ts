import {
  getDayOfChallenge,
  getCurrentTask,
  getTaskArchive,
  startNewChallenge,
} from '../api';
import { StatusState } from '../constants';
import { challengesList, tasks, achievements } from './test.mocks/data.mocks';

describe('Start root file', () => {
  test('Should print Hello World', () => {
    expect(true).toBeTruthy();
  });
});

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

describe('getTaskArchive - main functionality', () => {
  test('Should return all past tasks with their results by the challenge id', () => {
    const challengeId = '1';
    const dateNow = new Date('November 3, 2020 00:00:00');
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
    const actualResult = getTaskArchive(challengeId, challengesList, dateNow);
    expect(actualResult).toEqual(expectedResult);
  });
  test('Should return null if there id no challenge with that id', () => {
    const challengeId = '10';
    const dateNow = new Date('November 8, 2020 00:00:00');
    const result = getTaskArchive(challengeId, challengesList, dateNow);
    expect(result).toBeNull();
  });
});

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
