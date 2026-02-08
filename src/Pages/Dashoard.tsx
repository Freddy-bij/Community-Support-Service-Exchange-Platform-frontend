import { useState } from "react";
import StatCard from "../shares/ui/statCart";
import { FiTrendingUp, FiMessageCircle, FiCheckCircle, FiStar, FiHome, FiMessageSquare, FiSearch, FiAward, FiSettings, FiLogOut } from "react-icons/fi";
import { ChevronRight, Settings } from "lucide-react";
import logo from "../images/image.png"
import Message from "../shares/ui/Message";
import BrowserRequest from "../shares/ui/BrowserRequest";
import LearderBoard from "../shares/ui/LearderBoard";
import { Link } from "react-router";

export default function Dashboard() {
const [activeSection , setActiveSection] = useState("home")

 const handleSidebarClick = (section:string) => {
    setActiveSection(section)
    
  }

  const sidebarItems = [
    { 
      icon: FiHome, 
      label: "Dashboard", 
      active: activeSection === "home", 
      section: "home" 
    },
    {
      icon: FiMessageSquare,
      label: "Messages",
      hasSubmenu: true,
      url: "/user/messages",
      section: "messages",
      active: activeSection === "messages",
    },
    {
      icon: FiSearch,
      label: "Browser Requests",
      hasSubmenu: true,
      url: "/user/browser request",
      section: "browser-request",
      active: activeSection === "browser-request",
    },
    {
      icon: FiAward,
      label: "Leaderboard",
      hasSubmenu: true,
      url: "/user/learderboard",
      section: "learderboard",
      active: activeSection === "learderboard",
    },
    {
      icon: FiSettings,
      label: "Settings",
      hasSubmenu: true,
      url: "/user/settitngs",
      section: "settings",
      active: activeSection === "settings",
    },
     {
      icon: FiLogOut,
      label: "logout",
      hasSubmenu: true,
      url: "/user/logout",
      section: "logout",
      active: activeSection === "logout",
    },
   
  ]


  const renderContent = () => {
    switch (activeSection) {
        
        case "settings":
        return (
          <>
          <Settings/>
          </>
        )
        case "learderboard":
        return (
         <>
         <LearderBoard/>
         </>
        )
         case "browser-request":
        return (
        <>
        <BrowserRequest/>
        </>
        )
            case "messages":
        return (
          <div className="animate-fade-in">     
                <Message/>
            </div>
        )
        case "logout":
        return (
          <div className="animate-fade-in">     
                <h1>Logout here </h1>
            </div>
        )
      default:
        return (
          <>
            <main className="flex-1 p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold">Dashboard</h1>
                  <p className="text-gray-500">Welcome back,</p>
                </div>
               <Link to="/community-services">
                 <button className="bg-[#2C7A7B] text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  + New Request
                </button>
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#2C7A7B]"></div>
                  <div>
                    <p className="text-sm text-gray-500">Member since Jan 2024</p>
                    <p className="font-semibold">
                      ⭐ 4.8 <span className="text-gray-400">| Level 5 Helper</span>
                    </p>
                  </div>
                </div>

                <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">
                  View Profile
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                  title="Active Requests"
                  value="0"
                  subtitle="Open for responses"
                  icon={<FiTrendingUp />}
                />
                <StatCard
                  title="Total Responses"
                  value="12"
                  subtitle="Received this month"
                  icon={<FiMessageCircle />}
                />
                <StatCard
                  title="Completed"
                  value="8"
                  subtitle="Requests fulfilled"
                  icon={<FiCheckCircle />}
                />
                <StatCard
                  title="Rating"
                  value="4.8"
                  subtitle="Community rating"
                  icon={<FiStar />}
                />
              </div>

              <div className="mt-10">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Your Service Requests</h2>
                  <button className="text-[#2C7A7B] text-sm">View All</button>
                </div>

                <div className="bg-white rounded-xl p-6 text-gray-400 text-center">
                  No requests yet
                </div>
              </div>
            </main>
          </>
        )
    }
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="bg-[#2C7A7B] fixed inset-y-0 left-0 z-50 w-72 ">
           <div className="flex items-center bg-gray-200 px-4 py-2.5">
             <img src={logo} alt="" className="w-15 h-15" />
             <div>
                <h1>Community Support</h1>
            <span className="text-xs">Services Exchancess Platform</span>
             </div>
           </div>
        <nav className="mt-8 px-4">
          <ul className="space-y-3">
            {sidebarItems.map((item, index) => (
              <li key={index} className="animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                <button
                  onClick={() => handleSidebarClick(item.section)}
                  className={`group flex items-center justify-between px-4 py-4 text-sm rounded-xl transition-all duration-300 transform hover:scale-105 w-full text-left ${
                    item.active
                      ? "bg-gray-100 text-[#37507E] shadow-lg"
                      : "text-white hover:bg-gray-100 hover:text-[#37507E]"
                  }`}
                >
                  <div className="flex items-center">
                    {item.icon && (
                      <item.icon
                        className={`h-5 w-5 mr-4 transition-all duration-300 ${
                          item.active ? "animate-pulse" : "group-hover:scale-110"
                        }`}
                      />
                    )}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.hasSubmenu && (
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <main className="p-6 space-y-8 flex-1 bg-gray-200  lg:ml-72  flex flex-col  overflow-y-auto">{renderContent()}</main>
    </div>
  );
}