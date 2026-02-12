
import { useEffect, useState } from "react"
import { FiUsers, FiClock, FiCheckCircle, FiGrid, FiHome, FiFileText, FiSettings, FiLogOut, FiMenu, FiX, FiBell, FiChevronDown } from "react-icons/fi"
import { Loader2, AlertCircle, } from "lucide-react"
import logo from "../../../images/logo.png"
import { SiAbusedotch } from "react-icons/si"
import { GrAnalytics } from "react-icons/gr"
import RequestsManagement from "./Component/RequestsManagement"
import CategoriesManagement from "./Component/CategoriesManagement"
import { useNavigate } from "react-router"
import StatCard from "../../../shares/ui/statCart"

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
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  
  const currentUser = { name: "Admin", role: "Manager" }
  const navigate = useNavigate()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      // Mock data - replace with actual API call when available
      setStats({
        totalUsers: 0,
        pendingRequests: 0,
        totalRequests: 0,
        totalCategories: 0,
      })
    } catch {
      setError("Failed to fetch dashboard statistics.")
    } finally {
      setLoading(false)
    }
  }

  const sidebarItems = [
    { icon: FiHome, label: "Dashboard", section: "home" },
    { icon: FiUsers, label: "Users", section: "users" },
    { icon: FiFileText, label: "Requests", section: "requests" },
    { icon: FiGrid, label: "Categories", section: "categories" },
    { icon: SiAbusedotch, label: "Abuse Reports", section: "abuse-reports" },
    { icon: GrAnalytics, label: "Analytics", section: "analytics" },
    { icon: FiSettings, label: "Settings", section: "settings" },
    { icon: FiLogOut, label: "Logout", section: "logout" },
  ]

  const handleLogout = async () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    navigate("/auth")
  }

  return (
  
    <div className="fixed inset-0 flex bg-[#F8FAFC] overflow-hidden z-[9999]">
      
      <aside
        className={`fixed inset-y-0 left-0 z-[100] w-64 lg:w-72 bg-[#2C7A7B] shadow-2xl transform transition-transform duration-300 ease-in-out 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0`}
      >
        <div className="flex items-center justify-between bg-black/10 px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-xl shadow-sm">
                <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
            </div>
            <div className="text-white">
              <h1 className="font-bold text-base tracking-tight">AdminPanel</h1>
              <p className="text-[10px] opacity-60 uppercase font-semibold">Control Center</p>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-white p-1 hover:bg-white/10 rounded-lg">
            <FiX size={24} />
          </button>
        </div>
        
        <nav className="mt-6 px-4 overflow-y-auto h-[calc(100vh-100px)] custom-scrollbar">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.section}>
                <button
                  onClick={() => {
                    if (item.section === "logout") {
                      setShowLogoutModal(true)
                    } else {
                      setActiveSection(item.section)
                      if (window.innerWidth < 768) setIsSidebarOpen(false)
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3.5 text-sm rounded-xl transition-all duration-200 group
                    ${activeSection === item.section
                      ? "bg-white text-[#2C7A7B] font-bold shadow-lg shadow-black/5"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`h-5 w-5 ${activeSection === item.section ? "" : "group-hover:scale-110 transition-transform"}`} />
                    <span>{item.label}</span>
                  </div>
                  {activeSection === item.section && <div className="w-1.5 h-1.5 rounded-full bg-[#2C7A7B]" />}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiMenu size={22} />
            </button>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <button className="relative p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
                <FiBell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-8 w-[1px] bg-gray-100 hidden sm:block" />

            <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-800 leading-none">{currentUser?.name || "Admin"}</p>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase mt-1">{currentUser?.role || "Manager"}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2C7A7B] to-[#37507E] flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-all">
                    {currentUser?.name?.charAt(0).toUpperCase() || "A"}
                </div>
                <FiChevronDown className="text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-row overflow-hidden">
           
           <div className="hidden md:block md:w-64 lg:w-72 shrink-0 h-full" />

           <main className="flex-1 h-full overflow-y-auto p-4 md:p-8 lg:p-10">
              <div className="max-w-7xl mx-auto w-full pb-10">
                  {activeSection === "requests" ? (
                    <RequestsManagement />
                  ) : activeSection === "categories" ? (
                    <CategoriesManagement />
                  ) : (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      
                      <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Dashboard Overview</h1>
                        <p className="text-gray-500 mt-1">Real-time analytics and platform management.</p>
                      </div>

                      {error && (
                        <div className="flex items-center gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-red-700">
                          <AlertCircle size={20} />
                          <p className="text-sm font-semibold">{error}</p>
                        </div>
                      )}

                      {loading ? (
                        <div className="h-64 flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-gray-200">
                          <Loader2 className="w-10 h-10 animate-spin text-[#2C7A7B] mb-3" />
                          <span className="text-gray-400 font-medium">Loading platform stats...</span>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          <StatCard title="Total Users" value={stats.totalUsers} icon={<FiUsers />} />
                          <StatCard title="Pending Items" value={stats.pendingRequests} icon={<FiClock />} />
                          <StatCard title="All Requests" value={stats.totalRequests} icon={<FiCheckCircle />} />
                          <StatCard title="Categories" value={stats.totalCategories} icon={<FiGrid />} />
                        </div>
                      )}

                      <div className="bg-[#37507E] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-blue-900/10">
                          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h2 className="text-2xl font-bold">System Integrity Check</h2>
                                <p className="text-blue-100/70 mt-1">All systems are currently operational. No critical issues found.</p>
                            </div>
                            <button className="bg-white text-[#37507E] font-bold px-6 py-3 rounded-2xl hover:bg-blue-50 transition-colors shadow-lg active:scale-95">
                                Generate System Report
                            </button>
                          </div>
                          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full" />
                      </div>

                    </div>
                  )}
              </div>
           </main>
        </div>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <FiLogOut className="text-red-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Confirm Logout</h3>
                <p className="text-sm text-gray-500">Are you sure you want to logout?</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard