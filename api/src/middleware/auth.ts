import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from 'config';

const secret = config.get('secret');

export const passportMiddleware = (): void => {
  passport.use(
    new Strategy(
      {
        secretOrKey: secret,
        jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token'),
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      },
    ),
  );
};
