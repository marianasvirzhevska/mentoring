import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from 'config';

import { INTERNAL_SERVER_ERROR } from '../constants/messages';
import { errorHandler } from '../utils/errorHandler';

const router = express.Router();

router.post(
  '/api/login',
  async (request: Request, response: Response, next: NextFunction) => {
    passport.authenticate('login', async (error, user, info) => {
      try {
        if (error || !user) {
          errorHandler(info.message, response, null, 401);
          return next(error);
        }

        request.login(user, { session: false }, async (error) => {
          if (error) {
            errorHandler(INTERNAL_SERVER_ERROR, response, error);
            return next(error);
          }

          const secret = config.get('secret');
          const body = { _id: user._id, email: user.email };
          const token = jwt.sign({ user: body }, secret);

          return response.json({ token });
        });
      } catch (error) {
        return next(error);
      }
    })(request, response, next);
  },
);

export default router;
