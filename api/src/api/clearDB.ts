/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import mongoose, { connection } from 'mongoose';

const databaseUrl = 'mongodb://localhost:27017/challenge-app';

export const connectDatabase = () =>
  mongoose
    .connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('Error. MongoDB not connected.', error));

export const dropDatabase = () => {
  connection.collections['Tasks'].drop(function (error) {
    if (error) {
      console.error(error);
      return;
    }

    console.log('Tasks collection dropped');
  });

  connection.collections['Achievements'].drop(function (error) {
    if (error) {
      console.error(error);
      return;
    }

    console.log('Achievements collection dropped');
  });

  connection.collections['Challenges'].drop(function (error) {
    if (error) {
      console.error(error);
      return;
    }

    console.log('Challenges collection dropped');
  });

  connection.collections['Users'].drop(function (error) {
    if (error) {
      console.error(error);
      return;
    }

    console.log('Users collection dropped');
  });

  mongoose.connection.db.dropDatabase();
};
