import { ArchiveItem, Task } from '../interfaces';
import { StatusState } from '../constants';
import ChallengeModel, { ChallengeDocument } from '../models/challenge.model';

export const getTaskArchive = async (
  challengeId: string,
): Promise<ArchiveItem[] | null> => {
  const challenge: ChallengeDocument = await ChallengeModel.findById(
    challengeId,
  );

  if (!challenge) {
    return null;
  }

  const pastTasks: ArchiveItem[] = [];

  for (const key in challenge.tasksStatus) {
    const value = challenge.tasksStatus.get(key);

    if (value.state !== StatusState.PENDING) {
      const task: Task = challenge.tasksOrder.get(key);
      const pastTask: ArchiveItem = {
        _id: task._id,
        description: task.description,
        status: value,
      };

      pastTasks.push(pastTask);
    }
  }

  return pastTasks;
};
