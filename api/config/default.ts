export default {
  dbConfig: {
    port: 27017,
    name: 'challenge-app',
    protocol: 'mongodb',
    host: '127.0.0.1',
  },
  serverConfig: {
    port: 5000,
    protocol: 'http',
    host: '127.0.0.1',
  },
  clientConfig: {
    url: 'http://localhost:9000/',
  },
  secret: 'TOP_SECRET',
};
