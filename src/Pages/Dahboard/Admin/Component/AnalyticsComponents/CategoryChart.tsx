// import { FiFileText } from "react-icons/fi";
// import type { CategoryData } from "../../Serivices/Types/types";

// interface CategoryChartProps {
//   categories: CategoryData[];
// }

// const CategoryChart = ({ categories }: CategoryChartProps) => {
//   const maxCount = Math.max(...categories.map(c => c.count));
//   const totalCount = categories.reduce((sum, c) => sum + c.count, 0);

//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//       <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//         <FiFileText className="text-[#2C7A7B]" />
//         Requests by Category
//       </h2>
//       <div className="space-y-4">
//         {categories.map((category, index) => {
//           const percentage = (category.count / maxCount) * 100;
          
//           return (
//             <div key={category._id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition border border-gray-100">
//               <div className="flex items-center justify-between mb-3">
//                 <div className="flex items-center gap-4 flex-1">
//                   <div className="w-12 h-12 rounded-xl bg-[#2C7A7B] flex items-center justify-center text-white font-bold text-lg shadow-sm">
//                     {index + 1}
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-bold text-gray-900 text-lg">{category.categoryName}</p>
//                     <p className="text-sm text-gray-500">{category.count} requests</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-3xl font-bold text-[#2C7A7B]">{category.count}</p>
//                   <p className="text-xs text-gray-500 font-medium">{Math.round((category.count / totalCount) * 100)}%</p>
//                 </div>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <div
//                   className="bg-[#2C7A7B] h-3 rounded-full transition-all duration-500"
//                   style={{ width: `${percentage}%` }}
//                 />
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default CategoryChart;

import { FiFileText, FiTrendingUp, FiAward } from "react-icons/fi";
import type { CategoryData } from "../../Serivices/Types/types";

interface CategoryChartProps {
  categories: CategoryData[];
}

const CategoryChart = ({ categories }: CategoryChartProps) => {
  const safeCategories = categories || [];
  
  if (safeCategories.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FiFileText className="text-teal-600" size={24} />
            Requests by Category
          </h2>
          <p className="text-sm text-gray-500 mt-1">Top performing categories</p>
        </div>
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiFileText className="text-gray-400 text-2xl" />
          </div>
          <p className="text-gray-900 font-semibold text-lg">No category data available</p>
          <p className="text-sm text-gray-500 mt-2">Categories will appear here once requests are created</p>
        </div>
      </div>
    );
  }

  const maxCount = Math.max(...safeCategories.map(c => c.count), 1);
  const totalCount = safeCategories.reduce((sum, c) => sum + c.count, 0);

  // Color palette for categories
  const colors = [
    { bg: 'from-teal-500 to-teal-600', text: 'text-teal-600', badge: 'bg-teal-600', light: 'bg-teal-50', ring: 'ring-teal-100' },
    { bg: 'from-blue-500 to-blue-600', text: 'text-blue-600', badge: 'bg-blue-600', light: 'bg-blue-50', ring: 'ring-blue-100' },
    { bg: 'from-purple-500 to-purple-600', text: 'text-purple-600', badge: 'bg-purple-600', light: 'bg-purple-50', ring: 'ring-purple-100' },
    { bg: 'from-pink-500 to-pink-600', text: 'text-pink-600', badge: 'bg-pink-600', light: 'bg-pink-50', ring: 'ring-pink-100' },
    { bg: 'from-orange-500 to-orange-600', text: 'text-orange-600', badge: 'bg-orange-600', light: 'bg-orange-50', ring: 'ring-orange-100' },
    { bg: 'from-green-500 to-green-600', text: 'text-green-600', badge: 'bg-green-600', light: 'bg-green-50', ring: 'ring-green-100' },
    { bg: 'from-indigo-500 to-indigo-600', text: 'text-indigo-600', badge: 'bg-indigo-600', light: 'bg-indigo-50', ring: 'ring-indigo-100' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FiFileText className="text-teal-600" size={24} />
              Requests by Category
            </h2>
            <p className="text-sm text-gray-500 mt-1">Top {safeCategories.length} performing categories</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-teal-600">{totalCount}</p>
            <p className="text-xs text-gray-500 font-medium">Total Requests</p>
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className="p-6 space-y-4">
        {safeCategories.map((category, index) => {
          const percentage = ((category.count / totalCount) * 100).toFixed(1);
          const barWidth = (category.count / maxCount) * 100;
          const color = colors[index % colors.length];
          
          return (
            <div 
              key={category._id} 
              className={`p-5 rounded-xl border-2 ${color.ring} ${color.light} hover:shadow-md transition-all duration-300 group`}
              style={{
                animation: `slideIn 0.4s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                {/* Rank Badge */}
                <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${color.bg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  {index < 3 ? (
                    <FiAward className="text-white text-xl" />
                  ) : (
                    <span className="text-white font-bold text-xl">{index + 1}</span>
                  )}
                  {index === 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-xs">🏆</span>
                    </div>
                  )}
                </div>

                {/* Category Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-gray-900 text-lg">{category.categoryName}</h3>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${color.text}`}>{category.count}</p>
                        <p className="text-xs text-gray-500 font-medium">requests</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiTrendingUp size={14} className={color.text} />
                    <span className="font-semibold">{percentage}%</span>
                    <span className="text-gray-400">of total</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${color.bg} rounded-full transition-all duration-700 ease-out group-hover:shadow-lg`}
                  style={{ width: `${barWidth}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Summary */}
      {safeCategories.length > 0 && (
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse"></div>
              <span className="text-gray-600 font-medium">
                Showing top {safeCategories.length} {safeCategories.length === 1 ? 'category' : 'categories'}
              </span>
            </div>
            <div className="text-gray-500 font-medium">
              Total: <span className="text-teal-600 font-bold">{totalCount}</span> requests
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CategoryChart;

