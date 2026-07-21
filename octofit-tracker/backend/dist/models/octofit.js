"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
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
exports.User = mongoose_1.default.model('User', userSchema);
exports.Team = mongoose_1.default.model('Team', teamSchema);
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
exports.LeaderboardEntry = mongoose_1.default.model('LeaderboardEntry', leaderboardSchema);
exports.Workout = mongoose_1.default.model('Workout', workoutSchema);
