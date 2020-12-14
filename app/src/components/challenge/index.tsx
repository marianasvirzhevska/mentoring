import * as React from 'react';
import { Link } from 'react-router-dom';

import CurrentTask from './currentTask';
import Achievements from './achievements';

import styles from './index.scss';

const Challenge: React.FC = () => {
  return (
    <div className={styles.root}>
      <p className={styles.greeting}>Greetings traveller!</p>
      <h1 className={styles.subTitle}>Current Challenge</h1>
      <CurrentTask />
      <Link to="tasks-archive" className={styles.archiveLink}>
        Tasks archive
      </Link>
      <Achievements />
    </div>
  );
};

export default Challenge;
