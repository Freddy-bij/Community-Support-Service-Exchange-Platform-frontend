import { useEffect, useState } from "react"
import { FiCheck, FiX } from "react-icons/fi"
import { getAbuseReports, approveAbuseReport, rejectAbuseReport } from "../../services/api"

const ContentModeration = () => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await getAbuseReports()
      setItems(Array.isArray(data) ? data : data.data || [])
    } catch (err: any) {
      setError(err.message || "Failed to load reports")
      console.error("Error fetching reports:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    try {
      setActionLoading(id)
      await approveAbuseReport(id)
      setItems(items.map(item => item._id === id ? { ...item, status: "approved" } : item))
    } catch (err: any) {
      setError(err.message || "Failed to approve report")
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (id: string) => {
    try {
      setActionLoading(id)
      await rejectAbuseReport(id)
      setItems(items.map(item => item._id === id ? { ...item, status: "rejected" } : item))
    } catch (err: any) {
      setError(err.message || "Failed to reject report")
    } finally {
      setActionLoading(null)
    }
  }

  const pendingItems = items.filter(item => item.status === "pending")

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return { bg: '#fed7aa', text: '#92400e' }
      case 'approved': return { bg: '#dcfce7', text: '#15803d' }
      case 'rejected': return { bg: '#fee2e2', text: '#991b1b' }
      default: return { bg: '#f3f4f6', text: '#374151' }
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Content Moderation</h1>
          <p style={{ color: '#6b7280', margin: '8px 0 0 0' }}>Review and moderate user-generated content</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '8px 16px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Pending: <span style={{ fontWeight: 'bold', color: '#dc2626' }}>{pendingItems.length}</span></p>
        </div>
      </div>

      {error && (
        <div style={{ backgroundColor: '#fee2e2', padding: '12px 16px', borderRadius: '8px', color: '#991b1b', marginBottom: '16px', fontSize: '14px' }}>
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: 'white', borderRadius: '8px' }}>
          <p style={{ color: '#6b7280' }}>Loading reports...</p>
        </div>
      ) : items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: 'white', borderRadius: '8px' }}>
          <p style={{ color: '#6b7280' }}>No reports to moderate</p>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <tr>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Type</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Content</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Reason</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Reported By</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Status</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Actions</th>
              </tr>
            </thead>
            <tbody style={{ borderCollapse: 'collapse' }}>
              {items.map((item, idx) => (
                <tr key={item._id} style={{ borderBottom: idx < items.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ padding: '4px 12px', backgroundColor: '#dbeafe', color: '#1e40af', fontSize: '12px', borderRadius: '9999px' }}>
                      {item.type || "Post"}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div>
                      <p style={{ fontWeight: '500', fontSize: '14px', margin: 0 }}>{(item.description || "N/A").substring(0, 40)}</p>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{item.reason || "No reason"}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{item.reportedBy?.name || "Unknown"}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ padding: '4px 12px', backgroundColor: getStatusColor(item.status).bg, color: getStatusColor(item.status).text, fontSize: '12px', borderRadius: '9999px' }}>
                      {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : "Pending"}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    {item.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleApprove(item._id)}
                          disabled={actionLoading === item._id}
                          style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#dcfce7', color: '#15803d', border: 'none', cursor: 'pointer', opacity: actionLoading === item._id ? 0.6 : 1 }}
                          title="Approve"
                        >
                          <FiCheck size={16} />
                        </button>
                        <button
                          onClick={() => handleReject(item._id)}
                          disabled={actionLoading === item._id}
                          style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#fee2e2', color: '#991b1b', border: 'none', cursor: 'pointer', opacity: actionLoading === item._id ? 0.6 : 1 }}
                          title="Reject"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    )}
                    {item.status !== 'pending' && (
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>Already {item.status}</span>
                    )}
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

export default ContentModeration
