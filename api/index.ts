import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import socketIo from 'socket.io';
import cors from 'cors';
import config from 'config';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import { databaseConnect } from './src/db/connect';
import { router1 as challengeRouter } from './src/routes/challenges';
import tasksRouter from './src/routes/tasks';
import achievementsRouter from './src/routes/achievements';
import loginRouter from './src/routes/login';
import { setupPassport, initSocket } from './src/api';
import { passportMiddleware } from './src/middleware/auth';
const { port: serverPort } = config.get('serverConfig');

databaseConnect();

const app = express();
app.use(cors());

app.use(cookieParser());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

passportMiddleware();
setupPassport();

const server: http.Server = http.createServer(app);

const io: socketIo.Server = initSocket(server);

app.use(challengeRouter(io));
app.use(tasksRouter);
app.use(achievementsRouter);
app.use(loginRouter);
server.listen(serverPort, () =>
  console.log(`Server is running on port: ${serverPort}`),
);
