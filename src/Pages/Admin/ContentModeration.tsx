import { useState } from "react"
import { FiCheck, FiX, FiEye } from "react-icons/fi"

const ContentModeration = () => {
  const [items, setItems] = useState([
    { id: 1, type: "Post", title: "Inappropriate content", author: "User123", reportedBy: "User456", severity: "high", status: "pending", date: "2024-02-08" },
    { id: 2, type: "Comment", title: "Spam link", author: "User789", reportedBy: "User101", severity: "medium", status: "pending", date: "2024-02-08" },
    { id: 3, type: "Post", title: "Offensive language", author: "User234", reportedBy: "User567", severity: "high", status: "pending", date: "2024-02-07" },
    { id: 4, type: "Comment", title: "Duplicate content", author: "User345", reportedBy: "User678", severity: "low", status: "pending", date: "2024-02-07" },
  ])

  const handleApprove = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, status: "approved" } : item))
  }

  const handleReject = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, status: "rejected" } : item))
  }

  const pendingItems = items.filter(item => item.status === "pending")

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'high': return { bg: '#fee2e2', text: '#991b1b' }
      case 'medium': return { bg: '#fef3c7', text: '#92400e' }
      case 'low': return { bg: '#dcfce7', text: '#15803d' }
      default: return { bg: '#f3f4f6', text: '#374151' }
    }
  }

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

      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            <tr>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Type</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Content</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Author</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Reported By</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Severity</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Status</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Actions</th>
            </tr>
          </thead>
          <tbody style={{ borderCollapse: 'collapse' }}>
            {items.map((item, idx) => (
              <tr key={item.id} style={{ borderBottom: idx < items.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ padding: '4px 12px', backgroundColor: '#dbeafe', color: '#1e40af', fontSize: '12px', borderRadius: '9999px' }}>{item.type}</span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div>
                    <p style={{ fontWeight: '500', fontSize: '14px', margin: 0 }}>{item.title}</p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>{item.date}</p>
                  </div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{item.author}</td>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{item.reportedBy}</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ padding: '4px 12px', backgroundColor: getSeverityColor(item.severity).bg, color: getSeverityColor(item.severity).text, fontSize: '12px', borderRadius: '9999px' }}>
                    {item.severity.charAt(0).toUpperCase() + item.severity.slice(1)}
                  </span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ padding: '4px 12px', backgroundColor: getStatusColor(item.status).bg, color: getStatusColor(item.status).text, fontSize: '12px', borderRadius: '9999px' }}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  {item.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleApprove(item.id)}
                        style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#dcfce7', color: '#15803d', border: 'none', cursor: 'pointer' }}
                        title="Approve"
                      >
                        <FiCheck size={16} />
                      </button>
                      <button
                        onClick={() => handleReject(item.id)}
                        style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#fee2e2', color: '#991b1b', border: 'none', cursor: 'pointer' }}
                        title="Reject"
                      >
                        <FiX size={16} />
                      </button>
                      <button
                        style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#f3f4f6', color: '#374151', border: 'none', cursor: 'pointer' }}
                        title="View"
                      >
                        <FiEye size={16} />
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
    </div>
  )
}

export default ContentModeration
