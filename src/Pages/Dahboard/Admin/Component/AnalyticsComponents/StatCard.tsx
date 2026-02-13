import type { ComponentType } from "react";

interface StatCardProps {
  title: string;
  value: number;
  subtitle: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  gradientFrom: string;
  gradientTo: string;
  secondaryIcon: ComponentType<{ size?: number; className?: string }>;
}

const StatCard = ({ title, value, subtitle, icon: Icon, secondaryIcon: SecondaryIcon }: StatCardProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-[#2C7A7B]/10 rounded-xl flex items-center justify-center">
          <Icon size={24} className="text-[#2C7A7B]" />
        </div>
        <SecondaryIcon className="text-gray-400" size={20} />
      </div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <p className="text-4xl font-bold text-gray-900 mt-2">{value}</p>
      <p className="text-gray-500 text-xs mt-2">{subtitle}</p>
    </div>
  );
};

export default StatCard;
