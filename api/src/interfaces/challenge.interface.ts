import { Task } from './task.interface';
import { Status } from './status.interface';
import { ChallengeState } from '../constants';
import { Achievement } from './achievement.interface';
import { ArchiveItem } from './archive-item.interface';
import { ActualAchievement } from './actual-achievement.interface';

export interface Challenge {
  id: string;
  state: ChallengeState;
  startDate: Date;
  tasksOrder?: Task[];
  tasksStatus: Status;
  achievementsStatus: Status;
  achievements?: Achievement[];
  actualAchievements?: ActualAchievement[];
  archiveTasks?: ArchiveItem[];
}
