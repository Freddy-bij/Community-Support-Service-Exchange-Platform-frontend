import { FiDownload } from "react-icons/fi";

interface ExportSectionProps {
  onExport: (type: 'requests' | 'users' | 'responses' | 'reports', format: 'csv' | 'json') => void;
}

const ExportSection = ({ onExport }: ExportSectionProps) => {
  const exportTypes: Array<'requests' | 'users' | 'responses' | 'reports'> = ['requests', 'users', 'responses', 'reports'];

  return (
    <div className="bg-gradient-to-br from-[#2C7A7B] to-[#235E5F] rounded-2xl p-6 text-white shadow-xl">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FiDownload />
        Export Analytics Data
      </h2>
      <p className="text-white/80 mb-6">Download comprehensive reports in CSV or JSON format</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {exportTypes.map((type) => (
          <div key={type} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="font-bold text-white mb-3 capitalize text-lg">{type}</p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onExport(type, 'csv')}
                className="w-full px-3 py-2 bg-white text-[#2C7A7B] hover:bg-gray-100 rounded-lg text-sm font-bold transition shadow-sm"
              >
                CSV
              </button>
              <button
                onClick={() => onExport(type, 'json')}
                className="w-full px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-bold transition border border-white/30"
              >
                JSON
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExportSection;
