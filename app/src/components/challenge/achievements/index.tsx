import * as React from 'react';

import { AchievementItem } from './achievementItem';
import styles from './index.scss';

const Achievements: React.FC = () => {
  return (
    <div className={styles.achievementsContainer}>
      {[1, 2, 3, 4, 5].map((element) => (
        <AchievementItem key={element} element={element} />
      ))}
    </div>
  );
};

export default Achievements;
