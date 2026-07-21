import mongoose from 'mongoose';

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

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
