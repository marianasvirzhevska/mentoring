import { ONE_DAY } from '../constants';

export const getDayOfChallenge = (
  startDate: Date,
  currentDate: Date,
): number => {
  if (Number(currentDate) < Number(startDate)) {
    return;
  }

  const differenceMs = Math.abs(Number(startDate) - Number(currentDate));

  return Math.round(differenceMs / ONE_DAY);
};
