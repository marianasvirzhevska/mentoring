import * as React from 'react';
import { Achievement, Status } from '../../../interfaces';

import styles from './achievementItem.scss';

interface AchievementProps {
  element: Achievement;
  status?: Status;
}
export const AchievementItem: React.FC<AchievementProps> = ({
  element,
  status,
}) => {
  return (
    <div className={styles.achievementItem}>
      <div className={styles.achievementImage}>{status?.state}</div>
      <div className={styles.achievementDescription}>{element.description}</div>
    </div>
  );
};
