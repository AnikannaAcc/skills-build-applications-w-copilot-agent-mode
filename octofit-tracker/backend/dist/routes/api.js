"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const octofit_1 = require("../models/octofit");
const database_1 = require("../config/database");
const router = (0, express_1.Router)();
router.get('/users', async (_req, res) => {
    await (0, database_1.connectToDatabase)();
    const users = await octofit_1.User.find({}).lean();
    res.json(users);
});
router.post('/users', async (req, res) => {
    await (0, database_1.connectToDatabase)();
    const user = await octofit_1.User.create(req.body);
    res.status(201).json(user);
});
router.get('/teams', async (_req, res) => {
    await (0, database_1.connectToDatabase)();
    const teams = await octofit_1.Team.find({}).lean();
    res.json(teams);
});
router.post('/teams', async (req, res) => {
    await (0, database_1.connectToDatabase)();
    const team = await octofit_1.Team.create(req.body);
    res.status(201).json(team);
});
router.get('/activities', async (_req, res) => {
    await (0, database_1.connectToDatabase)();
    const activities = await octofit_1.Activity.find({}).lean();
    res.json(activities);
});
router.post('/activities', async (req, res) => {
    await (0, database_1.connectToDatabase)();
    const activity = await octofit_1.Activity.create(req.body);
    res.status(201).json(activity);
});
router.get('/leaderboard', async (_req, res) => {
    await (0, database_1.connectToDatabase)();
    const leaderboard = await octofit_1.LeaderboardEntry.find({}).lean();
    res.json(leaderboard);
});
router.get('/workouts', async (_req, res) => {
    await (0, database_1.connectToDatabase)();
    const workouts = await octofit_1.Workout.find({}).lean();
    res.json(workouts);
});
router.post('/workouts', async (req, res) => {
    await (0, database_1.connectToDatabase)();
    const workout = await octofit_1.Workout.create(req.body);
    res.status(201).json(workout);
});
exports.default = router;
