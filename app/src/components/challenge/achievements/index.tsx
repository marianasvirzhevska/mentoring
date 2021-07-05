import * as React from 'react';
import { Achievement, Status } from '../../../interfaces';

import { AchievementItem } from './achievementItem';
import styles from './index.scss';

interface Prop {
  achievements: Achievement[];
  statuses: Record<string, Status>;
}

const Achievements: React.FC<Prop> = ({ achievements, statuses }) => {
  return (
    <div className={styles.achievementsContainer}>
      {achievements.map((achievement: Achievement) => (
        <AchievementItem
          key={achievement._id}
          element={achievement}
          status={statuses[achievement._id]}
        />
      ))}
    </div>
  );
};

export default Achievements;
