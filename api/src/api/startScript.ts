import bcrypt from 'bcrypt';
import UserModel from '../models/user.model';
import AchievementModel from '../models/achievement.model';
import TaskModel from '../models/task.model';
import { achievements } from '../achievements.json';
import { tasks } from '../tasks.json';
import { databaseConnect } from '../db/connect';

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

databaseConnect();

startScript();
