import express from 'express';
import bodyParser from 'body-parser';
import challengeRouter from './src/routes/challenges';
import tasksRouter from './src/routes/tasks';
import achievementsRouter from './src/routes/achievements';

const port = 5000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(challengeRouter);
app.use(tasksRouter);
app.use(achievementsRouter);
app.listen(port, () => console.log(`Server is running on port: ${port}`));
