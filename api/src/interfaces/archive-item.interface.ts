import { ITask } from './task.interface';
import { IStatus } from './status.interface';

export interface IArchiveItem extends ITask {
  status: IStatus;
}
