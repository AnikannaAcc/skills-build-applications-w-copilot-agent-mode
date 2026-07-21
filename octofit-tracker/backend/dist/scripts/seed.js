"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../config/database");
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'member' },
});
const teamSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    members: { type: Number, default: 0 },
    goal: { type: String, default: 'Build momentum' },
});
const activitySchema = new mongoose_1.default.Schema({
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    date: { type: String, required: true },
});
const leaderboardSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    points: { type: Number, required: true },
    team: { type: String, required: true },
});
const workoutSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    intensity: { type: String, required: true },
});
const User = mongoose_1.default.model('User', userSchema);
const Team = mongoose_1.default.model('Team', teamSchema);
const Activity = mongoose_1.default.model('Activity', activitySchema);
const LeaderboardEntry = mongoose_1.default.model('LeaderboardEntry', leaderboardSchema);
const Workout = mongoose_1.default.model('Workout', workoutSchema);
async function seedDatabase() {
    try {
        await (0, database_1.connectToDatabase)();
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
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
    finally {
        await mongoose_1.default.disconnect();
    }
}
seedDatabase();
