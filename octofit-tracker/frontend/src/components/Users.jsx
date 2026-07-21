import { useEffect, useState } from 'react'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const API_HOST = CODESPACE_NAME && CODESPACE_NAME.trim()
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'
const API_ROOT = `${API_HOST}/api`
// Full endpoint example: https://${CODESPACE_NAME}-8000.app.github.dev/api/users

function normalizeResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (payload?.data && Array.isArray(payload.data)) return payload.data
  if (payload?.items && Array.isArray(payload.items)) return payload.items
  if (payload?.results && Array.isArray(payload.results)) return payload.results
  return []
}

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${API_ROOT}/users`)
        if (!response.ok) {
          throw new Error(`Failed to load users: ${response.status}`)
        }

        const json = await response.json()
        setUsers(normalizeResponse(json))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="container py-4">
      <h1 className="mb-3">Users</h1>
      <p className="text-muted">View registered users and help identify who is leading the workout room.</p>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="alert alert-info">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="alert alert-warning">No user accounts are available.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id || user.id || index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 small text-muted">
        API endpoint: <code>{`${API_ROOT}/users`}</code>
      </div>
    </div>
  )
}

export default Users
