import { IAchievement } from './achievement.interface';

export type IActualAchievement = Omit<IAchievement, 'checkComplete'>;
