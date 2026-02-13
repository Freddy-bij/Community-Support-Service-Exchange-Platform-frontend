import { FiFileText } from "react-icons/fi";
import type { CategoryData } from "../../Serivices/Types/types";

interface CategoryChartProps {
  categories: CategoryData[];
}

const CategoryChart = ({ categories }: CategoryChartProps) => {
  const maxCount = Math.max(...categories.map(c => c.count));
  const totalCount = categories.reduce((sum, c) => sum + c.count, 0);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FiFileText className="text-[#2C7A7B]" />
        Requests by Category
      </h2>
      <div className="space-y-4">
        {categories.map((category, index) => {
          const percentage = (category.count / maxCount) * 100;
          
          return (
            <div key={category._id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-[#2C7A7B] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-lg">{category.categoryName}</p>
                    <p className="text-sm text-gray-500">{category.count} requests</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-[#2C7A7B]">{category.count}</p>
                  <p className="text-xs text-gray-500 font-medium">{Math.round((category.count / totalCount) * 100)}%</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-[#2C7A7B] h-3 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryChart;
