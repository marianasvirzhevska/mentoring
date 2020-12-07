/* eslint-disable @typescript-eslint/ban-ts-comment */
import express, { NextFunction } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import socketIo from 'socket.io';
import cors from 'cors';
import config from 'config';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

import { databaseConnect } from './src/db/connect';
import { router1 as challengeRouter } from './src/routes/challenges';
import tasksRouter from './src/routes/tasks';
import achievementsRouter from './src/routes/achievements';
import loginRouter from './src/routes/login';
import { setupPassport } from './src/api';
import { passportMiddleware } from './src/middleware/auth';

const secret = config.get('secret');
const url: string = config.get('clientConfig.url');
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

const io: socketIo.Server = new socketIo.Server(server, {
  cors: {
    origin: url,
    credentials: true,
  },
});

io.use(function (socket: socketIo.Socket, next: NextFunction) {
  //@ts-ignore
  const { query, token } = socket.handshake;

  if (query && token) {
    jwt.verify(token, secret, function (error, decoded) {
      // TODO: Implement function, when FE will be ready
      if (error) return next(new Error('Authentication error')); // TODO: Move message to constants
      //@ts-ignore
      socket.decoded = decoded;
      next();
    });
  } else {
    // next(new Error('Authentication error'));
    next();
  }
});

io.on('connect', (socket) => {
  console.log('socket.io connected');
  socket.on('mark task completed', function (data) {
    console.log(data);
  });
});

app.use(challengeRouter(io));
app.use(tasksRouter);
app.use(achievementsRouter);
app.use(loginRouter);
server.listen(serverPort, () =>
  console.log(`Server is running on port: ${serverPort}`),
);
