import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/octofit';
import { connectToDatabase } from '../config/database';

const router = Router();

router.get('/users', async (_req, res) => {
  await connectToDatabase();
  const users = await User.find({}).lean();
  res.json(users);
});

router.post('/users', async (req, res) => {
  await connectToDatabase();
  const user = await User.create(req.body);
  res.status(201).json(user);
});

router.get('/teams', async (_req, res) => {
  await connectToDatabase();
  const teams = await Team.find({}).lean();
  res.json(teams);
});

router.post('/teams', async (req, res) => {
  await connectToDatabase();
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

router.get('/activities', async (_req, res) => {
  await connectToDatabase();
  const activities = await Activity.find({}).lean();
  res.json(activities);
});

router.post('/activities', async (req, res) => {
  await connectToDatabase();
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

router.get('/leaderboard', async (_req, res) => {
  await connectToDatabase();
  const leaderboard = await LeaderboardEntry.find({}).lean();
  res.json(leaderboard);
});

router.get('/workouts', async (_req, res) => {
  await connectToDatabase();
  const workouts = await Workout.find({}).lean();
  res.json(workouts);
});

router.post('/workouts', async (req, res) => {
  await connectToDatabase();
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

export default router;
