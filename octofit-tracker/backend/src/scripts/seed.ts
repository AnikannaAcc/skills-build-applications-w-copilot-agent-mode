import mongoose from 'mongoose';
import { connectToDatabase } from '../config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/octofit';

// Seed the octofit_db database with data
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
