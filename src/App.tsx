import {  Route, Routes } from "react-router"
import Auth from "./Pages/Authentication/Auth"
import Layout from "./shares/Layout/Layout"
import Dashboard from "./Pages/Dahboard/User/Dashoard"
import AdminLayout from "./shares/ui/AdminLayout"
import AdminDashboard from "./Pages/Dahboard/Admin/AdminDashboard"
import AdminSettings from "./Pages/Dahboard/Admin/Component/AdminSettings"
import Home from "./Pages/Home/Home"
import RequestsManagement from "./Pages/Dahboard/Admin/Component/RequestsManagement"
import UsersManagement from "./Pages/Dahboard/Admin/Component/UsersManagement"
import CategoriesManagement from "./Pages/Dahboard/Admin/Component/CategoriesManagement"
import PostsManagement from "./Pages/Dahboard/Admin/Component/PostsManagement"


const App = () => {
  return (
    <>   
    <Routes>
      <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<AdminDashboard/>} />
        <Route path="posts" element={<PostsManagement/>} />
        <Route path="categories" element={<CategoriesManagement/>} />
        <Route path="users" element={<UsersManagement/>} />
        <Route path="requests" element={<RequestsManagement/>} />
        <Route path="settings" element={<AdminSettings/>} />
      </Route>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route  element={<Layout/>} >
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      </Route>
    </Routes>
    </>
  )
}

export default App