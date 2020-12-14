import * as React from 'react';

import Checkbox from '../../../components/common/checkbox';

import styles from './index.scss';

const CurrentTask: React.FC = () => {
  const [checked, setChecked] = React.useState(false);
  const handleComplete = (): void => {
    console.log('complete');
    setChecked(true);
  };

  return (
    <div className={styles.currentTask} onClick={handleComplete}>
      <div className={styles.taskStatus}>
        <Checkbox checked={checked} />
      </div>
      <div className={styles.taskDescription}>Current tasks</div>
      <div className={styles.taskUpdated}>Date</div>
    </div>
  );
};

export default CurrentTask;
