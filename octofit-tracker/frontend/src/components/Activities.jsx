import { useEffect, useState } from 'react'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const API_HOST = CODESPACE_NAME && CODESPACE_NAME.trim()
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'
const API_ROOT = `${API_HOST}/api`
// Full endpoint example: https://${CODESPACE_NAME}-8000.app.github.dev/api/activities

function normalizeResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (payload?.data && Array.isArray(payload.data)) return payload.data
  if (payload?.items && Array.isArray(payload.items)) return payload.items
  if (payload?.results && Array.isArray(payload.results)) return payload.results
  return []
}

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchActivities() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${API_ROOT}/activities`)
        if (!response.ok) {
          throw new Error(`Failed to load activities: ${response.status}`)
        }

        const json = await response.json()
        setActivities(normalizeResponse(json))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  return (
    <div className="container py-4">
      <h1 className="mb-3">Activities</h1>
      <p className="text-muted">Browse logged activity sessions and see your latest training progress.</p>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="alert alert-info">Loading activities...</div>
      ) : activities.length === 0 ? (
        <div className="alert alert-warning">No activities found yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity._id || activity.id || index}>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 small text-muted">
        API endpoint: <code>{`${API_ROOT}/activities`}</code>
      </div>
    </div>
  )
}

export default Activities
