import express, { Request, Response } from 'express';
import { Task, ArchiveItem, Challenge } from '../interfaces';
import { getCurrentTask, getTaskArchive } from '../api';
import { errorHandler } from '../utils/errorHandler';
import { SERVER_UNEXPECTED_ERROR } from '../constants/messages';

const router = express.Router();

export const getCurrentTaskRoute = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const { challenge_id } = request.body;
  const currentTask: Task = await getCurrentTask(challenge_id);

  if (!currentTask) {
    errorHandler(SERVER_UNEXPECTED_ERROR, response, null);
  } else {
    response.json({
      status: 200,
      currentTask: currentTask,
    });
    response.end();
  }
};

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
