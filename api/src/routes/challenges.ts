import express, { Request, Response } from 'express';
import { Challenge } from 'src/interfaces';
import { startNewChallenge } from '../api';
import { errorHandler } from '../utils/errorHandler';
import {
  SERVER_UNEXPECTED_ERROR,
  CHALLENGE_SUCCESSFULLY_CREATED,
} from '../constants/messages';
import { tasksJobs } from '../jobs/tasksJobs';
import { achievementsJob } from '../jobs/achievementsJob';
import AchvModel from '../models/achievement.model';
import TaskModel from '../models/task.model';
import ChallengeModel from '../models/challenge.model';

const router = express.Router();

router.get('/new-challenge', async (request: Request, response: Response) => {
  console.log(`request ${JSON.stringify(request.headers.authorization)}`); // TODO: Add auth gard

  const tasks = await TaskModel.find({});
  const achievements = await AchvModel.find({});
  const newChallenge: Omit<Challenge, '_id'> = startNewChallenge(
    tasks,
    achievements,
    30,
    5,
  );

  const databaseChallenge = new ChallengeModel(newChallenge);

  databaseChallenge.save((error) => {
    if (error) {
      errorHandler(SERVER_UNEXPECTED_ERROR, response, error);
      throw error;
    } else {
      response.json({
        status: 200,
        message: CHALLENGE_SUCCESSFULLY_CREATED,
        challenge: databaseChallenge,
        challenge_1: newChallenge,
      });

      tasksJobs(databaseChallenge._id); // schedule auto expiration for each task in new challenge
      achievementsJob(databaseChallenge._id); // schedule achievements status calculation at the end of challenge

      response.end();
    }
  });
});

export default router;
