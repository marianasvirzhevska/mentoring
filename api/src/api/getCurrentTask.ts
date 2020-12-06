import { ActualTask, Task, Status } from '../interfaces';
import { getDayOfChallenge } from '../utils/getDayOfChallenge';
import ChallengeModel, { ChallengeDocument } from '../models/challenge.model';

export const getCurrentTask = async (
  challengeId: string,
  currentDate: Date = new Date(), // to avoid date dependence on tests
): Promise<ActualTask | null> => {
  const challenge: ChallengeDocument = await ChallengeModel.findById(
    challengeId,
  );

  if (!challenge) {
    return null;
  }

  const dayOfChallenge: number = getDayOfChallenge(
    challenge.startDate,
    currentDate,
  );

  const task: Task = challenge.tasksOrder.get(`${dayOfChallenge + 1}`);
  const status: Status = challenge.tasksStatus[task._id];

  return {
    ...task,
    status,
  };
};
