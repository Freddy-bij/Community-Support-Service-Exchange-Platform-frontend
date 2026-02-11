import { useEffect, useState } from "react"
import { FiXCircle, FiCheck, FiClock, FiAlertCircle } from "react-icons/fi"
import { Loader2 } from "lucide-react"
import { getPendingRequests, approveRequest, rejectRequest, getRequests } from "../../services/api"

const RequestsManagement = () => {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [filter, setFilter] = useState<"ALL" | "REQUEST" | "OFFER">("ALL")

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      setError("")
      console.log('Fetching pending requests...')
      const [requestsData, offersData] = await Promise.all([
        getPendingRequests("REQUEST"),
        getPendingRequests("OFFER"),
      ])
      console.log('Requests data:', requestsData)
      console.log('Offers data:', offersData)
      const allRequests = [
        ...(Array.isArray(requestsData) ? requestsData : requestsData.requests || []),
        ...(Array.isArray(offersData) ? offersData : offersData.requests || [])
      ]
      console.log('All pending requests:', allRequests)
      console.log('Sample request:', allRequests[0])
      setRequests(allRequests)
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
      setRequests(requests.filter(req => req.id !== id))
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
      setRequests(requests.filter(req => req.id !== id))
    } catch (err: any) {
      setError(err.message || "Failed to reject request")
    } finally {
      setActionLoading(null)
    }
  }

  const filteredRequests = filter === "ALL" ? requests : requests.filter(req => req.type === filter)

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Pending Requests</h1>
          <p className="text-gray-500">Review and approve service requests</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Pending: <span className="font-bold text-[#2C7A7B]">{filteredRequests.length}</span></p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "ALL" | "REQUEST" | "OFFER")}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C7A7B] focus:border-transparent"
        >
          <option value="ALL">All Types</option>
          <option value="REQUEST">Requests Only</option>
          <option value="OFFER">Offers Only</option>
        </select>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl p-8 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-[#2C7A7B] mr-2" />
          <span className="text-gray-600">Loading requests...</span>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center">
          <FiClock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-600 font-medium mb-2">No pending requests</p>
          <p className="text-sm text-gray-400">Requests will appear here once users submit them</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{request.title || "N/A"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.type === "OFFER" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
                      }`}>
                        {request.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{request.authorName || "Unknown"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{request.categoryName || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{request.description || ""}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleApproveRequest(request.id)}
                          disabled={actionLoading === request.id}
                          className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50 transition"
                          title="Approve request"
                        >
                          {actionLoading === request.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <FiCheck className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.id)}
                          disabled={actionLoading === request.id}
                          className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50 transition"
                          title="Reject request"
                        >
                          <FiXCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default RequestsManagement