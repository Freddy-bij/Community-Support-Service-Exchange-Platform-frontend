import { FiActivity } from "react-icons/fi";
import type { TimeBasedData } from "../../Serivices/Types/types";

interface ActivityChartProps {
  data: TimeBasedData[];
  period: "daily" | "weekly" | "monthly";
  range: number;
  onPeriodChange: (period: "daily" | "weekly" | "monthly") => void;
  onRangeChange: (range: number) => void;
}

const ActivityChart = ({ data, period, range, onPeriodChange, onRangeChange }: ActivityChartProps) => {
  const maxValue = Math.max(...data.map(item => item.requests + item.responses + item.newUsers), 1);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <FiActivity className="text-[#2C7A7B]" />
          Activity Over Time
        </h2>
        <div className="flex gap-2">
          <select
            value={period}
            onChange={(e) => onPeriodChange(e.target.value as "daily" | "weekly" | "monthly")}
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2C7A7B] focus:border-transparent bg-white"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <select
            value={range}
            onChange={(e) => onRangeChange(Number(e.target.value))}
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2C7A7B] focus:border-transparent bg-white"
          >
            <option value={7}>Last 7 days</option>
            <option value={14}>Last 14 days</option>
            <option value={30}>Last 30 days</option>
          </select>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#2C7A7B] rounded"></div>
          <span className="text-sm font-medium text-gray-700">Requests</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <span className="text-sm font-medium text-gray-700">Responses</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <span className="text-sm font-medium text-gray-700">New Users</span>
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-4">
        {data.map((item) => {
          const total = item.requests + item.responses + item.newUsers;
          const requestsPercent = (item.requests / maxValue) * 100;
          const responsesPercent = (item.responses / maxValue) * 100;
          const usersPercent = (item.newUsers / maxValue) * 100;

          return (
            <div key={item.date} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">{item.date}</span>
                <span className="text-sm font-bold text-[#2C7A7B]">Total: {total}</span>
              </div>
              
              <div className="space-y-1">
                {/* Requests Bar */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-20">Requests</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="bg-[#2C7A7B] h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                      style={{ width: `${requestsPercent}%` }}
                    >
                      {item.requests > 0 && (
                        <span className="text-xs font-bold text-white">{item.requests}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Responses Bar */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-20">Responses</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="bg-gray-400 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                      style={{ width: `${responsesPercent}%` }}
                    >
                      {item.responses > 0 && (
                        <span className="text-xs font-bold text-white">{item.responses}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* New Users Bar */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-20">New Users</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="bg-gray-300 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                      style={{ width: `${usersPercent}%` }}
                    >
                      {item.newUsers > 0 && (
                        <span className="text-xs font-bold text-gray-700">{item.newUsers}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-[#2C7A7B]/5 rounded-xl">
          <p className="text-sm text-gray-500 font-medium">Total Requests</p>
          <p className="text-2xl font-bold text-[#2C7A7B] mt-1">
            {data.reduce((sum, item) => sum + item.requests, 0)}
          </p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-500 font-medium">Total Responses</p>
          <p className="text-2xl font-bold text-gray-700 mt-1">
            {data.reduce((sum, item) => sum + item.responses, 0)}
          </p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-500 font-medium">Total New Users</p>
          <p className="text-2xl font-bold text-gray-700 mt-1">
            {data.reduce((sum, item) => sum + item.newUsers, 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;
