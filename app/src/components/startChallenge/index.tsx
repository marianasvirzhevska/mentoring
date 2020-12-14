import * as React from 'react';
import Button from '@material-ui/core/Button';

import styles from './index.scss';

const StartChallenge: React.FC = () => {
  const handleStart = (): void => {
    console.log('start');
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Start challenge</h1>
      <h4 className={styles.subTitle}>Small steps</h4>
      <div className={styles.buttonCover}>
        <Button variant="contained" color="primary" onClick={handleStart}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default StartChallenge;
