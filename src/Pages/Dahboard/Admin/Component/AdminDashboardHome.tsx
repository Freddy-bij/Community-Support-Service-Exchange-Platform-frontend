import { useState, useEffect } from "react";
import { FiUsers, FiFileText, FiCheckCircle, FiClock } from "react-icons/fi";
import { Loader2, AlertCircle } from "lucide-react";

const AdminDashboardHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRequests: 0,
    pendingRequests: 0,
    totalCategories: 0,
  });

  const currentUser = (() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return { name: "Admin", role: "admin", createdAt: new Date().toISOString() };
      }
    }
    return { name: "Admin", role: "admin", createdAt: new Date().toISOString() };
  })();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");
      // Mock data - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStats({
        totalUsers: 0,
        totalRequests: 0,
        pendingRequests: 0,
        totalCategories: 0,
      });
    } catch {
      setError("Failed to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Real-time analytics and platform management.</p>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-red-700">
          <AlertCircle size={20} />
          <p className="text-sm font-semibold">{error}</p>
        </div>
      )}

      {/* Admin Profile Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2C7A7B] to-[#235E5F] flex items-center justify-center text-white text-3xl font-bold shadow-md">
            {currentUser?.name?.charAt(0).toUpperCase() || "A"}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{currentUser?.name || "Admin"}</h3>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
              <span className="px-2 py-1 bg-[#2C7A7B]/10 text-[#2C7A7B] rounded-md font-semibold text-xs">
                {currentUser?.role?.toUpperCase() || "ADMIN"}
              </span>
              <span>|</span>
              <span>
                Joined{" "}
                {new Date(currentUser?.createdAt || Date.now()).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
        <button className="px-6 py-2.5 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition">
          Edit Profile
        </button>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100">
          <Loader2 className="w-10 h-10 animate-spin text-[#2C7A7B] mb-3" />
          <span className="text-gray-400 font-medium">Loading platform stats...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500 font-medium">Total Users</p>
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <FiUsers className="text-gray-600" size={24} />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">{stats.totalUsers}</p>
            <p className="text-sm text-gray-500 mt-2">Platform members</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500 font-medium">Pending Items</p>
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <FiClock className="text-gray-600" size={24} />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">{stats.pendingRequests}</p>
            <p className="text-sm text-gray-500 mt-2">Awaiting review</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500 font-medium">All Requests</p>
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <FiCheckCircle className="text-gray-600" size={24} />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">{stats.totalRequests}</p>
            <p className="text-sm text-gray-500 mt-2">Total submissions</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500 font-medium">Categories</p>
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <FiFileText className="text-gray-600" size={24} />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">{stats.totalCategories}</p>
            <p className="text-sm text-gray-500 mt-2">Active categories</p>
          </div>
        </div>
      )}

      {/* System Status */}
      <div className="bg-gradient-to-br from-[#2C7A7B] to-[#235E5F] rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold">System Integrity Check</h2>
            <p className="text-white/80 mt-1">
              All systems are currently operational. No critical issues found.
            </p>
          </div>
          <button className="bg-white text-[#2C7A7B] font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-md active:scale-95">
            Generate System Report
          </button>
        </div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full" />
      </div>
    </div>
  );
};

export default AdminDashboardHome;
