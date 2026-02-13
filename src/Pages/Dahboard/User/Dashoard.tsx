
import { useState, useEffect } from "react";
import StatCard from "../../../shares/ui/statCart";
import { FiTrendingUp, FiMessageCircle, FiCheckCircle, FiStar, FiHome, FiMessageSquare, FiSearch, FiAward, FiSettings, FiLogOut, FiMenu, FiX, FiBell, FiChevronDown } from "react-icons/fi";
import { ChevronRight, Loader2, AlertCircle, Plus } from "lucide-react";
import logo from "../../../images/logo.png";
import LearderBoard from "./Components/LearderBoard";
import BrowserRequest from "./Components/BrowserRequest";
import RequestService from "./Services/RequestService";
import type { RequestType } from "./Services/Types/types";
import Responseservice from "./Services/Responseservice";
import CreateOfferModal from "../../../shares/ui/RequestModel";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myRequests, setMyRequests] = useState<RequestType[]>([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);
  const [totalResponses, setTotalResponses] = useState(0);
  const [error, setError] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const currentUser = (() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return { name: "User", createdAt: new Date().toISOString() };
      }
    }
    return { name: "User", createdAt: new Date().toISOString() };
  })();

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
    } catch {
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
      console.error(err);
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
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = "/auth";
  };

  const sidebarItems = [
    { icon: FiHome, label: "Dashboard", section: "home" },
    { icon: FiMessageSquare, label: "Messages", section: "messages" },
    { icon: FiSearch, label: "Browser Requests", section: "browser-request" },
    { icon: FiAward, label: "Leaderboard", section: "learderboard" },
    { icon: FiSettings, label: "Settings", section: "settings" },
    { icon: FiLogOut, label: "Logout", section: "logout" },
  ];

  const activeRequestsCount = myRequests.filter(r => r.status === "APPROVED").length;
  const pendingRequestsCount = myRequests.filter(r => r.status === "PENDING").length;
  const completedRequestsCount = myRequests.filter(r => r.status === "REJECTED").length;
  const totalLikes = myRequests.reduce((sum, req) => sum + req.likes, 0);
  const averageRating = myRequests.length > 0 ? (totalLikes / myRequests.length).toFixed(1) : "0.0";

  const renderContent = () => {
    switch (activeSection) {
      case "settings": return <div className="p-6 bg-white rounded-2xl border">Settings Component</div>;
      case "learderboard": return <LearderBoard />;
      case "browser-request": return <BrowserRequest />;
      case "messages": return <div className="animate-in fade-in duration-500"><div className="p-6 bg-white rounded-2xl border">Messages Component</div></div>;
      default:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">User Dashboard</h1>
                <p className="text-gray-500 mt-1">Manage your requests and community interactions.</p>
              </div>
              <button 
                className="bg-[#2C7A7B] text-white px-6 py-3 rounded-2xl hover:bg-[#236364] shadow-lg shadow-teal-900/20 transition-all active:scale-95 flex items-center gap-2 font-bold" 
                onClick={() => setIsModalOpen(true)}
              >
                <Plus size={20} />
                New Request
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-red-700 shadow-sm">
                <AlertCircle size={20} />
                <p className="text-sm font-semibold">{error}</p>
              </div>
            )}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#2C7A7B] to-[#37507E] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {currentUser?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{currentUser?.name || "Member"}</h3>
                  <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1">⭐ <b className="text-gray-800">{averageRating}</b> Rating</span>
                    <span>|</span>
                    <span>Joined {new Date(currentUser?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
              <button className="w-full sm:w-auto px-6 py-2.5 bg-gray-50 text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-100 transition-all">
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Active Requests" value={activeRequestsCount} subtitle={`${pendingRequestsCount} pending`} icon={<FiTrendingUp />} />
              <StatCard title="Total Responses" value={totalResponses} subtitle="Contributions" icon={<FiMessageCircle />} />
              <StatCard title="Completed" value={completedRequestsCount} subtitle="Fulfilled" icon={<FiCheckCircle />} />
              <StatCard title="Avg. Rating" value={averageRating} subtitle="Community Score" icon={<FiStar />} />
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-800">Your Recent Requests</h2>
                <button onClick={() => setActiveSection("browser-request")} className="text-[#2C7A7B] text-sm font-bold hover:underline">View All</button>
              </div>

              {isLoadingRequests ? (
                <div className="p-12 flex flex-col items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-[#2C7A7B] mb-2" />
                  <p className="text-gray-400">Syncing your requests...</p>
                </div>
              ) : myRequests.length === 0 ? (
                <div className="p-12 text-center text-gray-400">No requests found. Start by creating one!</div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {myRequests.slice(0, 5).map((request) => (
                    <div key={request.id} className="p-5 hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2 items-center">
                            <h3 className="font-bold text-gray-900 group-hover:text-[#2C7A7B] transition-colors">{request.title}</h3>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${request.status === "APPROVED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{request.status}</span>
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-1">{request.description}</p>
                          <div className="flex items-center gap-4 text-[11px] text-gray-400 font-medium">
                            <span>📍 {request.location}</span>
                            <span>❤️ {request.likes} Likes</span>
                            <span>📅 {new Date(request.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <ChevronRight className="text-gray-300 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 flex bg-[#F8FAFC] overflow-hidden z-[9999]">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
      `}</style>

      <aside className={`fixed inset-y-0 left-0 z-[100] w-64 lg:w-72 bg-[#2C7A7B] shadow-2xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="flex items-center justify-between bg-black/10 px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-xl"><img src={logo} alt="Logo" className="w-8 h-8" /></div>
            <div className="text-white"><h1 className="font-bold text-base">SupportHub</h1><p className="text-[10px] opacity-60 uppercase font-bold tracking-widest">User Portal</p></div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-white"><FiX size={24} /></button>
        </div>
        
        <nav className="mt-6 px-4 h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.section}>
                <button
                  onClick={() => handleSidebarClick(item.section)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 text-sm rounded-xl transition-all duration-200 group ${activeSection === item.section ? "bg-white text-[#2C7A7B] font-bold shadow-lg" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </div>
                  {activeSection === item.section && <div className="w-1.5 h-1.5 rounded-full bg-[#2C7A7B]" />}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><FiMenu size={22} /></button>
           
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <button className="relative p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl">
                <FiBell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-gray-100 hidden sm:block" />
            <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-800 leading-none">{currentUser?.name || "Member"}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-tighter">Gold Contributor</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2C7A7B] to-[#37507E] flex items-center justify-center text-white font-bold shadow-md">{currentUser?.name?.charAt(0).toUpperCase()}</div>
                <FiChevronDown className="text-gray-400" />
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-row overflow-hidden">
           <div className="hidden md:block md:w-64 lg:w-72 shrink-0 h-full" />
           <main className="flex-1 h-full overflow-y-auto p-4 md:p-8 lg:p-10">
              <div className="max-w-7xl mx-auto w-full pb-10">
                {renderContent()}
              </div>
           </main>
        </div>
      </div>

      {isModalOpen && (
        <CreateOfferModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            fetchMyRequests();
            setIsModalOpen(false);
          }}
        />
      )}
      
      {showLogoutModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">!</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Confirm Logout</h2>
            <p className="text-gray-500 mb-8">Are you sure you want to exit your dashboard?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutModal(false)} className="flex-1 px-4 py-3 bg-gray-50 text-gray-600 font-bold rounded-2xl hover:bg-gray-100 transition">Cancel</button>
              <button onClick={handleLogout} className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 shadow-lg shadow-red-200 transition active:scale-95">Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}