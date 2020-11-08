import { Achievement } from './achievement.interface';

export type ActualAchievement = Omit<Achievement, 'checkComplete'>;
