import * as schedule from 'node-schedule';
import { Status, Achievement } from '../interfaces';
import { calculateAchievementsStatus } from '../api';

export const achievementsJob = (
  challengeId: string,
  challengeDuration = 30,
): schedule.Job => {
  const rule = `0 0 ${challengeDuration} * *`;

  //  TODO: implement when the DB will be ready
  const updateStatus = () => {
    console.log(challengeId); // for future implementation with DB
    return calculateAchievementsStatus(
      [] as Achievement[],
      {} as Map<string, Status>,
    );
  };

  return schedule.scheduleJob(rule, updateStatus);
};
