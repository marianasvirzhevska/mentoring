import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/login',
  async (request: Request, response: Response, next: NextFunction) => {
    passport.authenticate('login', async (error, user, info) => {
      try {
        if (error || !user) {
          const error = new Error('An error occurred.');

          return next(error);
        }

        request.login(user, { session: false }, async (error) => {
          if (error) return next(error);

          const body = {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          };
          const token = jwt.sign({ user: body }, 'TOP_SECRET'); // TODO: move secret to env config

          return response.json({ token });
        });
      } catch (error) {
        return next(error);
      }
    })(request, response, next);
  },
);

export default router;