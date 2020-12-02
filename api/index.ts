/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import socketIo from 'socket.io';
import cors from 'cors';
import config from 'config';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import { databaseConnect } from './src/db/connect';
import challengeRouter from './src/routes/challenges';
import tasksRouter from './src/routes/tasks';
import achievementsRouter from './src/routes/achievements';
import loginRouter from './src/routes/login';
import {
  updateTaskStatus,
  calculateAchievementsStatus,
  setupPassport,
} from './src/api';
import { Achievement, Challenge, Status } from './src/interfaces';
import { passportMiddleware } from './src/middleware/auth';

const { url } = config.get('clientConfig');
const { port: serverPort } = config.get('serverConfig');

databaseConnect();

const app = express();
app.use(cors());

app.use(cookieParser());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

/* app.use(passport.initialize());
app.use(passport.session()); */

passportMiddleware();
setupPassport();
const server = http.createServer(app);

const io = new socketIo.Server(server, {
  cors: {
    origin: url,
    credentials: true,
  },
});

io.on('connect', (socket) => {
  console.log('socket.io connected');

  let achStatus: Record<string, Status> | null = null;
  socket.on('mark task completed', (data) => {
    const { challengeId, currentTaskId, completed } = data;
    const taskStatus: Record<string, Status> = updateTaskStatus(
      challengeId,
      [] as Challenge[],
      currentTaskId,
      completed,
    );

    achStatus = calculateAchievementsStatus([] as Achievement[], taskStatus);
  });

  if (!achStatus) {
    socket.emit('update achievements', { achievements: achStatus });
  }
});

app.use(
  '/user',
  passport.authenticate('jwt', { session: false }),
  challengeRouter,
);

/* app.use(challengeRouter); */
app.use(tasksRouter);
app.use(achievementsRouter);
app.use(loginRouter);
server.listen(serverPort, () =>
  console.log(`Server is running on port: ${serverPort}`),
);
