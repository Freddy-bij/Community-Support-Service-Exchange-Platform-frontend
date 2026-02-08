import { FiUsers, FiTrendingUp, FiMessageCircle } from "react-icons/fi"

const Stat = ({ title, value, icon }: { title: string; value: string; icon: any }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
    <div className="p-3 rounded-md bg-green-50 text-green-600">
      {icon}
    </div>
    <div>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  </div>
)

const AdminDashboard = () => {
  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "member" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "helper" },
    { id: 3, name: "Carmen Lee", email: "carmen@example.com", role: "admin" },
  ]

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Overview of platform metrics</p>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat title="Total Users" value="1,234" icon={<FiUsers className="w-5 h-5" />} />
        <Stat title="Active Requests" value="92" icon={<FiTrendingUp className="w-5 h-5" />} />
        <Stat title="Messages" value="1,102" icon={<FiMessageCircle className="w-5 h-5" />} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Recent users</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-sm text-gray-600">Name</th>
                <th className="px-4 py-3 text-sm text-gray-600">Email</th>
                <th className="px-4 py-3 text-sm text-gray-600">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="px-4 py-3">{u.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default AdminDashboard
