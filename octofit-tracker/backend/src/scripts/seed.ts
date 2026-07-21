import mongoose from 'mongoose';
import { connectToDatabase } from '../config/database';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'member' },
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: { type: Number, default: 0 },
  goal: { type: String, default: 'Build momentum' },
});

const activitySchema = new mongoose.Schema({
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  date: { type: String, required: true },
});

const leaderboardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  points: { type: Number, required: true },
  team: { type: String, required: true },
});

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  intensity: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
const Team = mongoose.model('Team', teamSchema);
const Activity = mongoose.model('Activity', activitySchema);
const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
const Workout = mongoose.model('Workout', workoutSchema);

async function seedDatabase() {
  try {
    await connectToDatabase();
    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    await Workout.deleteMany({});

    await User.insertMany([
      { name: 'Nia', email: 'nia@octofit.com', role: 'captain' },
      { name: 'Mateo', email: 'mateo@octofit.com', role: 'member' },
    ]);

    await Team.insertMany([
      { name: 'Velocity', members: 8, goal: 'Marathon prep' },
      { name: 'Summit', members: 6, goal: 'Strength cycle' },
    ]);

    await Activity.insertMany([
      { type: 'Run', durationMinutes: 35, date: '2026-07-21' },
      { type: 'Yoga', durationMinutes: 30, date: '2026-07-20' },
    ]);

    await LeaderboardEntry.insertMany([
      { name: 'Nova', points: 2840, team: 'Velocity' },
      { name: 'Atlas', points: 2410, team: 'Summit' },
      { name: 'Suri', points: 2180, team: 'Velocity' },
    ]);

    await Workout.insertMany([
      { title: 'Tempo Interval', durationMinutes: 35, intensity: 'High' },
      { title: 'Core Recovery', durationMinutes: 20, intensity: 'Low' },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
