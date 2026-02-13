import { useEffect, useState, useCallback } from "react";
import { FiUsers, FiFileText, FiDownload, FiActivity, FiBarChart2, FiTrendingUp, FiCheckCircle, FiMessageCircle, FiAlertCircle } from "react-icons/fi";
import { Loader2, AlertCircle } from "lucide-react";
import AnalyticsService from "../Serivices/Analyticsservice";
import type { ResolutionRates, SystemUsage, TimeBasedData } from "../Serivices/Types/types";
import StatCard from "./AnalyticsComponents/StatCard";
import ResolutionMetrics from "./AnalyticsComponents/ResolutionMetrics";
import ActivityChart from "./AnalyticsComponents/ActivityChart";
import ExportSection from "./AnalyticsComponents/ExportSection";

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  const [range, setRange] = useState(7);
  const [activeTab, setActiveTab] = useState<"overview" | "activity">("overview");

  const [resolutionRates, setResolutionRates] = useState<ResolutionRates | null>(null);
  const [systemUsage, setSystemUsage] = useState<SystemUsage | null>(null);
  const [timeBasedData, setTimeBasedData] = useState<TimeBasedData[]>([]);

  const fetchTimeBasedActivity = useCallback(async () => {
    try {
      const result = await AnalyticsService.getTimeBasedActivity(period, range);
      setTimeBasedData(result.data);
    } catch (err) {
      console.error("Failed to fetch time-based activity:", err);
    }
  }, [period, range]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  useEffect(() => {
    fetchTimeBasedActivity();
  }, [fetchTimeBasedActivity]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const [resolutionData, systemData] = await Promise.all([
        AnalyticsService.getResolutionRates(),
        AnalyticsService.getSystemUsage()
      ]);

      setResolutionRates(resolutionData);
      setSystemUsage(systemData);
    } catch (err) {
      setError("Failed to load analytics data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (type: 'requests' | 'users' | 'responses' | 'reports', format: 'csv' | 'json') => {
    try {
      if (format === 'csv') {
        await AnalyticsService.exportToCSV(type);
      } else {
        await AnalyticsService.exportToJSON(type);
      }
    } catch (err) {
      console.error("Export failed:", err);
      alert("Export failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-10 h-10 animate-spin text-[#2C7A7B]" />
        <span className="ml-3 text-gray-600 font-medium">Loading analytics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-500 mt-1">Comprehensive platform insights and metrics</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleExport('requests', 'csv')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#2C7A7B] text-white rounded-xl hover:bg-[#235E5F] transition font-semibold shadow-sm"
          >
            <FiDownload size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-red-700">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-semibold">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm  p-1 flex gap-1">
        {[
          { id: "overview", label: "Overview", icon: FiBarChart2 },
          { id: "activity", label: "Activity", icon: FiActivity }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "overview" | "activity")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-[#2C7A7B] text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <tab.icon size={18} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === "overview" && systemUsage && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Users"
              value={systemUsage.users.total}
              subtitle={`${systemUsage.users.activeUsers} active users`}
              icon={FiUsers}
              gradientFrom="from-blue-500"
              gradientTo="to-blue-600"
              secondaryIcon={FiTrendingUp}
            />
            <StatCard
              title="Total Requests"
              value={systemUsage.requests.total}
              subtitle="All time requests"
              icon={FiFileText}
              gradientFrom="from-green-500"
              gradientTo="to-green-600"
              secondaryIcon={FiCheckCircle}
            />
            <StatCard
              title="Total Responses"
              value={systemUsage.responses.total}
              subtitle="Community engagement"
              icon={FiMessageCircle}
              gradientFrom="from-purple-500"
              gradientTo="to-purple-600"
              secondaryIcon={FiActivity}
            />
            <StatCard
              title="New This Month"
              value={systemUsage.users.newThisMonth}
              subtitle="User growth"
              icon={FiTrendingUp}
              gradientFrom="from-orange-500"
              gradientTo="to-orange-600"
              secondaryIcon={FiAlertCircle}
            />
          </div>

          {resolutionRates && <ResolutionMetrics resolutionRates={resolutionRates} />}
        </>
      )}

      {activeTab === "activity" && (
        <ActivityChart
          data={timeBasedData}
          period={period}
          range={range}
          onPeriodChange={setPeriod}
          onRangeChange={setRange}
        />
      )}

      
      <ExportSection onExport={handleExport} />
    </div>
  );
};

export default Analytics;
