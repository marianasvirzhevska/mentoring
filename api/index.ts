/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import socketIo from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import challengeRouter from './src/routes/challenges';
import tasksRouter from './src/routes/tasks';
import achievementsRouter from './src/routes/achievements';
import { updateTaskStatus, calculateAchievementsStatus } from './src/api';
import { Achievement, Challenge, Status } from './src/interfaces';

const port = 5000; // TODO: move to env.config
const databaseUrl = 'mongodb://localhost:27017/challenge-app'; // TODO: move to env.config
const app = express();

app.use(cors());

const server = http.createServer(app);

mongoose
  .connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('Error. MongoDB not connected.', error));

const io = new socketIo.Server(server, {
  cors: {
    origin: 'http://localhost:9000', // TODO: move url to env.config
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(challengeRouter);
app.use(tasksRouter);
app.use(achievementsRouter);
server.listen(port, () => console.log(`Server is running on port: ${port}`));
