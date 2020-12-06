import { Types } from 'mongoose';
import socketIo from 'socket.io';
import { Status } from '../interfaces';
import { StatusState } from '../constants';
import { getDayOfChallenge } from '../utils';
import ChallengeModel, { ChallengeDocument } from '../models/challenge.model';

export const updateTaskStatus = async (
  challengeId: string,
  completed?: boolean,
  io?: socketIo.Server,
): Promise<Map<string, Status>> => {
  const challenge: ChallengeDocument = await ChallengeModel.findById(
    challengeId,
  );

  if (!challenge) {
    return null;
  }

  const { tasksStatus } = challenge;
  const dayOfChallenge: number = getDayOfChallenge(challenge.startDate);
  const index = `${dayOfChallenge + 1}`;
  const newState = completed ? StatusState.SUCCESS : StatusState.FAILURE;

  const newTasksStatus: Map<string, Status> = new Map({
    ...tasksStatus,
    [index]: {
      state: newState,
      updated: new Date(),
    },
  });

  const update = await ChallengeModel.updateOne(
    { _id: new Types.ObjectId(challengeId) },
    { tasksStatus },
  );

  console.log(update);

  io.emit('update task status', {
    taskIndex: index,
    message: `Task status was updated to ${newState}`,
  });

  return newTasksStatus;
};
