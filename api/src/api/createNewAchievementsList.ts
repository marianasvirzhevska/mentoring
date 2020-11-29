import { Achievement } from '../interfaces';

export const createNewAchievementsList = (
  allAchievements: Achievement[],
  requiredAchievIds: string[],
  achievementQty: number,
): Achievement[] => {
  const randomAchievQty = achievementQty - requiredAchievIds.length;
  const requiredAchievements: Achievement[] = allAchievements.filter(
    ({ _id }: Achievement) => requiredAchievIds.includes(_id),
  );

  const randomAchievements: Achievement[] = allAchievements
    .filter(({ _id }: Achievement) => !requiredAchievIds.includes(_id))
    .sort(() => Math.random() - 0.5)
    .splice(0, randomAchievQty);

  return [...requiredAchievements, ...randomAchievements];
};
