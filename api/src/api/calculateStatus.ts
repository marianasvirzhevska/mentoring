import { Achievement, Status } from '../interfaces';

export const calculateAchievementsStatus = (
  achievementsList: Achievement[],
  tasksStatus: Record<string, Status>,
): Record<string, Status> => {
  return achievementsList.reduce((accumulator, current: Achievement) => {
    accumulator[current.id] = current.checkComplete(tasksStatus);

    return accumulator;
  }, {});
};
