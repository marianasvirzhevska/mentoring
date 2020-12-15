import * as React from 'react';

import styles from './achievementItem.scss';

interface AchievementProps {
  element: number;
}
export const AchievementItem: React.FC<AchievementProps> = ({ element }) => {
  return (
    <div className={styles.achievementItem}>
      <div className={styles.achievementImage}></div>
      <div className={styles.achievementDescription}>{element}</div>
    </div>
  );
};
