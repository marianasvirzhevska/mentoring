import socketIo from 'socket.io';
import * as schedule from 'node-schedule';
import { updateTaskStatus } from '../api';

export const tasksJobs = (challengeId: string, io: socketIo.Server): void => {
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [0, new schedule.Range(0, 6)];
  rule.hour = 0;
  rule.minute = 0;

  const updateStatus = () => {
    return updateTaskStatus(challengeId, null, io);
  };

  schedule.scheduleJob(rule, updateStatus);
};
