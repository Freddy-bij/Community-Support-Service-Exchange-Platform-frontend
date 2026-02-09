import { useEffect, useState } from "react"
import { FiXCircle, FiCheck } from "react-icons/fi"
import { getPendingRequests, approveRequest, rejectRequest } from "../../services/api"

const RequestsManagement = () => {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Fetch pending requests on component mount
  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await getPendingRequests("REQUEST")
      setRequests(Array.isArray(data) ? data : data.data || [])
    } catch (err: any) {
      setError(err.message || "Failed to load requests")
      console.error("Error fetching requests:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleApproveRequest = async (id: string) => {
    try {
      setActionLoading(id)
      await approveRequest(id)
      // Remove from pending list
      setRequests(requests.filter(req => req._id !== id))
    } catch (err: any) {
      setError(err.message || "Failed to approve request")
    } finally {
      setActionLoading(null)
    }
  }

  const handleRejectRequest = async (id: string) => {
    try {
      setActionLoading(id)
      await rejectRequest(id, "Rejected by admin")
      // Remove from pending list
      setRequests(requests.filter(req => req._id !== id))
    } catch (err: any) {
      setError(err.message || "Failed to reject request")
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Service Requests</h1>
          <p style={{ color: '#6b7280', margin: '8px 0 0 0' }}>Monitor and manage all service requests</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '8px 16px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Pending: <span style={{ fontWeight: 'bold', color: '#2C7A7B' }}>{requests.length}</span></p>
        </div>
      </div>

      {error && (
        <div style={{ backgroundColor: '#fee2e2', padding: '12px 16px', borderRadius: '8px', color: '#991b1b', marginBottom: '16px', fontSize: '14px' }}>
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: 'white', borderRadius: '8px' }}>
          <p style={{ color: '#6b7280' }}>Loading requests...</p>
        </div>
      ) : requests.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: 'white', borderRadius: '8px' }}>
          <p style={{ color: '#6b7280' }}>No pending requests</p>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <tr>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Title</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Author</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Category</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Description</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Created</th>
                <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, idx) => (
                <tr key={request._id} style={{ borderBottom: idx < requests.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                  <td style={{ padding: '16px 24px', fontWeight: '500' }}>{request.title || "N/A"}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{request.userId?.name || "Unknown"}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{request.category?.name || "N/A"}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{(request.description || "").substring(0, 50)}...</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>
                    {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : "N/A"}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleApproveRequest(request._id)}
                        disabled={actionLoading === request._id}
                        style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#dcfce7', color: '#15803d', border: 'none', cursor: 'pointer', opacity: actionLoading === request._id ? 0.6 : 1 }}
                        title="Approve request"
                      >
                        <FiCheck size={16} />
                      </button>
                      <button
                        onClick={() => handleRejectRequest(request._id)}
                        disabled={actionLoading === request._id}
                        style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#fee2e2', color: '#991b1b', border: 'none', cursor: 'pointer', opacity: actionLoading === request._id ? 0.6 : 1 }}
                        title="Reject request"
                      >
                        <FiXCircle size={16} />
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

export default RequestsManagement
