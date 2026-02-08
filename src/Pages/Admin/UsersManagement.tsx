import { useState } from "react"
import { FiEdit2, FiTrash2, FiMail } from "react-icons/fi"

const UsersManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "member", status: "active", joined: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "helper", status: "active", joined: "2024-01-20" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "member", status: "inactive", joined: "2024-01-10" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: "admin", status: "active", joined: "2024-01-05" },
    { id: 5, name: "David Brown", email: "david@example.com", role: "member", status: "active", joined: "2024-02-01" },
  ])

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id))
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
              <tr key={user.id} style={{ borderBottom: idx < users.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                <td style={{ padding: '16px 24px', fontWeight: '500' }}>{user.name}</td>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiMail size={16} /> {user.email}
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ padding: '4px 12px', backgroundColor: getRoleColor(user.role).bg, color: getRoleColor(user.role).text, fontSize: '12px', borderRadius: '9999px' }}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ padding: '4px 12px', backgroundColor: getStatusColor(user.status).bg, color: getStatusColor(user.status).text, fontSize: '12px', borderRadius: '9999px' }}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{user.joined}</td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#fef3c7', color: '#ca8a04', border: 'none', cursor: 'pointer' }}>
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#fee2e2', color: '#991b1b', border: 'none', cursor: 'pointer' }}
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
    </div>
  )
}

export default UsersManagement
