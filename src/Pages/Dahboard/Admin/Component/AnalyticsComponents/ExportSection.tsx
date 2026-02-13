import { FiDownload } from "react-icons/fi";

interface ExportSectionProps {
  onExport: (type: 'requests' | 'users' | 'responses' | 'reports', format: 'csv') => void;
}

const ExportSection = ({ onExport }: ExportSectionProps) => {
  const exportTypes: Array<'requests' | 'users' | 'responses' | 'reports'> = ['requests', 'users', 'responses', 'reports'];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
        <FiDownload className="text-[#2C7A7B]" />
        Export Analytics Data
      </h2>
      <p className="text-gray-500 mb-6">Download comprehensive reports in CSV format</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {exportTypes.map((type) => (
          <div key={type} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="font-bold text-gray-900 mb-3 capitalize text-lg">{type}</p>
            <button
              onClick={() => onExport(type, 'csv')}
              className="w-full px-3 py-2 bg-[#2C7A7B] text-white hover:bg-[#235E5F] rounded-lg text-sm font-bold transition shadow-sm"
            >
              Export CSV
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExportSection;
