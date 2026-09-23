const mongoose = require('mongoose');

const connectDatabase = async (mongodbUri) => {
  if (!mongodbUri) {
    throw new Error('MONGODB_URI is not defined');
  }

  await mongoose.connect(mongodbUri);
  console.log('MongoDB connected successfully');
};

const disconnectDatabase = async () => {
  await mongoose.connection.close();
};

module.exports = { connectDatabase, disconnectDatabase };