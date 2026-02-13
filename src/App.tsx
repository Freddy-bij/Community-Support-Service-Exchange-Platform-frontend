import { Route, Routes } from "react-router";
import Auth from "./Pages/Authentication/Auth";
import Layout from "./shares/Layout/Layout";
import Home from "./Pages/Home/Home";
import AdminDashboardLayout from "./Pages/Dahboard/Admin/AdminDashboardLayout";
import UserDashboardLayout from "./Pages/Dahboard/User/UserDashboardLayout";
import RequestsManagement from "./Pages/Dahboard/Admin/Component/RequestsManagement";
import CategoriesManagement from "./Pages/Dahboard/Admin/Component/CategoriesManagement";
import AbuseReportsManagement from "./Pages/Dahboard/Admin/Component/AbuseReportsManagement";
import UsersManagement from "./Pages/Dahboard/Admin/Component/UsersManagement";
import Analytics from "./Pages/Dahboard/Admin/Component/Analytics";
import AdminDashboardHome from "./Pages/Dahboard/Admin/Component/AdminDashboardHome";
import BrowserRequest from "./Pages/Dahboard/User/Components/BrowserRequest";
import LearderBoard from "./Pages/Dahboard/User/Components/LearderBoard";
import Messages from "./Pages/Dahboard/User/Components/Messages";
import UserDashboardHome from "./Pages/Dahboard/User/Components/UserDashboardHome";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Route>

      <Route path="/admin" element={<AdminDashboardLayout />}>
        <Route index element={<AdminDashboardHome />} />
        <Route path="requests" element={<RequestsManagement />} />
        <Route path="categories" element={<CategoriesManagement />} />
        <Route path="abuse-reports" element={<AbuseReportsManagement />} />
        <Route path="users" element={<UsersManagement />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<div>Admin Settings</div>} />
      </Route>


      <Route path="/dashboard" element={<UserDashboardLayout />}>
        <Route index element={<UserDashboardHome />} />
        <Route path="messages" element={<Messages />} />
        <Route path="browse" element={<BrowserRequest />} />
        <Route path="leaderboard" element={<LearderBoard />} />
        <Route path="settings" element={<div>User Settings</div>} />
      </Route>
    </Routes>
  );
};

export default App;
