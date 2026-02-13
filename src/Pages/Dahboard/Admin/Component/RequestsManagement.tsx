import { useEffect, useState } from "react"
import { FiXCircle, FiCheck, FiClock, FiAlertCircle, FiSearch } from "react-icons/fi"
import { Loader2 } from "lucide-react"
import { getRequests, approveRequest, rejectRequest } from "../Serivices/adminService"

interface Request {
  _id: string;
  id: string;
  title: string;
  type: "REQUEST" | "OFFER";
  author: { name: string };
  category: { name: string };
  description: string;
  status: string;
  createdAt: string;
}

const RequestsManagement = () => {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [filter, setFilter] = useState<"ALL" | "REQUEST" | "OFFER">("ALL")
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("ALL")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      setError("")
      console.log('Fetching requests...')
      const data = await getRequests()
      console.log('Requests data:', data)
      const requestsArray = Array.isArray(data) ? data : (data.requests || [])
      setRequests(requestsArray)
    } catch (err: any) {
      console.error('Fetch requests error:', err)
      setError(err.response?.data?.error || "Failed to load requests")
    } finally {
      setLoading(false)
    }
  }

  const handleApproveRequest = async (id: string) => {
    try {
      setActionLoading(id)
      setError("")
      console.log('Approving request:', id)
      await approveRequest(id)
      setSuccess("Request approved successfully")
      setTimeout(() => setSuccess(""), 3000)
      fetchRequests()
    } catch (err: any) {
      console.error('Approve request error:', err)
      setError(err.response?.data?.error || "Failed to approve request")
    } finally {
      setActionLoading(null)
    }
  }

  const handleRejectRequest = async (id: string) => {
    if (!window.confirm("Are you sure you want to reject this request?")) return
    try {
      setActionLoading(id)
      setError("")
      console.log('Rejecting request:', id)
      await rejectRequest(id)
      setSuccess("Request rejected successfully")
      setTimeout(() => setSuccess(""), 3000)
      fetchRequests()
    } catch (err: any) {
      console.error('Reject request error:', err)
      setError(err.response?.data?.error || "Failed to reject request")
    } finally {
      setActionLoading(null)
    }
  }

  const filteredRequests = requests
    .filter(req => filter === "ALL" || req.type === filter)
    .filter(req => statusFilter === "ALL" || req.status === statusFilter)
    .filter(req => 
      req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.author?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Requests Management</h1>
          <p className="text-gray-500">Review and manage all service requests</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Total: <span className="font-bold text-[#2C7A7B]">{filteredRequests.length}</span></p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm mb-6 flex gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C7A7B] focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "ALL" | "PENDING" | "APPROVED" | "REJECTED")}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C7A7B] focus:border-transparent"
        >
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
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

      {success && (
        <div className="mb-6 flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <FiCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}

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
          <p className="text-gray-600 font-medium mb-2">No requests found</p>
          <p className="text-sm text-gray-400">Try adjusting your filters</p>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request._id || request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{request.title || "N/A"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.type === "OFFER" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
                      }`}>
                        {request.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{request.author?.name || "Unknown"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{request.category?.name || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{request.description || ""}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.status === "APPROVED" ? "bg-green-100 text-green-700" : 
                        request.status === "REJECTED" ? "bg-red-100 text-red-700" : 
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {request.status === "PENDING" && (
                          <>
                            <button 
                              onClick={() => handleApproveRequest(request.id || request._id)}
                              disabled={actionLoading === (request.id || request._id)}
                              className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50 transition"
                              title="Approve request"
                            >
                              {actionLoading === (request.id || request._id) ? <Loader2 className="w-4 h-4 animate-spin" /> : <FiCheck className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => handleRejectRequest(request.id || request._id)}
                              disabled={actionLoading === (request.id || request._id)}
                              className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50 transition"
                              title="Reject request"
                            >
                              <FiXCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {request.status !== "PENDING" && (
                          <span className="text-sm text-gray-500 italic">No actions available</span>
                        )}
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