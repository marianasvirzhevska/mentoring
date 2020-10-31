import { ITask } from './task.interface';
import { IStatus } from './status.interface';

export interface IActualTask extends ITask {
  status: IStatus;
}
