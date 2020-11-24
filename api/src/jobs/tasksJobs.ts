import * as schedule from 'node-schedule';
import { Challenge } from '../interfaces';
import { updateTaskStatus } from '../api';

export const tasksJobs = (challengeId: string): void => {
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [0, new schedule.Range(0, 6)];
  rule.hour = 0;
  rule.minute = 0;

  const updateStatus = () => {
    // TODO: Implement method when DB will be implemented
    return updateTaskStatus(challengeId, [] as Challenge[], 'taskId');
  };

  schedule.scheduleJob(rule, updateStatus);
};
