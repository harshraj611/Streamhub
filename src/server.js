const app = require('./app');
const env = require('./config/env');
const { connectDatabase, disconnectDatabase } = require('./config/database');

let server;

const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down server...`);

  if (server) {
    server.close();
  }

  await disconnectDatabase();
  process.exit(0);
};

const startServer = async () => {
  try {
    await connectDatabase(env.mongodbUri);

    server = app.listen(env.port, () => {
      console.log(`Streamhub API running on port ${env.port}`);
    });
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

startServer();