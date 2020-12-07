import { Task } from './task.interface';
import { Status } from './status.interface';
import { Achievement } from './achievement.interface';
import { ChallengeState } from '../constants';

export interface Challenge {
  _id: string;
  state: ChallengeState;
  startDate: Date;
  tasksOrder: Map<string, Task>;
  tasksStatus: Map<string, Status>;
  achievementsStatus: Map<string, Status>;
  achievements: Achievement[];
}
