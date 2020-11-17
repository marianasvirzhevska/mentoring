import express, { Request, Response } from 'express';
import { Achievement, Challenge } from 'src/interfaces';
import { getAchievements } from '../api';
import { errorHandler } from '../utils/errorHandler';
import { SERVER_UNEXPECTED_ERROR } from '../constants/messages';

const router = express.Router();

router.get('/achievements', (request: Request, response: Response) => {
  const challenge_id = request.body.challenge_id;
  const achievements: Achievement[] = getAchievements(
    challenge_id,
    [] as Challenge[],
  );

  if (!achievements) {
    errorHandler(SERVER_UNEXPECTED_ERROR, response, null);
  } else {
    response.json({
      status: 'OK',
      challenge: achievements,
    });
    response.end();
  }
});

export default router;
