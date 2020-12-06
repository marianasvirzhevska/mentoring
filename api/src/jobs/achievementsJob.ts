import * as schedule from 'node-schedule';
import socketIo from 'socket.io';
import { calculateAchievementsStatus } from '../api';

export const achievementsJob = (
  challengeId: string,
  io: socketIo.Server,
  challengeDuration = 30,
): schedule.Job => {
  const rule = `0 0 ${challengeDuration} * *`;

  const updateStatus = () => {
    return calculateAchievementsStatus(challengeId, io);
  };

  return schedule.scheduleJob(rule, updateStatus);
};
