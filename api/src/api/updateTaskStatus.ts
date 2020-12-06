import { StatusState } from '../constants';
import { Challenge, Status } from '../interfaces';

export const updateTaskStatus = (
  challengeId: string,
  allChallenges: Challenge[],
  taskId: string,
  completed?: boolean,
): Map<string, Status> => {
  const currentChallenge: Challenge = allChallenges.find(
    (challenge) => challenge._id === challengeId,
  );

  if (!currentChallenge) {
    return null;
  }

  const { tasksStatus } = currentChallenge;

  const newTasksStatus: Map<string, Status> = new Map({
    ...tasksStatus,
    [taskId]: {
      state: completed ? StatusState.SUCCESS : StatusState.FAILURE,
      updated: new Date(),
    },
  });

  return newTasksStatus;
};
