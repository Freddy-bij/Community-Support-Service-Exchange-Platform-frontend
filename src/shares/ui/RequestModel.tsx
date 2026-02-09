import { X, Search, Sparkles } from "lucide-react"
import { useState } from "react"

interface CreateOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateOfferModal = ({ isOpen, onClose }: CreateOfferModalProps) => {
  const [offerType, setOfferType] = useState<"need" | "help">("help");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const categories = [
    "Tutoring",
    "Tech Help",
    "Home Repair",
    "Pet Care",
    "Gardening",
    "Moving Help",
    "Language Exchange",
    "Career Advice",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ offerType, category, title, description });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
       
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Offer</h2>
            <p className="text-sm text-gray-600 mt-1">Share what you need or what you can offer</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Offer Type Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">
              What would you like to do?
            </label>
            <div className="grid grid-cols-2 gap-4">
              {/* I Need Help */}
              <button
                type="button"
                onClick={() => setOfferType("need")}
                className={`relative p-6 rounded-xl border-2 transition-all duration-200 ${
                  offerType === "need"
                    ? "border-[#2C7A7B] bg-[#2C7A7B]/5 shadow-md"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`p-3 rounded-full ${
                    offerType === "need" 
                      ? "bg-[#2C7A7B]/10" 
                      : "bg-gray-200"
                  }`}>
                    <Search className={`w-6 h-6 ${
                      offerType === "need" 
                        ? "text-[#2C7A7B]" 
                        : "text-gray-600"
                    }`} />
                  </div>
                  <span className={`font-semibold ${
                    offerType === "need" 
                      ? "text-[#2C7A7B]" 
                      : "text-gray-700"
                  }`}>
                    I Need Help
                  </span>
                </div>
                {offerType === "need" && (
                  <div className="absolute top-2 right-2">
                    <div className="w-5 h-5 bg-[#2C7A7B] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>

              {/* I Can Help */}
              <button
                type="button"
                onClick={() => setOfferType("help")}
                className={`relative p-6 rounded-xl border-2 transition-all duration-200 ${
                  offerType === "help"
                    ? "border-[#F59E0B] bg-[#F59E0B]/5 shadow-md"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`p-3 rounded-full ${
                    offerType === "help" 
                      ? "bg-[#F59E0B]/10" 
                      : "bg-gray-200"
                  }`}>
                    <Sparkles className={`w-6 h-6 ${
                      offerType === "help" 
                        ? "text-[#F59E0B]" 
                        : "text-gray-600"
                    }`} />
                  </div>
                  <span className={`font-semibold ${
                    offerType === "help" 
                      ? "text-[#F59E0B]" 
                      : "text-gray-700"
                  }`}>
                    I Can Help
                  </span>
                </div>
                {offerType === "help" && (
                  <div className="absolute top-2 right-2">
                    <div className="w-5 h-5 bg-[#F59E0B] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Category Selection */}
          <div className="space-y-3">
            <label htmlFor="category" className="block text-sm font-semibold text-gray-900">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2C7A7B] focus:border-transparent outline-none transition-all bg-gray-50 hover:bg-white"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-900">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What can you help with?"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2C7A7B] focus:border-transparent outline-none transition-all bg-gray-50 hover:bg-white"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-900">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide more details about your request or offer..."
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2C7A7B] focus:border-transparent outline-none transition-all resize-none bg-gray-50 hover:bg-white"
              required
            />
            <p className="text-xs text-gray-500">
              Be clear and detailed to get better responses
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#2C7A7B] text-white rounded-xl hover:bg-[#235E5F] transition-colors font-semibold shadow-lg shadow-[#2C7A7B]/20"
            >
              Post Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOfferModal;