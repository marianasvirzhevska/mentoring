import { Task } from './task.interface';
import { Status } from './status.interface';

export interface ActualTask extends Task {
  status: Status;
}
