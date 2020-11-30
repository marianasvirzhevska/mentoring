import { Challenge, ActualTask, Task, Status } from '../interfaces';
import { getDayOfChallenge } from '../utils/getDayOfChallenge';

export const getCurrentTask = (
  challengeId: string,
  allChallenges: Challenge[],
  currentDate: Date = new Date(), // to avoid date dependence on tests
): ActualTask | null => {
  const currentChallenge: Challenge = allChallenges.find(
    (challenge) => challenge.id === challengeId,
  );

  if (!currentChallenge) {
    return null;
  }

  const dayOfChallenge: number = getDayOfChallenge(
    currentChallenge.startDate,
    currentDate,
  );
  const task: Task = currentChallenge.tasksOrder[dayOfChallenge.toString()];
  const status: Status = currentChallenge.tasksStatus[task.id];

  return {
    ...task,
    status,
  };
};
