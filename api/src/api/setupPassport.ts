import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import config from 'config';
import UserModel from '../models/user.model';
import {
  USER_NOT_FOUND,
  WRONG_PASSWORD,
  LOGGED_IN_SUCCESS_MESSAGE,
} from '../constants/messages';

const secret = config.get('secret');

export const setupPassport = (): void => {
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email: string, password: string, done): Promise<void> => {
        try {
          const user = await UserModel.findOne({ email });

          if (!user) {
            return done(null, false, { message: USER_NOT_FOUND });
          }

          const validate = await user.isValidPassword(password);

          if (!validate) {
            return done(null, false, { message: WRONG_PASSWORD });
          }

          return done(null, user, { message: LOGGED_IN_SUCCESS_MESSAGE });
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.use(
    new JWTStrategy(
      {
        secretOrKey: secret,
        jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token'),
      },
      async (token, done): Promise<void> => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      },
    ),
  );
};
