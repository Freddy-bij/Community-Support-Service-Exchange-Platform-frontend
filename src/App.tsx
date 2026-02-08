
import {  Route, Routes } from "react-router"
import Home from "./Pages/Home"
import Auth from "./Pages/Auth"
import Layout from "./shares/Components.tsx/Layout"
import Dashboard from "./Pages/Dashoard"
import CommunityServicePlatform from "./Pages/communityPlatform"
import AdminLayout from "./shares/ui/AdminLayout"
import AdminDashboard from "./Pages/Admin/AdminDashboard"
import ContentModeration from "./Pages/Admin/ContentModeration"
import PostsManagement from "./Pages/Admin/PostsManagement"
import CategoriesManagement from "./Pages/Admin/CategoriesManagement"
import UsersManagement from "./Pages/Admin/UsersManagement"
import RequestsManagement from "./Pages/Admin/RequestsManagement"
import AdminSettings from "./Pages/Admin/AdminSettings"


const App = () => {
  return (
    <>
    
    <Routes>
      <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<AdminDashboard/>} />
        <Route path="moderation" element={<ContentModeration/>} />
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
       <Route path="community-services" element={<CommunityServicePlatform/>}/>
      </Route>
    </Routes>
    
  
    
    </>
  )
}

export default App