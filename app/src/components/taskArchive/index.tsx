import * as React from 'react';
import { Link } from 'react-router-dom';

import Checkbox from '../common/checkbox';

import styles from './index.scss';

const TaskArchive: React.FC = () => {
  return (
    <div className={styles.archiveRoot}>
      <div className={styles.container}>
        <h1 className={styles.title}>Tasks Archive</h1>
        <ul className={styles.tasksList}>
          {[1, 2, 3, 4].map((element) => (
            <li key={element} className={styles.taskItem}>
              <div>
                <Checkbox />
              </div>
              <p>{element}</p>
            </li>
          ))}
        </ul>
        <Link to="/challenge" className={styles.arrowBack}>
          Back
        </Link>
      </div>
    </div>
  );
};

export default TaskArchive;
