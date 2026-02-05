
import {  Route, Routes } from "react-router"
import Home from "./Pages/Home"
import Auth from "./Pages/Auth"
import Layout from "./shares/Components.tsx/Layout"


const App = () => {
  return (
    <>
    
    <Routes>

      
      <Route  element={<Layout/>} >
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      </Route>
      
    </Routes>
    
  
    
    </>
  )
}

export default App