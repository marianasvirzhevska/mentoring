import express, { Request, Response } from 'express';
import { ArchiveItem, Challenge, Task } from 'src/interfaces';
import { getCurrentTask, getTaskArchive } from '../api';
import { errorHandler } from '../utils/errorHandler';
import { SERVER_UNEXPECTED_ERROR } from '../constants/messages';
import { tasksJobs } from '../jobs/tasksJobs';

const router = express.Router();

router.get('/task', (request: Request, response: Response) => {
  const challenge_id = request.body.challenge_id;
  const date = new Date();
  const currentTask: Task = getCurrentTask(
    challenge_id,
    [] as Challenge[],
    date,
  );

  if (!currentTask) {
    errorHandler(SERVER_UNEXPECTED_ERROR, response, null);
  } else {
    response.json({
      status: 'OK',
      challenge: currentTask,
    });
    response.end();
  }

  tasksJobs(challenge_id, [] as Challenge[], currentTask.id);
});

router.get('/task-archive', (request: Request, response: Response) => {
  const challenge_id = request.body.challenge_id;
  const archivedTasks: ArchiveItem[] = getTaskArchive(
    challenge_id,
    [] as Challenge[],
  );

  if (!archivedTasks) {
    errorHandler(SERVER_UNEXPECTED_ERROR, response, null);
  } else {
    response.json({
      status: 'OK',
      challenge: archivedTasks,
    });
    response.end();
  }
});

export default router;
