import { FiCheckCircle, FiFileText, FiAlertCircle, FiClock } from "react-icons/fi";
import type { ResolutionRates } from "../../Serivices/Types/types";

interface ResolutionMetricsProps {
  resolutionRates: ResolutionRates;
}

const ResolutionMetrics = ({ resolutionRates }: ResolutionMetricsProps) => {
  const formatResolutionTime = (timeData: string | { hours?: number; days?: number; minutes?: number }) => {
    if (typeof timeData === 'string') {
      return timeData;
    }
    
    const parts = [];
    if (timeData.days) parts.push(`${timeData.days}d`);
    if (timeData.hours) parts.push(`${timeData.hours}h`);
    if (timeData.minutes) parts.push(`${timeData.minutes}m`);
    
    return parts.length > 0 ? parts.join(' ') : '0m';
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FiCheckCircle className="text-[#2C7A7B]" />
        Request Resolution Metrics
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <FiFileText className="text-gray-500" size={28} />
          </div>
          <p className="text-sm text-gray-500 font-medium">Total</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{resolutionRates.totalRequests}</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-[#2C7A7B]/10 rounded-full flex items-center justify-center mb-3">
            <FiCheckCircle className="text-[#10B981]" size={28} />
          </div>
          <p className="text-sm text-gray-500 font-medium">Approved</p>
          <p className="text-3xl font-bold text-[#2C7A7B] mt-1">{resolutionRates.approvedRequests}</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-red-200 rounded-full flex items-center justify-center mb-3">
            <FiAlertCircle className="text-red-400" size={28} />
          </div>
          <p className="text-sm text-gray-500 font-medium">Rejected</p>
          <p className="text-3xl font-bold text-gray-500 mt-1">{resolutionRates.rejectedRequests}</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-[#F59E0B]/10 rounded-full flex items-center justify-center mb-3">
            <FiClock className="text-[#F59E0B]" size={28} />
          </div>
          <p className="text-sm text-gray-500 font-medium">Pending</p>
          <p className="text-3xl font-bold text-gray-500 mt-1">{resolutionRates.pendingRequests}</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-[#2C7A7B]/10 rounded-full flex items-center justify-center mb-3">
            <FiCheckCircle className="text-[#2C7A7B]" size={28} />
          </div>
          <p className="text-sm text-gray-500 font-medium">Resolution Rate</p>
          <p className="text-3xl font-bold text-[#2C7A7B] mt-1">{resolutionRates.resolutionRate}</p>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-100 bg-gray-50 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiClock className="text-gray-500" size={24} />
            <div>
              <p className="text-sm text-gray-500 font-medium">Average Resolution Time</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatResolutionTime(resolutionRates.averageResolutionTime)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Efficiency Score</p>
            <p className="text-lg font-bold text-[#2C7A7B]">
              {resolutionRates.totalRequests > 0 
                ? Math.round((resolutionRates.approvedRequests / resolutionRates.totalRequests) * 100) 
                : 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResolutionMetrics;
