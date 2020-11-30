import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { UserModel } from '../models';
import AchievementModel from '../models/achievement.model';
import TaskModel from '../models/task.model';
import { achievements } from '../achievements.json';
import { tasks } from '../tasks.json';

const databaseUrl = 'mongodb://localhost:27017/challenge-app'; // TODO: move to env.config

const setInitialAchievements = (): void => {
  try {
    AchievementModel.collection.insertMany([...achievements]);
    console.info('Initial achievements were successfully stored.');
  } catch (error) {
    console.error(error);
  }
};

const setInitialTasks = (): void => {
  try {
    TaskModel.collection.insertMany([...tasks]);
    console.info('Initial tasks were successfully stored.');
  } catch (error) {
    console.error(error);
  }
};

const setInitialUser = (): void => {
  const defaultUser = {
    firstName: 'Moris',
    lastName: 'Owe',
    email: 'moris.owe@mail.com',
    password: 'password1',
  };

  const databaseUser = new UserModel(defaultUser);

  bcrypt.hash(defaultUser.password, 10, (error, hash) => {
    databaseUser.password = hash;

    if (error) {
      console.error('Error occurred. Try again later', error);
      return;
    }

    databaseUser.save((error) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log('Default user was successfully stored.', defaultUser);
    });
  });
};

const startScript = (): void => {
  setInitialAchievements();
  setInitialTasks();
  setInitialUser();
};

mongoose
  .connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => startScript())
  .catch((error) => console.error('Error. MongoDB not connected.', error));
