import { Task } from './task.interface';
import { Status } from './status.interface';
import { ChallengeState } from '../constants';

export interface Challenge {
  id: string;
  state: ChallengeState;
  startDate: Date;
  tasksOrder: Task[];
  tasksStatus: Status;
  achievementsStatus: Status;
}
