import { ITask } from './task.interface';
import { IStatus } from './status.interface';
import { ChallengeState } from '../constants';

export interface IChallenge {
  id: string;
  state: ChallengeState;
  startDate: Date;
  tasksOrder: ITask[];
  tasksStatus: IStatus;
  achievementsStatus: IStatus;
}
