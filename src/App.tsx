
import {  Route, Routes } from "react-router"
import Home from "./Pages/Home"
import Auth from "./Pages/Auth"
import Layout from "./shares/Components.tsx/Layout"
import Dashboard from "./Pages/Dashoard"
import CommunityServicePlatform from "./Pages/communityPlatform"


const App = () => {
  return (
    <>
    
    <Routes>

      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route  element={<Layout/>} >
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      </Route>
      <Route path="community-services" element={<CommunityServicePlatform/>}/>
      
    </Routes>
    
  
    
    </>
  )
}

export default App