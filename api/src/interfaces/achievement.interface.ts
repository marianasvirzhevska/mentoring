import { Status } from './status.interface';

export interface Achievement {
  id: string;
  description: string;
  image: string;
  checkComplete(taskStatus: Status): Status;
}
