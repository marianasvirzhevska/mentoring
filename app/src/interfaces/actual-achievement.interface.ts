import { Achievement } from './achievement.interface';
import { Status } from './status.interface';

export interface ActualAchievement extends Omit<Achievement, 'checkComplete'> {
  status: Status;
}
