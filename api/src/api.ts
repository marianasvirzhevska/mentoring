import { Challenge, Task, ActualTask, ActualAchievement, ArchiveItem } from './interfaces';
import { StatusState } from './constants';

export function getDayOfChallenge(startDate: Date, currentDate: Date): number {
  if (Number(currentDate) < Number(startDate)) {
    return;
  }

  const ONE_DAY = 1000 * 60 * 60 * 24;
  const differenceMs = Math.abs(Number(startDate) - Number(currentDate));

  return Math.round(differenceMs / ONE_DAY);
}

export function getCurrentTask(
  challengeId: string,
  allChallenges: Challenge[],
  currentDate: Date, // to avoid date dependence on tests
): ActualTask | null {
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
  const task: Task = currentChallenge.tasksOrder[dayOfChallenge];

  return ({
    ...task,
    status: { state: StatusState.PENDING } 
  })
}

export function getAchievements(
  challengeId: string,
  allChallenges: Challenge[]
  ): ActualAchievement[] | null {
    const currentChallenge: Challenge = allChallenges.find(
      (challenge) => challenge.id === challengeId,
    );
  
    if (!currentChallenge) {
      return null;
    }

    return currentChallenge.actualAchievements;
}

export function getTaskArchive(
  challengeId: string,
  allChallenges: Challenge[]
): ArchiveItem[] | null {
  const challenge: Challenge = allChallenges.find(
    (challenge) => challenge.id === challengeId,
  );

  if (!challenge) {
    return null;
  }

  return challenge.archiveTasks;
}
