import { Challenge, ActualAchievement, Achievement } from '../interfaces';

export const getAchievements = (
  challengeId: string,
  allChallenges: Challenge[],
): ActualAchievement[] | null => {
  const currentChallenge: Challenge = allChallenges.find(
    (challenge) => challenge._id === challengeId,
  );

  if (!currentChallenge) {
    return null;
  }

  const achievements: ActualAchievement[] = currentChallenge.achievements.map(
    ({ _id, description, image }: Achievement) => ({
      _id,
      description,
      image,
      status: currentChallenge.achievementsStatus[_id],
    }),
  );

  return achievements;
};
