import * as React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

import { requestWithToken, Methods } from '../../../utils';
import { ActualTask, Status } from '../../../interfaces';

import styles from './index.scss';

interface Props {
  challengeId: string;
}

const CurrentTask: React.FC<Props> = ({ challengeId }) => {
  const [checked, setChecked] = React.useState(false);
  const [task, setTask] = React.useState<ActualTask | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const handleComplete = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setChecked(event.target.checked);
  };

  const getState = (status: Status): boolean => {
    return status.state === 'success';
  };

  const getDate = (date: Date): string => {
    const today = new Date(date);
    return today.toISOString().substring(0, 10);
  };

  React.useEffect(() => {
    requestWithToken(`/api/task/${challengeId}`, Methods.GET)
      .then((res) => res.json())
      .then((data) => {
        const task: ActualTask = data.currentTask;
        setTask(task);
        setChecked(getState(task.status));
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {loading && <CircularProgress />}
      {task && !loading ? (
        <div className={styles.currentTask}>
          <div className={styles.taskStatus}>
            <Checkbox
              checked={checked}
              onChange={handleComplete}
              inputProps={{ 'aria-label': 'checkbox' }}
            />
          </div>
          <div className={styles.taskDescription}>{task.description}</div>
          <div className={styles.taskUpdated}>
            {task.status.state} - {getDate(task.status.updated)}
          </div>
        </div>
      ) : (
        <p>Can not get current task</p>
      )}
    </>
  );
};

export default CurrentTask;
