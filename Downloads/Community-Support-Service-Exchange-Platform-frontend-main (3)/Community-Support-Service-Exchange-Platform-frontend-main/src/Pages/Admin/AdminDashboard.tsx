import { useEffect, useState } from "react"
import StatCard from "../../shares/ui/statCart"
import { FiTrendingUp, FiMessageCircle, FiCheckCircle, FiStar } from "react-icons/fi"
import { Link } from "react-router"
import { getAnalytics } from "../../services/api"

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingRequests: 0,
    totalRequests: 0,
    totalCategories: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await getAnalytics()
      setStats({
        totalUsers: data.totalUsers || 0,
        pendingRequests: data.pendingRequests || 0,
        totalRequests: data.totalRequests || 0,
        totalCategories: data.totalCategories || 0,
      })
    } catch (err: any) {
      console.error("Error fetching stats:", err)
      setError(err.message || "Error loading analytics")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome back,</p>
        </div>
        <Link to="/admin/requests">
          <button className="bg-[#2C7A7B] text-white px-4 py-2 rounded-lg hover:bg-green-700">
            + New Request
          </button>
        </Link>
      </div>

      {error && (
        <div className="bg-yellow-50 text-yellow-800 p-3 rounded-md mb-4 text-sm">{error}</div>
      )}

      <div className="bg-white rounded-xl p-6 mb-8">
        <div>
          <p className="text-sm text-gray-500">Member since Jan 2024</p>
          <p className="font-semibold">⭐ 4.8 <span className="text-gray-400">| Level 5 Helper</span></p>
        </div>
      </div>

      {loading ? (
        <div className="text-center p-10 bg-white rounded-xl">Loading dashboard stats...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Active Requests" value={String(stats.pendingRequests)} subtitle="Open for responses" icon={<FiTrendingUp />} />
          <StatCard title="Total Responses" value={String(stats.totalRequests)} subtitle="Received this month" icon={<FiMessageCircle />} />
          <StatCard title="Completed" value={String(stats.totalUsers)} subtitle="Requests fulfilled" icon={<FiCheckCircle />} />
          <StatCard title="Rating" value="4.8" subtitle="Community rating" icon={<FiStar />} />
        </div>
      )}

      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Your Service Requests</h2>
          <Link to="/admin/requests" className="text-[#2C7A7B] text-sm">View All</Link>
        </div>

        <div className="bg-white rounded-xl p-6 text-gray-400 text-center">No requests yet</div>
      </div>
    </div>
  )
}

export default AdminDashboard
