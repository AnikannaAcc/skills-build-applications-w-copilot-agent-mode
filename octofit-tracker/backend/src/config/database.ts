import mongoose from 'mongoose';

const connectionString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(connectionString);
  return mongoose.connection;
}

export default connectToDatabase;
