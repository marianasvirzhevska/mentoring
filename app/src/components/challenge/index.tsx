import * as React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  requestWithToken,
  Methods,
  getFromStorage,
  setStorage,
} from '../../utils';
import { Challenge } from '../../interfaces';

import { ChallengeComponent } from './challengeComponent';

import styles from './index.scss';

const ChallengePage: React.FC = () => {
  const storedChallengeId = getFromStorage('challengeId');
  const [challenge, setChallenge] = React.useState<Challenge | string | null>(
    storedChallengeId,
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleStart = (): void => {
    setLoading(true);

    requestWithToken('/api/new-challenge', Methods.GET)
      .then((res) => res.json())
      .then(({ challenge }) => {
        setChallenge(challenge._id);
        setStorage('challengeId', challenge._id);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h4">
          Greetings traveller!
        </Typography>
        {loading && <CircularProgress />}
        {challenge && !loading ? (
          <ChallengeComponent challenge={challenge} />
        ) : (
          <Button variant="contained" color="primary" onClick={handleStart}>
            Start
          </Button>
        )}
      </Container>
    </div>
  );
};

export default ChallengePage;
