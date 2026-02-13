import { Outlet } from "react-router"
import AdminSidebar from "./AdminSidebar"

const AdminLayout = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="bg-[#2C7A7B] fixed inset-y-0 left-0 z-50 w-72">
        <AdminSidebar />
      </div>

      <main className="p-6 space-y-8 flex-1 bg-gray-200 lg:ml-72 flex flex-col overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
