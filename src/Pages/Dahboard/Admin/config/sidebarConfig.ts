import { FiHome, FiFileText, FiGrid, FiUsers, FiSettings, FiLogOut } from "react-icons/fi";
import { GrAnalytics } from "react-icons/gr";
import { SiAbusedotch } from "react-icons/si";

export const adminSidebarItems = [
  { icon: FiHome, label: "Dashboard", section: "home", path: "/admin" },
  { icon: FiFileText, label: "Requests", section: "requests", path: "/admin/requests" },
  { icon: FiGrid, label: "Categories", section: "categories", path: "/admin/categories" },
  { icon: SiAbusedotch, label: "Abuse Reports", section: "abuse-reports", path: "/admin/abuse-reports" },
  { icon: FiUsers, label: "Users", section: "users", path: "/admin/users" },
  { icon: GrAnalytics, label: "Analytics", section: "analytics", path: "/admin/analytics" },
  { icon: FiSettings, label: "Settings", section: "settings", path: "/admin/settings" },
  { icon: FiLogOut, label: "Logout", section: "logout", path: "#" },
];
