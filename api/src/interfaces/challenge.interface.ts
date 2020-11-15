import { Task } from './task.interface';
import { Status } from './status.interface';
import { Achievement } from './achievement.interface';
import { ChallengeState } from '../constants';

export interface Challenge {
  id: string;
  state: ChallengeState;
  startDate: Date;
  tasksOrder: Record<string, Task>;
  tasksStatus: Record<string, Status>;
  achievements: Achievement[],
  achievementsStatus: Record<string, Status>;
}
