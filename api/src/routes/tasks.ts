import express, { Request, Response } from 'express';
import { Task, ArchiveItem, Challenge } from 'src/interfaces';
import { getCurrentTask, getTaskArchive } from '../api';
import { errorHandler } from '../utils/errorHandler';
import { SERVER_UNEXPECTED_ERROR } from '../constants/messages';

const router = express.Router();

router.get('/task', (request: Request, response: Response) => {
  const { challenge_id } = request.body;
  const currentTask: Task = getCurrentTask(challenge_id, [] as Challenge[]);

  if (!currentTask) {
    errorHandler(SERVER_UNEXPECTED_ERROR, response, null);
  } else {
    response.json({
      status: 200,
      currentTask: currentTask,
    });
    response.end();
  }
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
      status: 200,
      challenge: archivedTasks,
    });
    response.end();
  }
});

export default router;
