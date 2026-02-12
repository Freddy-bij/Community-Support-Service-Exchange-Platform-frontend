import { FiBarChart2 } from "react-icons/fi";
import type { SystemUsage } from "../../Serivices/Types/types";

interface UserStatisticsProps {
  systemUsage: SystemUsage;
}

const UserStatistics = ({ systemUsage }: UserStatisticsProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FiBarChart2 className="text-[#2C7A7B]" />
        User Statistics
      </h2>
      <div className="space-y-6">
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-blue-900">Total Users</p>
            <p className="text-3xl font-bold text-blue-600">{systemUsage.users.total}</p>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-3">
            <div className="bg-blue-600 h-3 rounded-full" style={{ width: '100%' }} />
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-xl border border-green-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-green-900">Active Users (30d)</p>
            <p className="text-3xl font-bold text-green-600">{systemUsage.users.activeUsers}</p>
          </div>
          <div className="w-full bg-green-200 rounded-full h-3">
            <div className="bg-green-600 h-3 rounded-full" style={{ width: `${(systemUsage.users.activeUsers / systemUsage.users.total) * 100}%` }} />
          </div>
          <p className="text-xs text-green-700 mt-2 font-medium">
            {Math.round((systemUsage.users.activeUsers / systemUsage.users.total) * 100)}% engagement rate
          </p>
        </div>

        <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-purple-900">Admin Users</p>
            <p className="text-3xl font-bold text-purple-600">{systemUsage.users.admins}</p>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-3">
            <div className=" h-3 rounded-full" style={{ width: `${(systemUsage.users.admins / systemUsage.users.total) * 100}%` }} />
          </div>
        </div>

        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-orange-900">New This Month</p>
            <p className="text-3xl font-bold text-orange-600">{systemUsage.users.newThisMonth}</p>
          </div>
          <div className="w-full bg-orange-200 rounded-full h-3">
            <div className="bg-orange-600 h-3 rounded-full" style={{ width: `${(systemUsage.users.newThisMonth / systemUsage.users.total) * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatistics;
