import { Link, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const isCodespaceUnset = !CODESPACE_NAME || !CODESPACE_NAME.trim()

function HomePage() {
  return (
    <div className="card">
      <h1 className="hero-title">OctoFit Tracker</h1>
      <p className="hero-subtitle">
        A modern multi-tier fitness experience for logging activities, building teams,
        and competing on a live leaderboard.
      </p>

      {isCodespaceUnset && (
        <div className="alert alert-warning">
          <strong>Note:</strong> <code>VITE_CODESPACE_NAME</code> is not defined.
          The frontend is using a localhost fallback API host. Set this value in
          <code>.env.local</code> for the GitHub Codespaces backend URL.
        </div>
      )}

      <div className="grid">
        <div className="panel">
          <h2>Track progress</h2>
          <p>Log workouts and monitor trends across your training plan.</p>
        </div>
        <div className="panel">
          <h2>Lead the team</h2>
          <p>Create squads and keep your crew motivated with shared goals.</p>
        </div>
      </div>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div className="card">
      <h1 className="hero-title">Page not found</h1>
      <p className="hero-subtitle">The page you are looking for does not exist.</p>
    </div>
  )
}

function App() {
  return (
    <div className="app-shell">
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/activities">Activities</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/teams">Teams</Link>
        <Link to="/users">Users</Link>
        <Link to="/workouts">Workouts</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
