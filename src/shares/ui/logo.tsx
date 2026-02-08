import { Link } from "react-router"
import logo from "../../images/image.png"
const Logo = () => {
  return (
    <div>
        <Link to="/">
        <div className="flex items-center">
            <div>
            <img src={logo} alt="logo" className="w-20 h-20"/>
        </div>
        <div>
            <h1 className="text-xl font-bold  text-[#2C7A7B]">Community Support </h1>
            <p className="text-gray-600 text-sm text-center">Services Exchanges Platform</p>
        </div>
        </div>
        </Link>
        
         
    </div>
  )
}

export default Logo