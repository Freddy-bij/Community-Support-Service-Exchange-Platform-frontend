import { useEffect, useState } from "react"
import { FiMail, FiLock, FiUnlock, FiSearch, FiEdit2, FiX } from "react-icons/fi"
import { Loader2 } from "lucide-react"
import { getUsers, banUser, unbanUser, updateUserRole } from "../Serivices/adminService"

interface User {
  _id: string;
  id: string;
  name: string;
  email: string;
  role: string;
  isBanned: boolean;
  createdAt: string;
}

const UsersManagement = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [newRole, setNewRole] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await getUsers()
      setUsers(data)
    } catch (err: any) {
      console.error('Fetch users error:', err)
      setError(err.response?.data?.error || "Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  const handleToggleBan = async (userId: string, isBanned: boolean) => {
    try {
      setActionLoading(userId)
      setError("")
      if (isBanned) {
        await unbanUser(userId)
        setSuccess("User unbanned successfully")
      } else {
        await banUser(userId)
        setSuccess("User banned successfully")
      }
      setTimeout(() => setSuccess(""), 3000)
      fetchUsers()
    } catch (err: any) {
      console.error('Ban/Unban error:', err)
      setError(err.response?.data?.error || `Failed to ${isBanned ? 'unban' : 'ban'} user`)
    } finally {
      setActionLoading(null)
    }
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setNewRole(user.role)
    setShowEditModal(true)
  }

  const handleUpdateRole = async () => {
    if (!editingUser || !newRole) return
    try {
      setActionLoading(editingUser._id || editingUser.id)
      setError("")
      await updateUserRole(editingUser._id || editingUser.id, newRole)
      setSuccess("User role updated successfully")
      setTimeout(() => setSuccess(""), 3000)
      setShowEditModal(false)
      fetchUsers()
    } catch (err: any) {
      console.error('Update role error:', err)
      setError(err.response?.data?.error || "Failed to update user role")
    } finally {
      setActionLoading(null)
    }
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Users Management</h1>
          <p className="text-gray-500">Manage platform users and their roles</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Total: <span className="font-bold">{filteredUsers.length}</span></p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C7A7B] focus:border-transparent"
          />
        </div>
      </div>

      {success && (
        <div className="mb-6 flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <span className="text-green-600">✓</span>
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}

      {error && (
        <div className="mb-6 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <span className="text-red-600">⚠️</span>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl p-8 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-[#2C7A7B] mr-2" />
          <span className="text-gray-600">Loading users...</span>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center">
          <p className="text-gray-600">No users found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user._id || user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FiMail size={16} /> {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-blue-100 text-blue-700' : 
                      user.role === 'helper' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.isBanned ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {user.isBanned ? "Banned" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditUser(user)}
                        disabled={actionLoading === (user._id || user.id)}
                        className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 disabled:opacity-50 transition"
                        title="Edit user"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleToggleBan(user._id || user.id, user.isBanned)}
                        disabled={actionLoading === (user._id || user.id)}
                        className={`p-2 rounded-lg ${user.isBanned ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'} disabled:opacity-50 transition`}
                        title={user.isBanned ? "Unban user" : "Ban user"}
                      >
                        {actionLoading === (user._id || user.id) ? <Loader2 size={16} className="animate-spin" /> : user.isBanned ? <FiUnlock size={16} /> : <FiLock size={16} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Edit User Role</h3>
              <button onClick={() => setShowEditModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <FiX size={20} />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">User: <span className="font-semibold">{editingUser.name}</span></p>
              <p className="text-sm text-gray-600 mb-4">Email: {editingUser.email}</p>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C7A7B] focus:border-transparent"
              >
                <option value="user">User</option>
                <option value="helper">Helper</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateRole}
                disabled={actionLoading === (editingUser._id || editingUser.id)}
                className="flex-1 px-4 py-2.5 bg-[#2C7A7B] hover:bg-[#236565] text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
              >
                {actionLoading === (editingUser._id || editingUser.id) ? "Updating..." : "Update Role"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UsersManagement
