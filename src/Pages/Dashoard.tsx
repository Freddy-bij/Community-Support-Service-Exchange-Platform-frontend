import { useState, useEffect } from "react";
import StatCard from "../shares/ui/statCart";
import { FiTrendingUp, FiMessageCircle, FiCheckCircle, FiStar, FiHome, FiMessageSquare, FiSearch, FiAward, FiSettings, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { ChevronRight, Loader2, AlertCircle } from "lucide-react";
import logo from "../images/image.png";
import Message from "../shares/ui/Message";
import BrowserRequest from "../shares/ui/BrowserRequest";
import LearderBoard from "../shares/ui/LearderBoard";
import CreateOfferModal from "../shares/ui/RequestModel";
import AuthService from "../services/AuthService";
import RequestService from "../services/RequestService";
import type { Request } from "../services/RequestService";
import Responseservice from "../services/Responseservice";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myRequests, setMyRequests] = useState<Request[]>([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);
  const [totalResponses, setTotalResponses] = useState(0);
  const [error, setError] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    if (activeSection === "home") {
      fetchMyRequests();
      fetchMyResponses();
    }
  }, [activeSection]);

  const fetchMyRequests = async () => {
    setIsLoadingRequests(true);
    setError("");
    try {
      const response = await RequestService.getMyRequests();
      setMyRequests(response.requests || []);
    } catch (err: unknown) {
      console.error("Failed to fetch requests:", err);
      setError("Failed to load your requests. Please try again.");
    } finally {
      setIsLoadingRequests(false);
    }
  };

  const fetchMyResponses = async () => {
    try {
      const responses = await Responseservice.getMyResponses();
      setTotalResponses(responses.length);
    } catch (err: unknown) {
      console.error("Failed to fetch responses:", err);
    }
  };

  const handleSidebarClick = (section: string) => {
    if (section === "logout") {
      setShowLogoutModal(true);
    } else {
      setActiveSection(section);
    }
    setIsSidebarOpen(false);
  };

  const handleLogout = async () => {
    await AuthService.logout();
    window.location.href = "/auth";
  };

  const handleRequestCreated = () => {
  
    fetchMyRequests();
  };

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
  ];

  const activeRequestsCount = myRequests.filter(r => r.status === "APPROVED" && r.isActive).length;
  const pendingRequestsCount = myRequests.filter(r => r.status === "PENDING" && r.isActive).length;
  const completedRequestsCount = myRequests.filter(r => !r.isActive).length;
 
  const totalLikes = myRequests.reduce((sum, req) => sum + req.likes, 0);
  const averageRating = myRequests.length > 0 ? (totalLikes / myRequests.length).toFixed(1) : "0.0";

  const renderContent = () => {
    switch (activeSection) {
      case "settings":
        return <div>Settings Component</div>;
      
      case "learderboard":
        return <LearderBoard />;
      
      case "browser-request":
        return <BrowserRequest />;
      
      case "messages":
        return (
          <div className="animate-fade-in">
            <Message />
          </div>
        );
      
      case "logout":
        return (
          <div className="animate-fade-in">
            <h1>Logout here</h1>
          </div>
        );
      
      default:
        return (
          <>
            <main className="flex-1 p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
                  <p className="text-sm md:text-base text-gray-500">Welcome back, {currentUser?.name || "User"}!</p>
                </div>
               
                <button 
                  className="bg-[#2C7A7B] text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full sm:w-auto" 
                  onClick={() => setIsModalOpen(true)}
                >
                  + New Request
                </button>
              </div>

              {isModalOpen && (
                <CreateOfferModal 
                  isOpen={isModalOpen} 
                  onClose={() => setIsModalOpen(false)}
                  onSuccess={handleRequestCreated}
                />
              )}

           
              {error && (
                <div className="mb-6 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

           
              <div className="bg-white rounded-xl p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#2C7A7B] flex items-center justify-center text-white text-xl md:text-2xl font-bold">
                    {currentUser?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold">{currentUser?.name || "User"}</h3>
                    <p className="text-xs md:text-sm text-gray-500">
                      Member since {new Date(currentUser?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                    <p className="font-semibold mt-1 text-sm md:text-base">
                      ⭐ {averageRating} <span className="text-gray-400">| {currentUser?.role || "Member"}</span>
                    </p>
                  </div>
                </div>

                <button className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm w-full sm:w-auto">
                  View Profile
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <StatCard
                  title="Active Requests"
                  value={activeRequestsCount.toString()}
                  subtitle={pendingRequestsCount > 0 ? `${pendingRequestsCount} pending approval` : "Approved requests"}
                  icon={<FiTrendingUp />}
                />
                <StatCard
                  title="Total Responses"
                  value={totalResponses.toString()}
                  subtitle="Your contributions"
                  icon={<FiMessageCircle />}
                />
                <StatCard
                  title="Completed"
                  value={completedRequestsCount.toString()}
                  subtitle="Requests fulfilled"
                  icon={<FiCheckCircle />}
                />
                <StatCard
                  title="Rating"
                  value={averageRating}
                  subtitle="Community rating"
                  icon={<FiStar />}
                />
              </div>

              <div className="mt-10">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Your Service Requests</h2>
                  <button 
                    className="text-[#2C7A7B] text-sm hover:underline"
                    onClick={() => setActiveSection("browser-request")}
                  >
                    View All
                  </button>
                </div>

                {isLoadingRequests ? (
                  <div className="bg-white rounded-xl p-8 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-[#2C7A7B] mr-2" />
                    <span className="text-gray-600">Loading your requests...</span>
                  </div>
                ) : myRequests.length === 0 ? (
                  <div className="bg-white rounded-xl p-6 text-gray-400 text-center">
                    No requests yet. Click "+ New Request" to create one!
                  </div>
                ) : (
                  <div className="bg-white rounded-xl divide-y">
                    {myRequests.slice(0, 5).map((request) => (
                      <div 
                        key={request.id} 
                        className="p-4 hover:bg-gray-50 transition cursor-pointer"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{request.title}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                request.status === "APPROVED" 
                                  ? "bg-green-100 text-green-700"
                                  : request.status === "PENDING"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                              }`}>
                                {request.status}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                request.type === "OFFER"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}>
                                {request.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{request.description.slice(0, 100)}...</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>📍 {request.location}</span>
                              <span>👁 {request.views} views</span>
                              <span>❤️ {request.likes} likes</span>
                              <span>🕐 {new Date(request.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </main>
          </>
        );
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#2C7A7B] text-white rounded-lg shadow-lg"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`bg-[#2C7A7B] fixed inset-y-0 left-0 z-50 w-64 lg:w-72 transform transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div className="flex items-center bg-gray-200 px-4 py-2.5">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <div className="ml-2">
            <h1 className="font-bold text-sm lg:text-base">Community Support</h1>
            <span className="text-xs">Services Exchange Platform</span>
          </div>
        </div>
        
        <nav className="mt-8 px-4">
          <ul className="space-y-3">
            {sidebarItems.map((item, index) => (
              <li key={index} className="animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                <button
                  onClick={() => handleSidebarClick(item.section)}
                  className={`group flex items-center justify-between px-4 py-3 text-sm rounded-xl transition-all duration-300 transform hover:scale-105 w-full text-left ${
                    item.active
                      ? "bg-gray-100 text-[#37507E] shadow-lg"
                      : "text-white hover:bg-gray-100 hover:text-[#37507E]"
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon
                      className={`h-5 w-5 mr-3 transition-all duration-300 ${
                        item.active ? "animate-pulse" : "group-hover:scale-110"
                      }`}
                    />
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
      <main className="p-4 md:p-6 lg:p-8 space-y-8 flex-1 bg-gray-200 md:ml-64 lg:ml-72 flex flex-col overflow-y-auto">
        {renderContent()}
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}