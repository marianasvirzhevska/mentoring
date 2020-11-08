import { ChallengeState, StatusState } from './constants';
import { Challenge } from './interfaces';
import tasks from './tasks.json';
import achievements from './achievements.json';

export const actualAchievements = [...achievements.achievements].map(el => (
  {
    ...el,
    status: {state: StatusState.SUCCESS}
  })
);

export const archivedItems = [...tasks.tasks].map((el, i) => (
  {
    ...el,
    status: {state: StatusState.SUCCESS, updated: new Date(`October ${i++}, 2020 00:00:00`)}
  })
);

export const challengesMock: Challenge[] = [
  {
    id: '0',
    state: ChallengeState.SUCCESS,
    startDate: new Date('October 1, 2020 00:00:00'),
    tasksOrder: [...tasks.tasks],
    achievements: [...achievements.achievements],
    archiveTasks: [...archivedItems],
    tasksStatus: {
      state: StatusState.SUCCESS,
      updated: new Date('November 7, 2020 03:24:00'),
    },
    achievementsStatus: {
      state: StatusState.SUCCESS,
      updated: new Date('November 7, 2020 03:24:00'),
    },
  },
  {
    id: '1',
    state: ChallengeState.PROGRESS,
    startDate: new Date('November 1, 2020 00:00:00'),
    tasksOrder: [...tasks.tasks],
    achievements: [...achievements.achievements],
    actualAchievements: [...actualAchievements],
    tasksStatus: {
      state: StatusState.PENDING,
      updated: new Date('November 7, 2020 03:24:00'),
    },
    achievementsStatus: {
      state: StatusState.PENDING,
      updated: new Date('November 7, 2020 03:24:00'),
    },
  },
  {
    id: '32',
    state: ChallengeState.PROGRESS,
    startDate: new Date('December 1, 2020 00:00:00'),
    tasksOrder: [...tasks.tasks],
    achievements: [
      { id: "1", description: "Complete each task 10 days in a row", image: "" },
      { id: "2", description: "Complete five tasks before 10:00 AM", image: "" }, 
      { id: "3", description: "Complete 2 Monday's tasks", image: "" }, 
      { id: "4", description: "Complete half of the tasks", image: "" }, 
      { id: "5", description: "Complete all tasks", image: "" }
    ],
    tasksStatus: {
      state: StatusState.PENDING,
    },
    achievementsStatus: {
      state: StatusState.PENDING,
    },
  },
]