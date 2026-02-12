import type { ComponentType } from "react";


interface StatCardProps {
  title: string;
  value: number;
  subtitle: string;
  icon: ComponentType<{ size?: number }>;
  secondaryIcon: ComponentType<{ size?: number; className?: string }>;
}

const StatCard = ({ title, value, subtitle, icon: Icon, secondaryIcon: SecondaryIcon }: StatCardProps) => {
  return (
    <div className={`bg-white rounded-2xl p-6 text-[#2C7A7B] shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gray-400 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <Icon size={24} />
        </div>
        <SecondaryIcon className="text-white/60" size={20} />
      </div>
      <p className="text-gray-400 text-sm font-medium">{title}</p>
      <p className="text-4xl font-bold mt-2">{value}</p>
      <p className="text-white/80 text-xs mt-2">{subtitle}</p>
    </div>
  );
};

export default StatCard;
