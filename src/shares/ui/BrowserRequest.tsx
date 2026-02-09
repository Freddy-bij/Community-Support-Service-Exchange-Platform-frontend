import { Search } from "lucide-react"
import Select from 'react-select'

const options = [
  { value: 'tutoring', label: 'Tutoring' },
  { value: 'transport', label: 'Transport' },
  { value: 'repairs', label: 'Repairs' },
  { value: 'volunteering', label: 'Volunteering' },
  { value: 'other', label: 'Other' }
]
const statusOptions = [
  { value: 'open', label: 'Open' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'closed', label: 'Closed' }
]

const BrowserRequest = () => {
  return (
    <div className="p-8">
        <div className="mb-3">
            <h1 className="text-4xl font-extrabold">Discover Opportunities</h1>
            <p className="text-gray-600 py-1.5">Browse service requests and find ways to help your community</p>
        </div>

        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4" />
                <input 
                    type="text" 
                    placeholder="discover by title or description" 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>
             <div className="grid grid-cols-3 gap-4  w-[80%]">
             <div>
                <label className="text-sm font-medium">Category</label>
                <Select placeholder="All" options={options}/>
            </div>
            <div>
                <label className="text-sm font-medium">Location</label>
                <input 
                    type="text" 
                    placeholder="City or area"
                    className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
            </div>

             <div>
                <label className="text-sm font-medium">Status</label>
                <Select placeholder="All" options={statusOptions}/>
            </div>

             </div>
           
    <div>
        <span className="text-gray-400 text-xs">Showing 0 of 0 requests</span>
        <div className="bg-white rounded-xl  my-2 text-gray-400 text-center border border-gray-400 ">
           <p className="py-6 text-sm"> No requests found matching your filters.</p>
            <div className="bg-gray-200 text-black mb-10  rounded-md py-1">
                <p>clear Filter</p>
            </div>
        </div>
    </div>
        </div>
    </div>
  )
}

export default BrowserRequest