
import {  Route, Routes } from "react-router"
import Home from "./Pages/Home"
import Auth from "./Pages/Auth"
import Layout from "./shares/Components.tsx/Layout"
import Dashboard from "./Pages/Dashoard"
import CommunityServicePlatform from "./Pages/communityPlatform"
import AdminLayout from "./shares/ui/AdminLayout"
import AdminDashboard from "./Pages/Admin/AdminDashboard"


const App = () => {
  return (
    <>
    
    <Routes>
      <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<AdminDashboard/>} />
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