import { FiUsers, FiAlertCircle, FiMessageCircle, FiCheckCircle } from "react-icons/fi"
import { Link } from "react-router"

const StatCard = ({ title, value, subtitle, icon }: { title: string; value: string; subtitle: string; icon: any }) => (
  <div className="bg-white rounded-xl p-6 flex items-center gap-4 shadow-sm">
    <div className="p-3 rounded-lg bg-[#2C7A7B] text-white">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
  </div>
)

const AdminDashboard = () => {
  const recentPosts = [
    { id: 1, title: "Need help with coding", author: "John Doe", status: "approved", date: "2024-02-08" },
    { id: 2, title: "Looking for design advice", author: "Jane Smith", status: "pending", date: "2024-02-08" },
    { id: 3, title: "React best practices", author: "Mike Johnson", status: "approved", date: "2024-02-07" },
  ]

  const pendingModerations = [
    { id: 1, type: "Post", title: "Inappropriate content", reportedBy: "User123", severity: "high" },
    { id: 2, type: "Comment", title: "Spam link", reportedBy: "User456", severity: "medium" },
  ]

  return (
    <div className="animate-fade-in">
      <main className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500">Platform Overview & Management</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#2C7A7B]"></div>
            <div>
              <p className="text-sm text-gray-500">Administrator</p>
              <p className="font-semibold">Admin Panel • Full Access</p>
            </div>
          </div>
          <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">
            View Settings
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value="1,234"
            subtitle="Active members"
            icon={<FiUsers />}
          />
          <StatCard
            title="Pending Moderation"
            value="5"
            subtitle="Awaiting review"
            icon={<FiAlertCircle />}
          />
          <StatCard
            title="Total Posts"
            value="342"
            subtitle="All content"
            icon={<FiMessageCircle />}
          />
          <StatCard
            title="Categories"
            value="12"
            subtitle="Active categories"
            icon={<FiCheckCircle />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Pending Moderation</h2>
              <Link to="/admin/moderation">
                <button className="text-[#2C7A7B] text-sm hover:underline">View All</button>
              </Link>
            </div>
            <div className="bg-white rounded-xl p-6 space-y-3">
              {pendingModerations.length > 0 ? (
                pendingModerations.map((item) => (
                  <div key={item.id} className="border-l-4 border-yellow-400 bg-yellow-50 p-3 rounded">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold text-sm">{item.title}</p>
                        <p className="text-xs text-gray-600">{item.type} · Reported by {item.reportedBy}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${item.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {item.severity}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-4">No pending items</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Posts</h2>
              <Link to="/admin/posts">
                <button className="text-[#2C7A7B] text-sm hover:underline">View All</button>
              </Link>
            </div>
            <div className="bg-white rounded-xl p-6 space-y-3">
              {recentPosts.map((post) => (
                <div key={post.id} className="border-b pb-3 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-sm">{post.title}</p>
                      <p className="text-xs text-gray-600">{post.author} · {post.date}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${post.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {post.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
