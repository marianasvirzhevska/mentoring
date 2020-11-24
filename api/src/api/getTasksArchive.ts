import { Challenge, ArchiveItem } from '../interfaces';
import { StatusState } from '../constants';

export const getTaskArchive = (
  challengeId: string,
  allChallenges: Challenge[],
): ArchiveItem[] | null => {
  const challenge: Challenge = allChallenges.find(
    (challenge) => challenge.id === challengeId,
  );

  if (!challenge) {
    return null;
  }

  const pastTasks: ArchiveItem[] = [];

  for (const key in challenge.tasksStatus) {
    const value = challenge.tasksStatus[key];

    if (value.state !== StatusState.PENDING) {
      const pastTask: ArchiveItem = {
        ...challenge.tasksOrder[key],
        status: value,
      };

      pastTasks.push(pastTask);
    }
  }

  return pastTasks;
};
