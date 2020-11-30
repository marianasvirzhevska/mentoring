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

  const tasksOrder: Record<string, Task> = randomTasksOrder.reduce(
    (accumulator, current: number, index: number) => {
      accumulator[current] = tasks[index];
      return accumulator;
    },
    {},
  );

  const tasksStatus: Record<string, Status> = randomTasksOrder.reduce(
    (accumulator, current: number) => {
      accumulator[current] = {
        state: StatusState.PENDING,
        updated: new Date(),
      };
      return accumulator;
    },
    {},
  );

  const achievements: Achievement[] = createNewAchievementsList(
    achievementsList,
    REQUIRED_ACHIEVEMENTS,
    achievementsPerChallenge,
  );

  const achievementsStatus: Record<string, Status> = achievements.reduce(
    (accumulator, current: Achievement) => {
      accumulator[current._id] = {
        state: StatusState.PENDING,
        updated: new Date(),
      };
      return accumulator;
    },
    {},
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
