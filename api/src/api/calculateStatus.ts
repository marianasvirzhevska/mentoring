import { Achievement, Status } from '../interfaces';
import { StatusState } from '../constants';

export const calculateAchievementsStatus = (
  achievementsList: Achievement[],
  tasksStatus: Record<string, Status>,
): Record<string, Status> => {
  // Random check completed
  const mockAchievementsList = achievementsList.reduce(
    (accumulator, current: Achievement) => {
      accumulator[current.id] = {
        [current.id]: {
          state:
            Math.random() <= 0.5 ? StatusState.SUCCESS : StatusState.FAILURE,
          updated: new Date(),
        },
      };

      return accumulator;
    },
    {},
  );

  // TODO: Remove mockAchievementsList and use actual
  const actual = achievementsList.reduce(
    (accumulator, current: Achievement) => {
      accumulator[current.id] = current.checkComplete(tasksStatus);

      return accumulator;
    },
    {},
  );

  console.log(actual);

  return mockAchievementsList;
};
