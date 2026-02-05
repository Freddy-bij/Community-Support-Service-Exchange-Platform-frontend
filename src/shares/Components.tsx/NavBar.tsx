import Logo from "../ui/logo"
import Search from "../ui/search"

const NavBar = () => {
  return (
    <div className="bg-gray-100 fixed z-100
     w-full">
        <div className="w-[90%] mx-auto flex justify-between items-center ">
            <Logo/> 
            <Search/>
        </div>
      
    </div>
  )
}

export default NavBar