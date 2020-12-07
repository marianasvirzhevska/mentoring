import { Status } from './status.interface';

export interface Achievement {
  _id: string;
  description: string;
  image: string;
  checkComplete?: (taskStatus: Map<string, Status>) => Status;
}
