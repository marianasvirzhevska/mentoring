import { ActualAchievement, Achievement } from '../interfaces';
import ChallengeModel, { ChallengeDocument } from '../models/challenge.model';

export const getAchievements = async (
  challengeId: string,
): Promise<ActualAchievement[] | null> => {
  const challenge: ChallengeDocument = await ChallengeModel.findById(
    challengeId,
  );

  if (!challenge) {
    return null;
  }

  const achievements: ActualAchievement[] = challenge.achievements.map(
    ({ _id, description, image }: Achievement) => ({
      _id,
      description,
      image,
      status: challenge.achievementsStatus.get(_id),
    }),
  );

  return achievements;
};
