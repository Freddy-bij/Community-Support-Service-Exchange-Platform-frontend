import Logo from "../ui/logo"
import Search from "../ui/search"
import { Link } from "react-router"

const NavBar = () => {
  return (
    <div className="bg-gray-100 fixed z-100 w-full">
        <div className="w-[90%] mx-auto flex justify-between items-center py-3">
            <Logo/> 
            <div className="flex items-center gap-4">
              <Search/>
              <Link to="/admin">
                <button className="bg-[#2C7A7B] text-white px-3 py-1 rounded-md text-sm">Admin</button>
              </Link>
            </div>
        </div>
    </div>
  )
}

export default NavBar