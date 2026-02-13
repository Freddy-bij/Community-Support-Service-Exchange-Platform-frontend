// import { FiActivity } from "react-icons/fi";
// import type { TimeBasedData } from "../../Serivices/Types/types";

// interface ActivityTableProps {
//   data: TimeBasedData[];
//   period: "daily" | "weekly" | "monthly";
//   range: number;
//   onPeriodChange: (period: "daily" | "weekly" | "monthly") => void;
//   onRangeChange: (range: number) => void;
// }

// const ActivityTable = ({ data, period, range, onPeriodChange, onRangeChange }: ActivityTableProps) => {
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
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-50 border-b-2 border-gray-100">
//               <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Date</th>
//               <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">Requests</th>
//               <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">Responses</th>
//               <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">New Users</th>
//               <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">Total Activity</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {data.map((item) => (
//               <tr key={item.date} className="hover:bg-gray-50 transition">
//                 <td className="px-6 py-4 text-sm font-semibold text-gray-900">{item.date}</td>
//                 <td className="px-6 py-4 text-right">
//                   <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-[#2C7A7B]/10 text-[#2C7A7B]">
//                     {item.requests}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-right">
//                   <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-gray-100 text-gray-700">
//                     {item.responses}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-right">
//                   <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-gray-100 text-gray-700">
//                     {item.newUsers}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-right">
//                   <span className="text-lg font-bold text-gray-900">
//                     {item.requests + item.responses + item.newUsers}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ActivityTable;


import { FiActivity, FiCalendar } from "react-icons/fi";
import type { TimeBasedData } from "../../Serivices/Types/types";

interface ActivityTableProps {
  data: TimeBasedData[];
  period: "daily" | "weekly" | "monthly";
  range: number;
  onPeriodChange: (period: "daily" | "weekly" | "monthly") => void;
  onRangeChange: (range: number) => void;
}

const ActivityTable = ({ data, period, range, onPeriodChange, onRangeChange }: ActivityTableProps) => {
  const safeData = data || [];

  // Calculate totals
  const totals = {
    requests: safeData.reduce((sum, item) => sum + item.requests, 0),
    responses: safeData.reduce((sum, item) => sum + item.responses, 0),
    newUsers: safeData.reduce((sum, item) => sum + item.newUsers, 0),
  };
  totals.total = totals.requests + totals.responses + totals.newUsers;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FiCalendar className="text-purple-600" size={24} />
              Activity Data Table
            </h2>
            <p className="text-sm text-gray-500 mt-1">Detailed breakdown of daily metrics</p>
          </div>
          <div className="flex gap-2">
            <select
              value={period}
              onChange={(e) => onPeriodChange(e.target.value as "daily" | "weekly" | "monthly")}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <select
              value={range}
              onChange={(e) => onRangeChange(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value={7}>Last 7 days</option>
              <option value={14}>Last 14 days</option>
              <option value={30}>Last 30 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                Requests
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                Responses
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                New Users
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                Total Activity
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {safeData.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <FiActivity className="mx-auto text-gray-300 text-3xl mb-3" />
                  <p className="text-gray-500 font-medium">No data available</p>
                  <p className="text-sm text-gray-400 mt-1">Data will appear here once recorded</p>
                </td>
              </tr>
            ) : (
              safeData.map((item, index) => {
                const total = item.requests + item.responses + item.newUsers;
                return (
                  <tr 
                    key={item.date} 
                    className="hover:bg-blue-50 transition-colors group"
                    style={{
                      animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`
                    }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        <span className="text-sm font-semibold text-gray-900">{item.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold bg-blue-100 text-blue-700 group-hover:bg-blue-200 transition-colors">
                        {item.requests}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold bg-green-100 text-green-700 group-hover:bg-green-200 transition-colors">
                        {item.responses}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold bg-gray-100 text-gray-700 group-hover:bg-gray-200 transition-colors">
                        {item.newUsers}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-lg font-bold text-gray-900">
                        {total}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
          {safeData.length > 0 && (
            <tfoot>
              <tr className="bg-gradient-to-r from-purple-50 to-blue-50 border-t-2 border-gray-200">
                <td className="px-6 py-4 text-sm font-bold text-gray-900">
                  TOTAL
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold bg-blue-600 text-white">
                    {totals.requests}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold bg-green-600 text-white">
                    {totals.responses}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold bg-gray-600 text-white">
                    {totals.newUsers}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-xl font-bold text-purple-700">
                    {totals.total}
                  </span>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      
    </div>
  );
};

export default ActivityTable;