import { Outlet } from "react-router"
import AdminSidebar from "./AdminSidebar"

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-72 bg-white border-r">
        <AdminSidebar />
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
