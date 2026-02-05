import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5"
import { Link } from "react-router";


const Search = () => {
    const [isshow, setIsShow] = useState<boolean>(false);
  return (
    <div>
        <div className="flex items-center gap-2 ">
            <div className={`${isshow? "bg-[#2C7A7B] text-white" : "bg-gray-300 text-[#2C7A7B]"} h-10 w-10 rounded-md items-center flex justify-center text-bold`}onClick={() => setIsShow(prev => !prev)}>
               <IoSearchOutline />  
            </div>
           
            <input type="text" placeholder="Search..." className="outline-[#2C7A7B] border-none bg-white h-10 px-4 w-60 rounded-md" hidden={!isshow}/>
           <Link to="/auth"><button className="bg-[#2C7A7B] text-white h-10 w-20  font-bold rounded-md">Login</button></Link>
        </div>
    </div>
  )
}

export default Search