import { Challenge, ActualAchievement, Achievement } from '../interfaces';

export const getAchievements = (
  challengeId: string,
  allChallenges: Challenge[],
): ActualAchievement[] | null => {
  const currentChallenge: Challenge = allChallenges.find(
    (challenge) => challenge.id === challengeId,
  );

  if (!currentChallenge) {
    return null;
  }

  const achievements: ActualAchievement[] = currentChallenge.achievements.map(
    ({ id, description, image }: Achievement) => ({
      id,
      description,
      image,
      status: currentChallenge.achievementsStatus[id],
    }),
  );

  return achievements;
};
