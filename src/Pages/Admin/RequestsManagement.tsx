import { useState } from "react"
import { FiXCircle, FiEye } from "react-icons/fi"

const RequestsManagement = () => {
  const [requests, setRequests] = useState([
    { id: 1, title: "Need coding help", author: "John Doe", category: "Technical", status: "open", priority: "high", date: "2024-02-08", responses: 5 },
    { id: 2, title: "Looking for design mentor", author: "Jane Smith", category: "Design", status: "in-progress", priority: "medium", date: "2024-02-08", responses: 3 },
    { id: 3, title: "Web development project partner", author: "Mike Johnson", category: "Projects", status: "open", priority: "high", date: "2024-02-07", responses: 8 },
    { id: 4, title: "React best practices guidance", author: "Sarah Williams", category: "Learning", status: "completed", priority: "medium", date: "2024-02-06", responses: 2 },
    { id: 5, title: "UI/UX design feedback", author: "David Brown", category: "Design", status: "open", priority: "low", date: "2024-02-05", responses: 1 },
  ])

  const handleClose = (id: number) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: "closed" } : req))
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return { bg: '#fee2e2', text: '#991b1b' }
      case 'medium': return { bg: '#fef3c7', text: '#92400e' }
      case 'low': return { bg: '#dcfce7', text: '#15803d' }
      default: return { bg: '#f3f4f6', text: '#374151' }
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'open': return { bg: '#dbeafe', text: '#1e40af' }
      case 'in-progress': return { bg: '#fef3c7', text: '#92400e' }
      case 'completed': return { bg: '#dcfce7', text: '#15803d' }
      case 'closed': return { bg: '#f3f4f6', text: '#374151' }
      default: return { bg: '#f3f4f6', text: '#374151' }
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
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Open: <span style={{ fontWeight: 'bold', color: '#2C7A7B' }}>{requests.filter(r => r.status === 'open').length}</span></p>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            <tr>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Title</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Author</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Category</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Priority</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Status</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Responses</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, idx) => (
              <tr key={request.id} style={{ borderBottom: idx < requests.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                <td style={{ padding: '16px 24px', fontWeight: '500' }}>{request.title}</td>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{request.author}</td>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{request.category}</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ padding: '4px 12px', backgroundColor: getPriorityColor(request.priority).bg, color: getPriorityColor(request.priority).text, fontSize: '12px', borderRadius: '9999px' }}>
                    {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                  </span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ padding: '4px 12px', backgroundColor: getStatusColor(request.status).bg, color: getStatusColor(request.status).text, fontSize: '12px', borderRadius: '9999px' }}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{request.responses}</td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#dbeafe', color: '#1e40af', border: 'none', cursor: 'pointer' }}>
                      <FiEye size={16} />
                    </button>
                    {request.status !== 'closed' && (
                      <button
                        onClick={() => handleClose(request.id)}
                        style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#fee2e2', color: '#991b1b', border: 'none', cursor: 'pointer' }}
                      >
                        <FiXCircle size={16} />
                      </button>
                    )}
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

export default RequestsManagement
