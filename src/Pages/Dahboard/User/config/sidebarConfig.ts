import { FiHome, FiMessageSquare, FiSearch, FiAward, FiSettings, FiLogOut } from "react-icons/fi";

export const userSidebarItems = [
  { icon: FiHome, label: "Dashboard", section: "home", path: "/dashboard" },
  { icon: FiMessageSquare, label: "Messages", section: "messages", path: "/dashboard/messages" },
  { icon: FiSearch, label: "Browse Requests", section: "browser-request", path: "/dashboard/browse" },
  { icon: FiAward, label: "Leaderboard", section: "leaderboard", path: "/dashboard/leaderboard" },
  { icon: FiSettings, label: "Settings", section: "settings", path: "/dashboard/settings" },
  { icon: FiLogOut, label: "Logout", section: "logout", path: "#" },
];
