import { Task } from './task.interface';
import { Status } from './status.interface';

export interface ArchiveItem extends Task {
  status: Status;
}
