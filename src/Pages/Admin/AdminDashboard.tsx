import { useEffect, useState } from "react"
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
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>Admin Dashboard</h1>
      <p style={{ color: '#6b7280', marginBottom: '24px' }}>Welcome to the admin dashboard</p>
      
      {error && (
        <div style={{ backgroundColor: '#fee2e2', padding: '12px 16px', borderRadius: '8px', color: '#991b1b', marginBottom: '16px', fontSize: '14px' }}>
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: 'white', borderRadius: '8px' }}>
          <p style={{ color: '#6b7280' }}>Loading dashboard stats...</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>Total Users</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '10px', color: '#1f2937' }}>{stats.totalUsers}</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>Pending Requests</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '10px', color: '#dc2626' }}>{stats.pendingRequests}</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>Total Requests</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '10px', color: '#1f2937' }}>{stats.totalRequests}</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>Categories</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '10px', color: '#1f2937' }}>{stats.totalCategories}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
