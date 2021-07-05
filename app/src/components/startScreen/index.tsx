import * as React from 'react';
import Button from '@material-ui/core/Button';

import { useHistory } from 'react-router-dom';

import styles from './index.scss';

const StartScreen: React.FC = () => {
  const history = useHistory();
  const [skip, setSkip] = React.useState(false);

  const handleSkip = (): void => {
    setSkip(true);
    history.push('./challenge');
  };

  React.useEffect(() => {
    if (!skip) {
      const timer = setTimeout(() => history.push('./challenge'), 2000);
      return () => clearTimeout(timer);
    }
  }, [skip]);

  return (
    <div className={styles.root}>
      <h1>Welcome!</h1>
      <Button variant="outlined" color="primary" onClick={handleSkip}>
        Skip
      </Button>
    </div>
  );
};

export default StartScreen;
