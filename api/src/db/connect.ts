import mongoose from 'mongoose';
import config from 'config';

const { port, name, protocol, host } = config.get('dbConfig');
const databaseUrl = `${protocol}://${host}:${port}/${name}`;

export const databaseConnect = (): void => {
  mongoose
    .connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('Error. MongoDB not connected.', error));
};
