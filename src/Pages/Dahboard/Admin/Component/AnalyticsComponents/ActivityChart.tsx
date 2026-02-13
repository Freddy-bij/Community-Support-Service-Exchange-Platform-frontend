// import { FiActivity } from "react-icons/fi";
// import type { TimeBasedData } from "../../Serivices/Types/types";

// interface ActivityChartProps {
//   data: TimeBasedData[];
//   period: "daily" | "weekly" | "monthly";
//   range: number;
//   onPeriodChange: (period: "daily" | "weekly" | "monthly") => void;
//   onRangeChange: (range: number) => void;
// }

// const ActivityChart = ({ data, period, range, onPeriodChange, onRangeChange }: ActivityChartProps) => {
//   const maxValue = Math.max(...data.map(item => item.requests + item.responses + item.newUsers), 1);

//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
//         <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//           <FiActivity className="text-[#2C7A7B]" />
//           Activity Over Time
//         </h2>
//         <div className="flex gap-2">
//           <select
//             value={period}
//             onChange={(e) => onPeriodChange(e.target.value as "daily" | "weekly" | "monthly")}
//             className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2C7A7B] focus:border-transparent bg-white"
//           >
//             <option value="daily">Daily</option>
//             <option value="weekly">Weekly</option>
//             <option value="monthly">Monthly</option>
//           </select>
//           <select
//             value={range}
//             onChange={(e) => onRangeChange(Number(e.target.value))}
//             className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2C7A7B] focus:border-transparent bg-white"
//           >
//             <option value={7}>Last 7 days</option>
//             <option value={14}>Last 14 days</option>
//             <option value={30}>Last 30 days</option>
//           </select>
//         </div>
//       </div>

//       {/* Legend */}
//       <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
//         <div className="flex items-center gap-2">
//           <div className="w-4 h-4 bg-[#2C7A7B] rounded"></div>
//           <span className="text-sm font-medium text-gray-700">Requests</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-4 h-4 bg-[#10B981] rounded"></div>
//           <span className="text-sm font-medium text-gray-700">Responses</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-4 h-4 bg-gray-500 rounded"></div>
//           <span className="text-sm font-medium text-gray-700">New Users</span>
//         </div>
//       </div>

//       {/* Chart */}
//       <div className="space-y-4">
//         {data.map((item) => {
//           const total = item.requests + item.responses + item.newUsers;
//           const requestsPercent = (item.requests / maxValue) * 100;
//           const responsesPercent = (item.responses / maxValue) * 100;
//           const usersPercent = (item.newUsers / maxValue) * 100;

//           return (
//             <div key={item.date} className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm font-semibold text-gray-900">{item.date}</span>
//                 <span className="text-sm font-bold text-[#2C7A7B]">Total: {total}</span>
//               </div>
              
//               <div className="space-y-1">
//                 {/* Requests Bar */}
//                 <div className="flex items-center gap-3">
//                   <span className="text-xs text-gray-500 w-20">Requests</span>
//                   <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
//                     <div
//                       className="bg-[#2C7A7B] h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
//                       style={{ width: `${requestsPercent}%` }}
//                     >
//                       {item.requests > 0 && (
//                         <span className="text-xs font-bold text-white">{item.requests}</span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Responses Bar */}
//                 <div className="flex items-center gap-3">
//                   <span className="text-xs text-gray-500 w-20">Responses</span>
//                   <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
//                     <div
//                       className="bg-[#10B981] h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
//                       style={{ width: `${responsesPercent}%` }}
//                     >
//                       {item.responses > 0 && (
//                         <span className="text-xs font-bold text-white">{item.responses}</span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* New Users Bar */}
//                 <div className="flex items-center gap-3">
//                   <span className="text-xs text-gray-500 w-20">New Users</span>
//                   <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
//                     <div
//                       className="bg-gray-500 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
//                       style={{ width: `${usersPercent}%` }}
//                     >
//                       {item.newUsers > 0 && (
//                         <span className="text-xs font-bold text-white">{item.newUsers}</span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Summary */}
//       <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4">
//         <div className="text-center p-4 bg-[#2C7A7B]/5 rounded-xl">
//           <p className="text-sm text-gray-500 font-medium">Total Requests</p>
//           <p className="text-2xl font-bold text-[#2C7A7B] mt-1">
//             {data.reduce((sum, item) => sum + item.requests, 0)}
//           </p>
//         </div>
//         <div className="text-center p-4 bg-[#10B981]/5 rounded-xl">
//           <p className="text-sm text-gray-500 font-medium">Total Responses</p>
//           <p className="text-2xl font-bold text-[#10B981] mt-1">
//             {data.reduce((sum, item) => sum + item.responses, 0)}
//           </p>
//         </div>
//         <div className="text-center p-4 bg-gray-50 rounded-xl">
//           <p className="text-sm text-gray-500 font-medium">Total New Users</p>
//           <p className="text-2xl font-bold text-gray-500 mt-1">
//             {data.reduce((sum, item) => sum + item.newUsers, 0)}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActivityChart;

import { FiActivity } from "react-icons/fi";
import type { TimeBasedData } from "../../Serivices/Types/types";
import { useMemo } from "react";

interface ActivityChartProps {
  data: TimeBasedData[];
  period: "daily" | "weekly" | "monthly";
  range: number;
  onPeriodChange: (period: "daily" | "weekly" | "monthly") => void;
  onRangeChange: (range: number) => void;
}

const ActivityChart = ({ data, period, range, onPeriodChange, onRangeChange }: ActivityChartProps) => {
  const safeData = data || [];

  const maxValue = useMemo(() => {
    if (safeData.length === 0) return 1;
    return Math.max(...safeData.map(item => Math.max(item.requests, item.responses, item.newUsers)), 1);
  }, [safeData]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FiActivity className="text-blue-600" size={24} />
              Activity Over Time
            </h2>
            <p className="text-sm text-gray-500 mt-1">Track requests, responses, and user growth</p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <select
              value={period}
              onChange={(e) => onPeriodChange(e.target.value as "daily" | "weekly" | "monthly")}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>

            <select
              value={range}
              onChange={(e) => onRangeChange(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value={7}>Last 7 days</option>
              <option value={14}>Last 14 days</option>
              <option value={30}>Last 30 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chart Content */}
      <div className="p-6">
        {safeData.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiActivity className="text-gray-400 text-2xl" />
            </div>
            <p className="text-gray-900 font-semibold text-lg">No activity data available</p>
            <p className="text-sm text-gray-500 mt-2">Data will appear here once activity is recorded</p>
          </div>
        ) : (
          /* Grouped Bar Chart */
          <div>
            <div className="flex items-center justify-center gap-6 mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-600"></div>
                <span className="text-sm font-semibold text-gray-700">Requests</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-500"></div>
                <span className="text-sm font-semibold text-gray-700">Responses</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-400"></div>
                <span className="text-sm font-semibold text-gray-700">New Users</span>
              </div>
            </div>

            <div className="relative" style={{ height: "320px" }}>
              {/* Y-axis grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-t border-gray-200"></div>
                ))}
              </div>

              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-600 font-medium pr-3">
                {[4, 3, 2, 1, 0].map((i) => (
                  <span key={i}>{Math.round((maxValue / 4) * i)}</span>
                ))}
              </div>

              {/* Bars */}
              <div className="absolute inset-0 left-14 flex items-end justify-around pb-10">
                {safeData.map((item, index) => {
                  const requestHeight = (item.requests / maxValue) * 100;
                  const responseHeight = (item.responses / maxValue) * 100;
                  const userHeight = (item.newUsers / maxValue) * 100;

                  return (
                    <div key={index} className="flex items-end gap-1 flex-1 max-w-[70px] group">
                      {/* Requests bar */}
                      <div
                        className="bg-blue-600 rounded-t flex-1 transition-all duration-300 hover:bg-blue-700 cursor-pointer relative"
                        style={{ height: `${requestHeight}%`, minHeight: item.requests > 0 ? '4px' : '0' }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          {item.requests} req
                        </div>
                      </div>
                      {/* Responses bar */}
                      <div
                        className="bg-green-500 rounded-t flex-1 transition-all duration-300 hover:bg-green-600 cursor-pointer relative"
                        style={{ height: `${responseHeight}%`, minHeight: item.responses > 0 ? '4px' : '0' }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          {item.responses} res
                        </div>
                      </div>
                      {/* New Users bar */}
                      <div
                        className="bg-gray-400 rounded-t flex-1 transition-all duration-300 hover:bg-gray-500 cursor-pointer relative"
                        style={{ height: `${userHeight}%`, minHeight: item.newUsers > 0 ? '4px' : '0' }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          {item.newUsers} users
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-14 right-0 flex justify-around">
                {safeData.map((item, i) => (
                  <span key={i} className="text-xs text-gray-600 text-center flex-1 font-medium">
                    {item.date.split('-').slice(1).join('/')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityChart;
