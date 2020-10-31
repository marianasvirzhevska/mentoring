import { IStatus } from './status.interface';

export interface IAchievement {
  id: string;
  description: string;
  image: string;
  checkComplete(taskStatus: IStatus): IStatus;
}
