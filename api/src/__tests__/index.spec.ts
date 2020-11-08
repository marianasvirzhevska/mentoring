import { getDayOfChallenge, getCurrentTask, getAchievements , getTaskArchive } from '../api';
import { StatusState } from '../constants';
import { challengesMock, archivedItems, actualAchievements } from '../tests-mock';

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
    const challengesList = [...challengesMock];
    const currentChallenge = '2';
    const currentDate = new Date('November 8, 2020 00:00:00');
    const result = getCurrentTask(currentChallenge, challengesList, currentDate);
    expect(result).toBeNull();
  });
  test('Should return current task with its status by the challenge id', () => {
    const challengesList = [...challengesMock];
    const currentChallengeId = '1';
    const currentDate = new Date('November 8, 2020 00:00:00');
    const expectedResult = {
      id: '8',
      description: 'Spend 20 minutes reading poetry out loud',
      status: {
        state: StatusState.PENDING,
      },
    };
    const actualResult = getCurrentTask(currentChallengeId, challengesList, currentDate);
    expect(actualResult).toEqual(expectedResult);
  });
});

describe('getAchievements - main functionality', () => {
  test('Should returns an array of achievements by the challenge id', () => {
    const challengesList = [...challengesMock];
    const challengeId = '1';
    const expectedResult = [...actualAchievements];
    const actualResult = getAchievements(challengeId, challengesList);
    expect(actualResult).toEqual(expectedResult);
  });
  test('Should returns null if there id no challenge with that id', () => {
    const challengesList = [...challengesMock];
    const challengeId = '3';
    const result = getAchievements(challengeId, challengesList);
    expect(result).toBeNull();
  });
});

describe('getTaskArchive - main functionality', () => {
  test('Should return all past tasks with their results by the challenge id', () => {
    const challengesList = [...challengesMock];
    const challengeId = '0';
    const expectedResult = [...archivedItems];
    const actualResult = getTaskArchive(challengeId, challengesList);
    expect(actualResult).toEqual(expectedResult);
  });
  test('Should return null if there id no challenge with that id', () => {
    const challengesList = [...challengesMock];
    const challengeId = '10';
    const result = getTaskArchive(challengeId, challengesList);
    expect(result).toBeNull();
  });
})