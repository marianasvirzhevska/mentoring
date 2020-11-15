import {
  Challenge,
  Task,
  ActualTask,
  Achievement,
  ActualAchievement,
  ArchiveItem,
  Status } from './interfaces';
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

export function getRandomInt(num: number): number {
  return Math.floor(Math.random() * num) + 1;
}

export function getRandomOrders(val: number): number[] {
  const random: number[] = [];
  while (random.length < val) {
    let int = getRandomInt(val);
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

  return ({
    ...task,
    status,
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

    const achievements: ActualAchievement[] = currentChallenge.achievements
      .map((el: Achievement) => ({
        id: el.id,
        description: el.description,
        image: el.image,
        status: currentChallenge.achievementsStatus[el.id]
      }))

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

  for (let key in challenge.tasksStatus) {
    const value = challenge.tasksStatus[key];

    if (Number(value.updated) < Number(dateNow)) {
      const pastTask: ArchiveItem = {
        ...challenge.tasksOrder[key],
        status: value,
      }

      pastTasks.push(pastTask);
    }
  }

  return pastTasks;
}

export function startNewChallenge(
  tasks: Task[],
  achievementsList: Achievement[],
  duration = 30,
  achievements = duration/6): Challenge {
    const tasksOrder: Record<string, Task> = getRandomOrders(duration)
      .reduce((acc, curr: number) => {
        acc[tasks[curr].id] = tasks[curr]
        return acc;
      }, {}
    );

    const tasksStatus: Record<string, Status> = {};

    for (let key in tasksOrder) {
      tasksStatus[key] = {
        state: StatusState.PENDING,
        updated: new Date()
      }
    }


    const randomAchQty = achievements - REQUIRED_ACHIEVEMENTS_ID.length;
    const challengeAchievements: Achievement[] = getRandomOrders(randomAchQty).map((el: number) => {
      return achievementsList[el];
    })
    REQUIRED_ACHIEVEMENTS_ID.forEach(el => challengeAchievements.push(achievementsList[el]))

    const achievementsStatus: Record<string, Status> = challengeAchievements
      .reduce((acc, curr: Achievement) => {
        acc[curr.id] = {
          state: StatusState.PENDING,
          updated: new Date(),
        }
        return acc;
      }, {}
    );

    const challenge: Challenge = {
      id: Date.now().toString(),
      state: ChallengeState.PROGRESS,
      startDate: new Date(),
      tasksOrder,
      tasksStatus,
      achievements: challengeAchievements,
      achievementsStatus,
    }

    return challenge
}

export function calculateAchievementsStatus(
  achievementsList: Achievement[],
  tasksStatus: Record<string, Status>,
): Record<string, Status> {
  return achievementsList
    .reduce((acc, curr: Achievement) => {
      acc[curr.id] = curr.checkComplete(tasksStatus);

      return acc;
    }, {});
}