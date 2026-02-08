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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Content Moderation</h1>
          <p className="text-gray-500">Review and moderate user-generated content</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg">
          <p className="text-sm text-gray-600">Pending: <span className="font-bold text-red-600">{pendingItems.length}</span></p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Content</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Author</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Reported By</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Severity</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{item.type}</span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.author}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.reportedBy}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    item.severity === 'high' ? 'bg-red-100 text-red-700' :
                    item.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {item.severity.charAt(0).toUpperCase() + item.severity.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    item.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                    item.status === 'approved' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {item.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition"
                        title="Approve"
                      >
                        <FiCheck size={16} />
                      </button>
                      <button
                        onClick={() => handleReject(item.id)}
                        className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
                        title="Reject"
                      >
                        <FiX size={16} />
                      </button>
                      <button
                        className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                        title="View"
                      >
                        <FiEye size={16} />
                      </button>
                    </div>
                  )}
                  {item.status !== 'pending' && (
                    <span className="text-xs text-gray-500">Already {item.status}</span>
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
