import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

app.get('/api/leaderboard', (_req, res) => {
  res.json([
    { name: 'Nova', points: 2840 },
    { name: 'Atlas', points: 2410 },
    { name: 'Suri', points: 2180 },
  ]);
});

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed', error);
  }
}

connectToDatabase();

app.listen(port, () => {
  console.log(`OctoFit API running on http://localhost:${port}`);
});
