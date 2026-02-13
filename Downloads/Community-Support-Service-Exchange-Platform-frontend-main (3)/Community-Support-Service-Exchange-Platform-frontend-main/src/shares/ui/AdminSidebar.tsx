import { Link } from "react-router"
import { FiBarChart, FiAlertCircle, FiFolderPlus, FiEdit3, FiSettings, FiUsers, FiInbox } from "react-icons/fi"
import { ChevronRight } from "lucide-react"
import logo from "../../"

const AdminSidebar = () => {
  const adminItems = [
    { icon: FiBarChart, label: "Dashboard", path: "/admin", section: "dashboard" },
    { icon: FiUsers, label: "Users", path: "/admin/users", section: "users" },
    { icon: FiInbox, label: "Service Requests", path: "/admin/requests", section: "requests" },
    { icon: FiAlertCircle, label: "Content Moderation", path: "/admin/moderation", section: "moderation" },
    { icon: FiEdit3, label: "Manage Posts", path: "/admin/posts", section: "posts" },
    { icon: FiFolderPlus, label: "Manage Categories", path: "/admin/categories", section: "categories" },
    { icon: FiSettings, label: "Settings", path: "/admin/settings", section: "settings" },
  ]

  return (
    <>
      <div className="flex items-center bg-gray-200 px-4 py-2.5">
        <img src={logo} alt="" className="w-12 h-12" />
        <div className="ml-3">
          <h1 className="font-semibold">Community Support</h1>
          <span className="text-xs">Services Exchancess Platform</span>
        </div>
      </div>
      <nav className="mt-8 px-4">
        <ul className="space-y-3">
          {adminItems.map((item, index) => (
            <li key={index} className="animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
              <Link to={item.path} className="block">
                <button
                  className={`group flex items-center justify-between px-4 py-4 text-sm rounded-xl transition-all duration-300 transform hover:scale-105 w-full text-left text-white`}
                >
                  <div className="flex items-center">
                    {item.icon && (
                      <item.icon className="h-5 w-5 mr-4" />
                    )}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-30" />
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
