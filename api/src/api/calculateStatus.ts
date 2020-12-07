import socketIo from 'socket.io';
import { Achievement, Status } from '../interfaces';
import { StatusState } from '../constants';
import ChallengeModel, { ChallengeDocument } from '../models/challenge.model';

export const calculateAchievementsStatus = async (
  challengeId: string,
  io: socketIo.Server,
): Promise<Map<string, Status>> => {
  const challenge: ChallengeDocument = await ChallengeModel.findById(
    challengeId,
  );

  if (!challenge) {
    return null;
  }

  // Random check completed
  const mockAchievementsList = challenge.achievements.reduce(
    (accumulator, current: Achievement) => {
      accumulator.set(current._id, {
        [current._id]: {
          state:
            Math.random() <= 0.5 ? StatusState.SUCCESS : StatusState.FAILURE,
          updated: new Date(),
        },
      });

      return accumulator;
    },
    new Map(),
  );

  // TODO: Remove mockAchievementsList and use actual
  const actual = challenge.achievements.reduce(
    (accumulator, current: Achievement) => {
      accumulator.set(
        current._id,
        current.checkComplete(challenge.tasksStatus),
      );

      return accumulator;
    },
    new Map(),
  );
  console.log(actual);

  io.emit('update achievements status', { achievements: mockAchievementsList });

  return mockAchievementsList;
};
