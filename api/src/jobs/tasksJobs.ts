import * as schedule from 'node-schedule';
import { Challenge } from '../interfaces';
import { updateTaskStatus } from '../api';

export const tasksJobs = (
  challengeId: string,
  allChallenges: Challenge[], // will be removed after DB will be implemented
  taskId: string,
): schedule.Job => {
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [0, new schedule.Range(0, 6)];
  rule.hour = 0;
  rule.minute = 0;

  //   TODO: implement when the DB will be ready
  const updateStatus = () =>
    updateTaskStatus(challengeId, allChallenges, taskId);

  return schedule.scheduleJob(rule, () => updateStatus);
};
