import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { requestWithToken, Methods } from '../../utils';

import { Challenge } from '../../interfaces';
import CurrentTask from './currentTask';
import Achievements from './achievements';

interface Prop {
  challenge: Challenge | string;
}

export const ChallengeComponent: React.FC<Prop> = ({
  challenge: challengeData,
}) => {
  const [challenge, setChallenge] = React.useState<Challenge | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (typeof challengeData === 'string') {
      requestWithToken(
        `/api/challenge/${JSON.parse(challengeData)}`,
        Methods.GET,
      )
        .then((res) => res.json())
        .then(({ challenge }) => {
          setChallenge(challenge);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    } else {
      setChallenge(challengeData);
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Current Challenge
      </Typography>
      {loading && <CircularProgress />}
      {challenge && !loading ? (
        <>
          <CurrentTask challengeId={challenge._id} />
          <Link to={`/tasks-archive/${challenge._id}`}>Tasks archive</Link>
          <Achievements
            achievements={challenge.achievements}
            statuses={challenge.achievementsStatus}
          />
        </>
      ) : null}
    </div>
  );
};
