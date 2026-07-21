import { useEffect, useState } from 'react'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const API_HOST = CODESPACE_NAME && CODESPACE_NAME.trim()
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'
const API_ROOT = `${API_HOST}/api`
// Full endpoint example: https://${CODESPACE_NAME}-8000.app.github.dev/api/leaderboard

function normalizeResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (payload?.data && Array.isArray(payload.data)) return payload.data
  if (payload?.items && Array.isArray(payload.items)) return payload.items
  if (payload?.results && Array.isArray(payload.results)) return payload.results
  return []
}

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${API_ROOT}/leaderboard`)
        if (!response.ok) {
          throw new Error(`Failed to load leaderboard: ${response.status}`)
        }

        const json = await response.json()
        setEntries(normalizeResponse(json))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  const sortedEntries = [...entries].sort((a, b) => (b.points || 0) - (a.points || 0))

  return (
    <div className="container py-4">
      <h1 className="mb-3">Leaderboard</h1>
      <p className="text-muted">Track the strongest performers and top teams across OctoFit.</p>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="alert alert-info">Loading leaderboard...</div>
      ) : sortedEntries.length === 0 ? (
        <div className="alert alert-warning">No leaderboard entries available.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Points</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {sortedEntries.map((entry, index) => (
                <tr key={entry._id || entry.id || index}>
                  <td>{index + 1}</td>
                  <td>{entry.name}</td>
                  <td>{entry.points}</td>
                  <td>{entry.team}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 small text-muted">
        API endpoint: <code>{`${API_ROOT}/leaderboard`}</code>
      </div>
    </div>
  )
}

export default Leaderboard
