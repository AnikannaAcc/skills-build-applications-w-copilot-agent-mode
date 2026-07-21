import { useEffect, useState } from 'react'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const API_HOST = CODESPACE_NAME && CODESPACE_NAME.trim()
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'
const API_ROOT = `${API_HOST}/api`
// Full endpoint example: https://${CODESPACE_NAME}-8000.app.github.dev/api/teams

function normalizeResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (payload?.data && Array.isArray(payload.data)) return payload.data
  if (payload?.items && Array.isArray(payload.items)) return payload.items
  if (payload?.results && Array.isArray(payload.results)) return payload.results
  return []
}

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchTeams() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${API_ROOT}/teams`)
        if (!response.ok) {
          throw new Error(`Failed to load teams: ${response.status}`)
        }

        const json = await response.json()
        setTeams(normalizeResponse(json))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  return (
    <div className="container py-4">
      <h1 className="mb-3">Teams</h1>
      <p className="text-muted">Review your teams, member counts, and goals for the next sprint.</p>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="alert alert-info">Loading teams...</div>
      ) : teams.length === 0 ? (
        <div className="alert alert-warning">No teams have been created yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Members</th>
                <th>Goal</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr key={team._id || team.id || index}>
                  <td>{team.name}</td>
                  <td>{team.members}</td>
                  <td>{team.goal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 small text-muted">
        API endpoint: <code>{`${API_ROOT}/teams`}</code>
      </div>
    </div>
  )
}

export default Teams
