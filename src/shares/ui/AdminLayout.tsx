import { Outlet } from "react-router"
import AdminSidebar from "./AdminSidebar"

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f3f4f6' }}>
      <div style={{ width: '250px', backgroundColor: '#2C7A7B', position: 'fixed', height: '100vh', overflowY: 'auto', zIndex: 50 }}>
        <AdminSidebar />
      </div>
      <main style={{ marginLeft: '250px', flex: 1, padding: '20px', backgroundColor: '#e5e7eb', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
