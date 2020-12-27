import * as React from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { requestWithToken, Methods } from '../../utils';
import { ArchiveItem, Status } from '../../interfaces';

import styles from './index.scss';
interface MatchParams {
  challenge_id: string;
}

const TaskArchive: React.FC = () => {
  const { params } = useRouteMatch<MatchParams>();
  const challenge_id = params.challenge_id;

  const [loading, setLoading] = React.useState<boolean>(true);
  const [tasks, setTasks] = React.useState<ArchiveItem[] | null>(null);

  const getState = (status: Status): boolean => {
    return status.state === 'success';
  };

  const getDate = (date: Date): string => {
    const today = new Date(date);
    return today.toISOString().substring(0, 10);
  };

  React.useEffect(() => {
    requestWithToken(`/api/task-archive/${challenge_id}`, Methods.GET)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.archivedTasks);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.archiveRoot}>
      <div className={styles.container}>
        <Typography variant="h4" gutterBottom>
          Tasks Archive
        </Typography>
        {loading && <CircularProgress />}
        {tasks ? (
          <ul className={styles.tasksList}>
            {tasks.map((task: ArchiveItem) => (
              <li key={task._id} className={styles.taskItem}>
                <div>
                  <Checkbox checked={getState(task.status)} />
                </div>
                <p>
                  {task.description}
                  <i>{getDate(task.status.updated)}</i>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <Typography variant="h4" gutterBottom>
            No Tasks in Archive
          </Typography>
        )}
        <Link to="/challenge" className={styles.arrowBack}>
          Back
        </Link>
      </div>
    </div>
  );
};

export default TaskArchive;
