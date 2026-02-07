import { MessageCircle, Heart, Share2, Clock, Tag, Eye } from "lucide-react"
import { Link } from "react-router"
import { useState } from "react"



interface ActivityItem {
  id: number;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  timeAgo: string;
  category: string;
  title: string;
  description: string;
  status: "Looking For" | "Offering" | "Completed";
  responses: number;
  views: number;
  isLiked?: boolean;
}

const RecentActivity = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "",
        initials: "SJ"
      },
      timeAgo: "2 hours ago",
      category: "Tutoring",
      title: "Math tutor needed for high school algebra",
      description: "Looking for someone to help my son prepare for his algebra final exam. 2-3 sessions per week would be ideal.",
      status: "Looking For",
      responses: 3,
      views: 24,
      isLiked: false
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "",
        initials: "MC"
      },
      timeAgo: "5 hours ago",
      category: "Tech Help",
      title: "Need help setting up home network",
      description: "Moving into a new house and need assistance with router configuration and WiFi optimization.",
      status: "Looking For",
      responses: 7,
      views: 45,
      isLiked: true
    },
    {
      id: 3,
      user: {
        name: "Emily Rodriguez",
        avatar: "",
        initials: "ER"
      },
      timeAgo: "1 day ago",
      category: "Gardening",
      title: "Offering free gardening advice",
      description: "Professional landscaper here! Happy to help with plant selection, garden design, or pest problems.",
      status: "Offering",
      responses: 12,
      views: 89,
      isLiked: false
    }
  ]);

  const toggleLike = (id: number) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, isLiked: !activity.isLiked } : activity
    ));
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Tutoring": "bg-blue-100 text-blue-700 border-blue-200",
      "Tech Help": "bg-purple-100 text-purple-700 border-purple-200",
      "Gardening": "bg-green-100 text-green-700 border-green-200",
      "Home Repair": "bg-orange-100 text-orange-700 border-orange-200",
      "Pet Care": "bg-pink-100 text-pink-700 border-pink-200"
    };
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      "Looking For": "bg-amber-50 text-amber-700 border-amber-200",
      "Offering": "bg-emerald-50 text-emerald-700 border-emerald-200",
      "Completed": "bg-gray-50 text-gray-700 border-gray-200"
    };
    return colors[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <div className="bg-gray-100">
        <div className=" w-[85%] mx-auto py-15">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Recent Activity
          </h2>
          <p className="text-gray-600 text-sm mt-1">Latest requests and offers from your community</p>
        </div>
        <Link 
          to="/activity"
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium shadow-sm hover:shadow-md"
        >
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div 
            key={activity.id}
            className="group bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 overflow-hidden hover:shadow-lg"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md">
                    {activity.user.initials}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                      {activity.user.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{activity.timeAgo}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </span>
              </div>
              <div className="mb-3">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border ${getCategoryColor(activity.category)}`}>
                  <Tag className="w-3 h-3" />
                  {activity.category}
                </span>
              </div>
              <Link to={`/request/${activity.id}`} className="block mb-4 group/link">
                <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover/link:text-blue-600 transition-colors">
                  {activity.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {activity.description}
                </p>
              </Link>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => toggleLike(activity.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                      activity.isLiked 
                        ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Heart 
                      className={`w-4 h-4 transition-all ${
                        activity.isLiked ? 'fill-red-600' : ''
                      }`} 
                    />
                    <span className="text-sm font-medium">Like</span>
                  </button>
                  <Link 
                    to={`/request/${activity.id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Respond</span>
                  </Link>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Share</span>
                  </button>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span className="font-medium">{activity.responses}</span>
                    <span className="hidden sm:inline">responses</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span className="font-medium">{activity.views}</span>
                    <span className="hidden sm:inline">views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium">
          Load More Activities
        </button>
      </div>
    </div>
    </div>
    
  )
}

export default RecentActivity