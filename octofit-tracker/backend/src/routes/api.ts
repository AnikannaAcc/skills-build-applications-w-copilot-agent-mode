import { Router } from 'express';

const router = Router();

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type Team = {
  id: string;
  name: string;
  members: number;
  goal: string;
};

type Activity = {
  id: string;
  type: string;
  durationMinutes: number;
  date: string;
};

type LeaderboardEntry = {
  id: string;
  name: string;
  points: number;
  team: string;
};

type Workout = {
  id: string;
  title: string;
  durationMinutes: number;
  intensity: string;
};

const users: User[] = [
  { id: 'user-1', name: 'Nia', email: 'nia@octofit.com', role: 'captain' },
  { id: 'user-2', name: 'Mateo', email: 'mateo@octofit.com', role: 'member' },
];

const teams: Team[] = [
  { id: 'team-1', name: 'Velocity', members: 8, goal: 'Marathon prep' },
  { id: 'team-2', name: 'Summit', members: 6, goal: 'Strength cycle' },
];

const activities: Activity[] = [
  { id: 'activity-1', type: 'Run', durationMinutes: 35, date: '2026-07-21' },
  { id: 'activity-2', type: 'Yoga', durationMinutes: 30, date: '2026-07-20' },
];

const leaderboard: LeaderboardEntry[] = [
  { id: 'entry-1', name: 'Nova', points: 2840, team: 'Velocity' },
  { id: 'entry-2', name: 'Atlas', points: 2410, team: 'Summit' },
  { id: 'entry-3', name: 'Suri', points: 2180, team: 'Velocity' },
];

const workouts: Workout[] = [
  { id: 'workout-1', title: 'Tempo Interval', durationMinutes: 35, intensity: 'High' },
  { id: 'workout-2', title: 'Core Recovery', durationMinutes: 20, intensity: 'Low' },
];

router.get('/users/', (_req, res) => {
  res.json(users);
});

router.post('/users/', (req, res) => {
  const user = req.body as Partial<User>;
  const createdUser: User = {
    id: `user-${Date.now()}`,
    name: user.name ?? 'New User',
    email: user.email ?? 'new-user@octofit.com',
    role: user.role ?? 'member',
  };
  users.push(createdUser);
  res.status(201).json(createdUser);
});

router.get('/teams/', (_req, res) => {
  res.json(teams);
});

router.post('/teams/', (req, res) => {
  const team = req.body as Partial<Team>;
  const createdTeam: Team = {
    id: `team-${Date.now()}`,
    name: team.name ?? 'New Team',
    members: team.members ?? 0,
    goal: team.goal ?? 'New challenge',
  };
  teams.push(createdTeam);
  res.status(201).json(createdTeam);
});

router.get('/activities/', (_req, res) => {
  res.json(activities);
});

router.post('/activities/', (req, res) => {
  const activity = req.body as Partial<Activity>;
  const createdActivity: Activity = {
    id: `activity-${Date.now()}`,
    type: activity.type ?? 'Workout',
    durationMinutes: activity.durationMinutes ?? 0,
    date: activity.date ?? new Date().toISOString(),
  };
  activities.push(createdActivity);
  res.status(201).json(createdActivity);
});

router.get('/leaderboard/', (_req, res) => {
  res.json(leaderboard);
});

router.get('/workouts/', (_req, res) => {
  res.json(workouts);
});

router.post('/workouts/', (req, res) => {
  const workout = req.body as Partial<Workout>;
  const createdWorkout: Workout = {
    id: `workout-${Date.now()}`,
    title: workout.title ?? 'New Workout',
    durationMinutes: workout.durationMinutes ?? 0,
    intensity: workout.intensity ?? 'Medium',
  };
  workouts.push(createdWorkout);
  res.status(201).json(createdWorkout);
});

export default router;
