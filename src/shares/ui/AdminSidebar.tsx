import { Link } from "react-router"

const AdminSidebar = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Admin</h2>
        <p className="text-sm text-gray-500">Control panel</p>
      </div>

      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/admin" className="block px-4 py-2 rounded hover:bg-gray-100">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/users" className="block px-4 py-2 rounded hover:bg-gray-100">Users</Link>
          </li>
          <li>
            <Link to="/admin/requests" className="block px-4 py-2 rounded hover:bg-gray-100">Requests</Link>
          </li>
          <li>
            <Link to="/admin/settings" className="block px-4 py-2 rounded hover:bg-gray-100">Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default AdminSidebar
