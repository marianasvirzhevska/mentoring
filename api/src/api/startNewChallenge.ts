import { Task, Achievement, Challenge, Status } from '../interfaces';
import { StatusState, ChallengeState } from '../constants';
import { getRandomOrders } from '../utils';
import { createNewAchievementsList } from './createNewAchievementsList';
import {
  REQUIRED_ACHIEVEMENTS,
  DEFAULT_ACHIEVEMENTS_QUANTITY,
  DEFAULT_CHALLENGE_DURATION,
} from '../constants';

export const startNewChallenge = (
  tasks: Task[],
  achievementsList: Achievement[],
  challengeDuration = DEFAULT_CHALLENGE_DURATION,
  achievementsPerChallenge = DEFAULT_ACHIEVEMENTS_QUANTITY,
): Omit<Challenge, '_id'> => {
  const randomTasksOrder = getRandomOrders(challengeDuration);

  const tasksOrder: Map<string, Task> = randomTasksOrder.reduce(
    (accumulator, current: number, index: number) => {
      accumulator.set(`${index + 1}`, tasks[current]);
      return accumulator;
    },
    new Map(),
  );

  const tasksStatus: Map<string, Status> = randomTasksOrder.reduce(
    (accumulator, current: number) => {
      accumulator.set(`${current + 1}`, {
        state: StatusState.PENDING,
        updated: new Date(),
      });
      return accumulator;
    },
    new Map(),
  );

  const achievements: Achievement[] = createNewAchievementsList(
    achievementsList,
    REQUIRED_ACHIEVEMENTS,
    achievementsPerChallenge,
  );

  const achievementsStatus: Map<string, Status> = achievements.reduce(
    (accumulator, current: Achievement) => {
      const key = current._id.toString();
      accumulator.set(key, {
        state: StatusState.PENDING,
        updated: new Date(),
      });
      return accumulator;
    },
    new Map(),
  );

  const challenge: Omit<Challenge, '_id'> = {
    state: ChallengeState.PROGRESS,
    startDate: new Date(),
    tasksOrder,
    tasksStatus,
    achievements,
    achievementsStatus,
  };

  return challenge;
};
