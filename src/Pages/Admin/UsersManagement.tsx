import { useEffect, useState } from "react"
import { FiTrash2, FiMail, FiLock } from "react-icons/fi"
import { getUsers, deleteUser, banUser } from "../../services/api"

const UsersManagement = () => {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await getUsers()
      setUsers(Array.isArray(data) ? data : data.data || [])
    } catch (err: any) {
      setError(err.message || "Failed to load users")
      console.error("Error fetching users:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        setActionLoading(id)
        await deleteUser(id)
        setUsers(users.filter(user => user._id !== id))
      } catch (err: any) {
        setError(err.message || "Failed to delete user")
      } finally {
        setActionLoading(null)
      }
    }
  }

  const handleBanUser = async (id: string) => {
    try {
      setActionLoading(id)
      await banUser(id, {
        banType: "temporary",
        reason: "Admin action",
        duration: 7,
      })
      // Refresh users list to reflect ban
      fetchUsers()
    } catch (err: any) {
      setError(err.message || "Failed to ban user")
    } finally {
      setActionLoading(null)
    }
  }

  const getStatusColor = (status: string) => {
    return status === 'active' ? { bg: '#dcfce7', text: '#15803d' } : { bg: '#fee2e2', text: '#991b1b' }
  }

  const getRoleColor = (role: string) => {
    switch(role) {
      case 'admin': return { bg: '#dbeafe', text: '#1e40af' }
      case 'helper': return { bg: '#fef3c7', text: '#92400e' }
      default: return { bg: '#f3f4f6', text: '#374151' }
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Users Management</h1>
          <p style={{ color: '#6b7280', margin: '8px 0 0 0' }}>Manage platform users and their roles</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '8px 16px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Total: <span style={{ fontWeight: 'bold' }}>{users.length}</span></p>
        </div>
      </div>

      {error && (
        <div style={{ backgroundColor: '#fee2e2', padding: '12px 16px', borderRadius: '8px', color: '#991b1b', marginBottom: '16px', fontSize: '14px' }}>
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: 'white', borderRadius: '8px' }}>
          <p style={{ color: '#6b7280' }}>Loading users...</p>
        </div>
      ) : users.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: 'white', borderRadius: '8px' }}>
          <p style={{ color: '#6b7280' }}>No users found</p>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <tr>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Name</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Email</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Role</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Status</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Joined</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id} style={{ borderBottom: idx < users.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                  <td style={{ padding: '16px 24px', fontWeight: '500' }}>{user.name || "N/A"}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiMail size={16} /> {user.email || "N/A"}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ padding: '4px 12px', backgroundColor: getRoleColor(user.role).bg, color: getRoleColor(user.role).text, fontSize: '12px', borderRadius: '9999px' }}>
                      {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Member"}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ padding: '4px 12px', backgroundColor: getStatusColor(user.isBanned ? 'banned' : 'active').bg, color: getStatusColor(user.isBanned ? 'banned' : 'active').text, fontSize: '12px', borderRadius: '9999px' }}>
                      {user.isBanned ? "Banned" : "Active"}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleBanUser(user._id)}
                        disabled={actionLoading === user._id}
                        style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#fef3c7', color: '#ca8a04', border: 'none', cursor: 'pointer', opacity: actionLoading === user._id ? 0.6 : 1 }}
                        title="Ban user"
                      >
                        <FiLock size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        disabled={actionLoading === user._id}
                        style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#fee2e2', color: '#991b1b', border: 'none', cursor: 'pointer', opacity: actionLoading === user._id ? 0.6 : 1 }}
                        title="Delete user"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default UsersManagement
