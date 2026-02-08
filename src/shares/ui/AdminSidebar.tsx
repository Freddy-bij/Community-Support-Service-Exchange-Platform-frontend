import { Link } from "react-router"
import { FiBarChart3, FiAlertCircle, FiFolderPlus, FiEdit3, FiSettings } from "react-icons/fi"
import { ChevronRight } from "lucide-react"
import logo from "../../images/image.png"

const AdminSidebar = () => {
  const adminItems = [
    { icon: FiBarChart3, label: "Dashboard", path: "/admin", section: "dashboard" },
    { icon: FiAlertCircle, label: "Content Moderation", path: "/admin/moderation", section: "moderation" },
    { icon: FiEdit3, label: "Manage Posts", path: "/admin/posts", section: "posts" },
    { icon: FiFolderPlus, label: "Manage Categories", path: "/admin/categories", section: "categories" },
    { icon: FiSettings, label: "Settings", path: "/admin/settings", section: "settings" },
  ]

  return (
    <>
      <div className="flex items-center bg-gray-200 px-4 py-2.5 text-white">
        <img src={logo} alt="Admin" className="w-12 h-12" />
        <div className="ml-2">
          <h1 className="text-sm font-bold text-gray-800">Admin Panel</h1>
          <p className="text-xs text-gray-600">Control Center</p>
        </div>
      </div>
      <nav className="mt-8 px-4">
        <ul className="space-y-3">
          {adminItems.map((item, index) => (
            <li key={index} className="animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
              <Link to={item.path}>
                <button className="group flex items-center justify-between px-4 py-4 text-sm rounded-xl transition-all duration-300 transform hover:scale-105 w-full text-left text-white hover:bg-gray-100 hover:text-[#37507E]">
                  <div className="flex items-center">
                    {item.icon && (
                      <item.icon className="h-5 w-5 mr-4 transition-all duration-300 group-hover:scale-110" />
                    )}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default AdminSidebar
