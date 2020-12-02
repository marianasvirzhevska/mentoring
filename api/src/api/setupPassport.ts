import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import config from 'config';
import UserModel, { userDocument } from '../models/user.model';
import { USER_NOT_FOUND, WRONG_PASSWORD } from '../constants/messages';

const secret = config.get('secret');

export const setupPassport = (): void => {
  passport.serializeUser((user: userDocument, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    UserModel.findById(id, function (error, user) {
      done(error, user);
    });
  });

  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email: string, password: string, done): Promise<void> => {
        try {
          const user: userDocument = await UserModel.findOne({ email });
          const isPasswordValid: boolean = await user.isValidPassword(password);

          if (!user) {
            return done(null, false, { message: USER_NOT_FOUND });
          }

          if (!isPasswordValid) {
            return done(null, false, { message: WRONG_PASSWORD });
          }

          return done(null, user);
        } catch (error) {
          done(error);
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
