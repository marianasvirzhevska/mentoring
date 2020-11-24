import express, { Request, Response } from 'express';
import { Challenge } from 'src/interfaces';
import { startNewChallenge } from '../api';
import { tasks } from '../tasks.json';
import { achievements } from '../achievements.json';
import { errorHandler } from '../utils/errorHandler';
import {
  SERVER_UNEXPECTED_ERROR,
  CHALLENGE_SUCCESSFULLY_CREATED,
} from '../constants/messages';
import { tasksJobs } from '../jobs/tasksJobs';
import { achievementsJob } from '../jobs/achievementsJob';

const router = express.Router();

router.get('/new-challenge', (request: Request, response: Response) => {
  console.log(`request ${JSON.stringify(request.headers.authorization)}`);
  const newChallenge: Challenge = startNewChallenge(tasks, achievements, 5);

  if (!newChallenge) {
    errorHandler(SERVER_UNEXPECTED_ERROR, response, null);
  } else {
    response.json({
      status: 200,
      message: CHALLENGE_SUCCESSFULLY_CREATED,
      challenge: newChallenge.id,
    });
    response.end();
  }

  tasksJobs(newChallenge.id); // schedule auto expiration for each task in new challenge
  achievementsJob(newChallenge.id); // schedule achievements status calculation at the end of challenge
});

export default router;
