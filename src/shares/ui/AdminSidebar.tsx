import { Link } from "react-router"
import { FiBarChart3, FiAlertCircle, FiFolderPlus, FiEdit3, FiSettings, FiUsers, FiInbox } from "react-icons/fi"

const AdminSidebar = () => {
  const adminItems = [
    { icon: FiBarChart3, label: "Dashboard", path: "/admin", section: "dashboard" },
    { icon: FiUsers, label: "Users", path: "/admin/users", section: "users" },
    { icon: FiInbox, label: "Service Requests", path: "/admin/requests", section: "requests" },
    { icon: FiAlertCircle, label: "Content Moderation", path: "/admin/moderation", section: "moderation" },
    { icon: FiEdit3, label: "Manage Posts", path: "/admin/posts", section: "posts" },
    { icon: FiFolderPlus, label: "Manage Categories", path: "/admin/categories", section: "categories" },
    { icon: FiSettings, label: "Settings", path: "/admin/settings", section: "settings" },
  ]

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#e5e7eb', padding: '12px 16px' }}>
        <div style={{ width: '48px', height: '48px', backgroundColor: '#fff', borderRadius: '8px' }} />
        <div style={{ marginLeft: '12px' }}>
          <h1 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Admin Panel</h1>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Control Center</p>
        </div>
      </div>
      <nav style={{ marginTop: '32px', paddingLeft: '16px', paddingRight: '16px' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {adminItems.map((item, index) => (
            <li key={index} style={{ marginBottom: '12px' }}>
              <Link to={item.path} style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  fontSize: '14px',
                  borderRadius: '8px',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left',
                  color: 'white',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {item.icon && (
                      <item.icon style={{ width: '20px', height: '20px' }} />
                    )}
                    <span style={{ fontWeight: 500 }}>{item.label}</span>
                  </div>
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
