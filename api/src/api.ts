import {
  Challenge,
  Task,
  ActualTask,
  Achievement,
  ActualAchievement,
  ArchiveItem,
  Status,
} from './interfaces';
import { ChallengeState, StatusState } from './constants';

const REQUIRED_ACHIEVEMENTS_ID = ['4', '5']; // Should be selected for every challenge

export function getDayOfChallenge(startDate: Date, currentDate: Date): number {
  if (Number(currentDate) < Number(startDate)) {
    return;
  }

  const ONE_DAY = 1000 * 60 * 60 * 24;
  const differenceMs = Math.abs(Number(startDate) - Number(currentDate));

  return Math.round(differenceMs / ONE_DAY);
}

export function getRandomInt(number: number): number {
  return Math.floor(Math.random() * number) + 1;
}

export function getRandomOrders(value: number): number[] {
  const random: number[] = [];
  while (random.length < value) {
    const int = getRandomInt(value);
    if (!random.includes(int)) {
      random.push(int);
    }
  }

  return random;
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
  const task: Task = currentChallenge.tasksOrder[dayOfChallenge.toString()];
  const status: Status = currentChallenge.tasksStatus[task.id];

  return {
    ...task,
    status,
  };
}

export function getAchievements(
  challengeId: string,
  allChallenges: Challenge[],
): ActualAchievement[] | null {
  const currentChallenge: Challenge = allChallenges.find(
    (challenge) => challenge.id === challengeId,
  );

  if (!currentChallenge) {
    return null;
  }

  const achievements: ActualAchievement[] = currentChallenge.achievements.map(
    (element: Achievement) => ({
      id: element.id,
      description: element.description,
      image: element.image,
      status: currentChallenge.achievementsStatus[element.id],
    }),
  );

  return achievements;
}

export function getTaskArchive(
  challengeId: string,
  allChallenges: Challenge[],
  dateNow: Date, // to avoid date dependence on tests
): ArchiveItem[] | null {
  const challenge: Challenge = allChallenges.find(
    (challenge) => challenge.id === challengeId,
  );

  if (!challenge) {
    return null;
  }

  const pastTasks: ArchiveItem[] = [];

  for (const key in challenge.tasksStatus) {
    const value = challenge.tasksStatus[key];

    if (Number(value.updated) < Number(dateNow)) {
      const pastTask: ArchiveItem = {
        ...challenge.tasksOrder[key],
        status: value,
      };

      pastTasks.push(pastTask);
    }
  }

  return pastTasks;
}

export function startNewChallenge(
  tasks: Task[],
  achievementsList: Achievement[],
  duration = 30,
  achievements = duration / 6,
): Challenge {
  const tasksOrder: Record<string, Task> = getRandomOrders(duration).reduce(
    (accumulator, current: number) => {
      accumulator[tasks[current].id] = tasks[current];
      return accumulator;
    },
    {},
  );

  const tasksStatus: Record<string, Status> = {};

  for (const key in tasksOrder) {
    tasksStatus[key] = {
      state: StatusState.PENDING,
      updated: new Date(),
    };
  }

  const randomAchQty = achievements - REQUIRED_ACHIEVEMENTS_ID.length;
  const challengeAchievements: Achievement[] = getRandomOrders(
    randomAchQty,
  ).map((element: number) => {
    return achievementsList[element];
  });
  REQUIRED_ACHIEVEMENTS_ID.forEach((element) =>
    challengeAchievements.push(achievementsList[element]),
  );

  const achievementsStatus: Record<
    string,
    Status
  > = challengeAchievements.reduce((accumulator, current: Achievement) => {
    accumulator[current.id] = {
      state: StatusState.PENDING,
      updated: new Date(),
    };
    return accumulator;
  }, {});

  const challenge: Challenge = {
    id: Date.now().toString(),
    state: ChallengeState.PROGRESS,
    startDate: new Date(),
    tasksOrder,
    tasksStatus,
    achievements: challengeAchievements,
    achievementsStatus,
  };

  return challenge;
}

export function calculateAchievementsStatus(
  achievementsList: Achievement[],
  tasksStatus: Record<string, Status>,
): Record<string, Status> {
  return achievementsList.reduce((accumulator, current: Achievement) => {
    accumulator[current.id] = current.checkComplete(tasksStatus);

    return accumulator;
  }, {});
}
