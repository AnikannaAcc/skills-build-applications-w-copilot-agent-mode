import { Link, Route, Routes } from 'react-router-dom'
import './App.css'

function HomePage() {
  return (
    <div className="card">
      <h1 className="hero-title">OctoFit Tracker</h1>
      <p className="hero-subtitle">
        A modern multi-tier fitness experience for logging activities, building teams,
        and competing on a live leaderboard.
      </p>
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

function LeaderboardPage() {
  return (
    <div className="card">
      <h1 className="hero-title">Leaderboard</h1>
      <p className="hero-subtitle">See the top performers across the OctoFit community.</p>
      <div className="panel">
        <p>1. Nova • 2,840 pts</p>
        <p>2. Atlas • 2,410 pts</p>
        <p>3. Suri • 2,180 pts</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="app-shell">
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </div>
  )
}

export default App
