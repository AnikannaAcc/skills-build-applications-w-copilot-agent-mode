"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../config/database");
const octofit_1 = require("../models/octofit");
async function seedDatabase() {
    try {
        await (0, database_1.connectToDatabase)();
        console.log('Connected to octofit_db');
        await octofit_1.User.deleteMany({});
        await octofit_1.Team.deleteMany({});
        await octofit_1.Activity.deleteMany({});
        await octofit_1.LeaderboardEntry.deleteMany({});
        await octofit_1.Workout.deleteMany({});
        await octofit_1.User.insertMany([
            { name: 'Nia', email: 'nia@octofit.com', role: 'captain' },
            { name: 'Mateo', email: 'mateo@octofit.com', role: 'member' },
        ]);
        await octofit_1.Team.insertMany([
            { name: 'Velocity', members: 8, goal: 'Marathon prep' },
            { name: 'Summit', members: 6, goal: 'Strength cycle' },
        ]);
        await octofit_1.Activity.insertMany([
            { type: 'Run', durationMinutes: 35, date: '2026-07-21' },
            { type: 'Yoga', durationMinutes: 30, date: '2026-07-20' },
        ]);
        await octofit_1.LeaderboardEntry.insertMany([
            { name: 'Nova', points: 2840, team: 'Velocity' },
            { name: 'Atlas', points: 2410, team: 'Summit' },
            { name: 'Suri', points: 2180, team: 'Velocity' },
        ]);
        await octofit_1.Workout.insertMany([
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
