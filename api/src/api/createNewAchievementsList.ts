import { Achievement } from '../interfaces';

export const createNewAchievementsList = (
  allAchievements: Achievement[],
  requiredAchievIds: string[],
  achievementQty: number,
): Achievement[] => {
  const randomAchievQty = achievementQty - requiredAchievIds.length;
  const requiredAchievements: Achievement[] = allAchievements.filter(
    ({ id }: Achievement) => requiredAchievIds.includes(id),
  );

  const randomAchievements: Achievement[] = allAchievements
    .filter(({ id }: Achievement) => !requiredAchievIds.includes(id))
    .sort(() => Math.random() - 0.5)
    .splice(0, randomAchievQty);

  return [...requiredAchievements, ...randomAchievements];
};
