import { useEffect, useState } from 'react'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const API_HOST = CODESPACE_NAME && CODESPACE_NAME.trim()
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'
const API_ROOT = `${API_HOST}/api`

function normalizeResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (payload?.data && Array.isArray(payload.data)) return payload.data
  if (payload?.items && Array.isArray(payload.items)) return payload.items
  if (payload?.results && Array.isArray(payload.results)) return payload.results
  return []
}

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchWorkouts() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${API_ROOT}/workouts`)
        if (!response.ok) {
          throw new Error(`Failed to load workouts: ${response.status}`)
        }

        const json = await response.json()
        setWorkouts(normalizeResponse(json))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [])

  return (
    <div className="container py-4">
      <h1 className="mb-3">Workouts</h1>
      <p className="text-muted">Review workout plans and intensity information for each session.</p>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="alert alert-info">Loading workouts...</div>
      ) : workouts.length === 0 ? (
        <div className="alert alert-warning">No workouts have been defined yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Duration</th>
                <th>Intensity</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, index) => (
                <tr key={workout._id || workout.id || index}>
                  <td>{workout.title}</td>
                  <td>{workout.durationMinutes} min</td>
                  <td>{workout.intensity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 small text-muted">
        API endpoint: <code>{`${API_ROOT}/workouts`}</code>
      </div>
    </div>
  )
}

export default Workouts
