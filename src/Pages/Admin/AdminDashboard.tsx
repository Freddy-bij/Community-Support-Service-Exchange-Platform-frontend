import { useEffect, useState } from "react"
import { getAnalytics } from "../../services/api"
import StatCard from "../../shares/ui/statCart"
import { FiUsers, FiClock, FiCheckCircle, FiGrid, FiHome, FiFileText, FiSettings, FiLogOut, FiMenu, FiX } from "react-icons/fi"
import { Loader2, AlertCircle, ChevronRight } from "lucide-react"
import logo from "../../images/image.png"
import AuthService from "../../services/AuthService"
import { SiAbusedotch } from "react-icons/si"
import { GrAnalytics } from "react-icons/gr"
import RequestsManagement from "./RequestsManagement"
import CategoriesManagement from "./CategoriesManagement"

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("home")
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingRequests: 0,
    totalRequests: 0,
    totalCategories: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  const currentUser = AuthService.getCurrentUser()

  useEffect(() => {
    fetchStats()
    console.log('Current admin user:', currentUser)
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
      // Don't show error, just use default values
      setStats({
        totalUsers: 0,
        pendingRequests: 0,
        totalRequests: 0,
        totalCategories: 0,
      })
    } finally {
      setLoading(false)
    }
  }

  const sidebarItems = [
    { icon: FiHome, label: "Dashboard", active: activeSection === "home", section: "home", hasSubmenu: true },
    { icon: FiUsers, label: "Users", section: "users", active: activeSection === "users", hasSubmenu: true },
    { icon: FiFileText, label: "Requests", section: "requests", active: activeSection === "requests", hasSubmenu: true },
    { icon: FiGrid, label: "Categories", section: "categories", active: activeSection === "categories", hasSubmenu: true },
    { icon: SiAbusedotch, label: "Abuse Reports", section: "abuse-reports", active: activeSection === "abuse-reports", hasSubmenu: true },
    { icon: GrAnalytics, label: "Analytics", section: "analytics", active: activeSection === "analytics", hasSubmenu: true },
    { icon: FiSettings, label: "Settings", section: "settings", active: activeSection === "settings", hasSubmenu: true },
    { icon: FiLogOut, label: "Logout", section: "logout", active: activeSection === "logout", hasSubmenu: true },
  ]

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#2C7A7B] text-white rounded-lg shadow-lg"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`bg-[#2C7A7B] fixed inset-y-0 left-0 z-50 w-64 lg:w-72 transform transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div className="flex items-center bg-gray-200 px-4 py-2.5">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <div className="ml-2">
            <h1 className="font-bold text-sm lg:text-base">Admin Panel</h1>
            <span className="text-xs">Community Support</span>
          </div>
        </div>
        
        <nav className="mt-8 px-4">
          <ul className="space-y-3">
            {sidebarItems.map((item, index) => (
              <li key={index} className="animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                <button
                  onClick={() => {
                    setActiveSection(item.section)
                    setIsSidebarOpen(false)
                  }}
                  className={`group flex items-center justify-between px-4 py-3 text-sm rounded-xl transition-all duration-300 transform hover:scale-105 w-full text-left ${
                    item.active
                      ? "bg-gray-100 text-[#37507E] shadow-lg"
                      : "text-white hover:bg-gray-100 hover:text-[#37507E]"
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon
                      className={`h-5 w-5 mr-3 transition-all duration-300 ${
                        item.active ? "animate-pulse" : "group-hover:scale-110"
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.hasSubmenu && (
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <main className="flex-1 bg-gray-50 w-full min-h-screen overflow-x-hidden">
        {activeSection === "requests" ? (
          <div className="w-full">
            <RequestsManagement />
          </div>
        ) : activeSection === "categories" ? (
          <div className="w-full">
            <CategoriesManagement />
          </div>
        ) : (
          <div className="p-4 md:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-xl md:text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm md:text-base text-gray-500">Welcome back, {currentUser?.name || "Admin"}!</p>
              </div>
            </div>

            {error && (
              <div className="mb-6 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Admin Profile Card */}
            <div className="bg-white rounded-xl p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#2C7A7B] flex items-center justify-center text-white text-xl md:text-2xl font-bold">
                  {currentUser?.name?.charAt(0).toUpperCase() || "A"}
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold">{currentUser?.name || "Administrator"}</h3>
                  <p className="text-xs md:text-sm text-gray-500">
                    Admin since {new Date(currentUser?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                  <p className="font-semibold mt-1 text-sm md:text-base">
                    <span className="text-gray-400">Role: {currentUser?.role || "ADMIN"}</span>
                  </p>
                </div>
              </div>
              <button className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm w-full sm:w-auto">
                View Profile
              </button>
            </div>

            {loading ? (
              <div className="bg-white rounded-xl p-8 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-[#2C7A7B] mr-2" />
                <span className="text-gray-600">Loading dashboard stats...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <StatCard
                  title="Total Users"
                  value={stats.totalUsers.toString()}
                  subtitle="Registered users"
                  icon={<FiUsers />}
                />
                <StatCard
                  title="Pending Requests"
                  value={stats.pendingRequests.toString()}
                  subtitle="Awaiting approval"
                  icon={<FiClock />}
                />
                <StatCard
                  title="Total Requests"
                  value={stats.totalRequests.toString()}
                  subtitle="All requests"
                  icon={<FiCheckCircle />}
                />
                <StatCard
                  title="Categories"
                  value={stats.totalCategories.toString()}
                  subtitle="Service categories"
                  icon={<FiGrid />}
                />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard
