import { StatusState } from '../constants';
import { Challenge, Status } from '../interfaces';

export const updateTaskStatus = (
  challengeId: string,
  allChallenges: Challenge[],
  taskId: string,
  completed?: boolean,
): Record<string, Status> => {
  const currentChallenge: Challenge = allChallenges.find(
    (challenge) => challenge.id === challengeId,
  );

  if (!currentChallenge) {
    return null;
  }

  const { tasksStatus } = currentChallenge;

  const newTasksStatus: Record<string, Status> = {
    ...tasksStatus,
    [taskId]: {
      state: completed ? StatusState.SUCCESS : StatusState.FAILURE,
      updated: new Date(),
    },
  };

  return newTasksStatus;
};
