import { Task } from './task.interface';
import { Status } from './status.interface';
import { Achievement } from './achievement.interface';

export enum ChallengeState {
  PROGRESS = 'progress',
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export interface Challenge {
  _id: string;
  state: ChallengeState;
  startDate: Date;
  tasksOrder: Record<string, Task>;
  tasksStatus: Record<string, Status>;
  achievementsStatus: Record<string, Status>;
  achievements: Achievement[];
}
