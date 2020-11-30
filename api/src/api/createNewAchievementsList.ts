import { Achievement } from '../interfaces';

export const createNewAchievementsList = (
  allAchievements: Achievement[],
  requiredAchv: Omit<Achievement, '_id'>[],
  achievementQty: number,
): Achievement[] => {
  const randomAchievQty = achievementQty - requiredAchv.length;
  const requiredAchievements: Achievement[] = allAchievements.filter(
    ({ description }: Achievement) =>
      requiredAchv.find(
        (element: Achievement) => description === element.description,
      ),
  );

  const randomAchievements: Achievement[] = allAchievements
    .filter(
      ({ description }: Achievement) =>
        !requiredAchv.find(
          (element: Achievement) => description === element.description,
        ),
    )
    .sort(() => Math.random() - 0.5)
    .splice(0, randomAchievQty);

  return [...requiredAchievements, ...randomAchievements];
};
