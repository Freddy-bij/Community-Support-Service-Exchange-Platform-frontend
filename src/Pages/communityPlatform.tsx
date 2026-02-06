import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, DollarSign, MessageSquare, Star } from 'lucide-react';


interface User {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  memberSince: string;
}

interface Response {
  id: string;
  user: User;
  message: string;
  rate?: string;
  timeAgo: string;
}

interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  location: string;
  budget: string;
  timePosted: string;
  status: 'open' | 'closed' | 'in-progress';
  postedBy: User;
  responses: Response[];
}


const sampleRequest: ServiceRequest = {
  id: '1',
  title: 'Math tutor needed for high school algebra',
  description: "Looking for someone to help my son prepare for his algebra final exam. 2-3 sessions per week would be ideal. He's in 10th grade and needs help understanding quadratic equations and systems of equations. Flexible schedule, happy to accommodate.",
  location: 'Downtown Area',
  budget: 'Flexible',
  timePosted: '2 hours ago',
  status: 'open',
  postedBy: {
    id: 'u1',
    name: 'Sarah Johnson',
    avatar: 'SJ',
    rating: 5,
    reviewCount: 52,
    memberSince: '10/06/2023'
  },
  responses: [
    {
      id: 'r1',
      user: {
        id: 'u2',
        name: 'John Smith',
        avatar: 'JS',
        rating: 5,
        reviewCount: 0,
        memberSince: ''
      },
      message: "I have 6 years of experience tutoring high school math. I'm really good with quadratic equations and would be happy to help your son prepare for his exam.",
      rate: '$25/hour',
      timeAgo: '30 minutes ago'
    },
    {
      id: 'r2',
      user: {
        id: 'u3',
        name: 'Emma Davis',
        avatar: 'ED',
        rating: 4,
        reviewCount: 0,
        memberSince: ''
      },
      message: "I'm a college student studying mathematics and can help! Available evenings and weekends.",
      timeAgo: '1 hour ago'
    }
  ]
};


const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'fill-orange-500 stroke-orange-500' : 'fill-none stroke-gray-300'}
        />
      ))}
    </div>
  );
};


const ResponseCard: React.FC<{ response: Response; index: number }> = ({ response, index }) => {
  return (
    <div 
      className="bg-gray-50 rounded-2xl p-6 mb-4 border-2 border-transparent transition-all duration-300 hover:border-teal-600 hover:shadow-lg hover:-translate-y-0.5 animate-slideIn"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3 items-center">
          <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${
            index === 1 ? 'bg-gradient-to-br from-purple-500 to-red-500' : 'bg-gradient-to-br from-orange-500 to-amber-400'
          }`}>
            {response.user.avatar}
          </div>
          <div>
            <h5 className="text-base font-semibold text-gray-900 mb-1">{response.user.name}</h5>
            <StarRating rating={response.user.rating} />
          </div>
        </div>
        <div className="text-sm text-gray-500">{response.timeAgo}</div>
      </div>
      <div className="mb-4 leading-relaxed text-gray-900">{response.message}</div>
      {response.rate && <div className="font-semibold text-teal-600 mt-2 text-lg">{response.rate}</div>}
      <div className="flex gap-3 mt-4">
        <button className="px-6 py-2.5 bg-teal-600 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-teal-700 hover:-translate-y-0.5 hover:shadow-lg">
          Accept
        </button>
        <button className="px-6 py-2.5 border-2 border-teal-600 bg-white text-teal-600 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
          Message
        </button>
      </div>
    </div>
  );
};


const CommunityServicePlatform: React.FC = () => {
  const [request] = useState<ServiceRequest>(sampleRequest);
  const [helpMessage, setHelpMessage] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmitResponse = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting response:', helpMessage);
    setHelpMessage('');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');
        
        body {
          font-family: 'DM Sans', sans-serif;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 30px) scale(1.1); }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out 0.2s backwards;
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out backwards;
        }

        .font-fraunces {
          font-family: 'Fraunces', serif;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 relative overflow-x-hidden">
        {/* Background decoration */}
        <div className="fixed top-[-50%] right-[-20%] w-[800px] h-[800px] rounded-full bg-gradient-radial from-teal-600/8 to-transparent animate-float pointer-events-none" />

        <div className="w-[50%] mx-auto py-8 px-4 relative z-10">
          {/* Header */}
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border-l-4 border-teal-600 animate-slideDown">
            <button className="inline-flex items-center gap-2 text-teal-600 font-medium transition-all duration-300 hover:bg-teal-600/10 px-4 py-2 rounded-lg hover:-translate-x-1">
              <ArrowLeft size={18} />
              Back
            </button>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 animate-fadeIn">
            {/* Left Column */}
            <div 
              className="bg-white rounded-3xl p-10 shadow-xl relative overflow-hidden transition-transform duration-100"
              style={{
                transform: `translate(${(mousePosition.x - 0.5) * 4}px, ${(mousePosition.y - 0.5) * 4}px)`
              }}
            >
              {/* Top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-400 to-orange-500" />

              {/* Status Badge */}
              <span className="inline-block bg-teal-400 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide mb-4 shadow-lg">
                {request.status}
              </span>

              {/* Title */}
              <h1 className="font-fraunces text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {request.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-8 mb-8 pb-6 border-b-2 border-dashed border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="text-teal-600" size={18} />
                  <span>{request.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="text-teal-600" size={18} />
                  <span>{request.timePosted}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="text-teal-600" size={18} />
                  <span>Budget: {request.budget}</span>
                </div>
              </div>

              {/* Description */}
              <div className="text-lg leading-relaxed text-gray-900 mb-10 bg-teal-600/5 p-6 rounded-xl border-l-3 border-l-4 border-teal-600">
                {request.description}
              </div>

              {/* Posted By */}
              <div className="bg-gradient-to-br from-teal-600/5 to-teal-400/5 rounded-2xl p-6 mb-8">
                <h3 className="text-sm uppercase tracking-wider text-gray-600 font-semibold mb-4">
                  Posted by
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-15 h-15 rounded-full bg-gradient-to-br from-teal-600 to-teal-400 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 shadow-lg">
                    {request.postedBy.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-1">
                      {request.postedBy.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={request.postedBy.rating} />
                      <span className="text-gray-600 text-sm">({request.postedBy.reviewCount} reviews)</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Member since {request.postedBy.memberSince}
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-teal-700 hover:-translate-y-0.5 hover:shadow-lg">
                    View Profile
                  </button>
                </div>
              </div>

              {/* Responses Section */}
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-6 text-lg font-semibold">
                  <MessageSquare size={24} className="text-teal-600" />
                  <span>Responses</span>
                  <span className="bg-teal-600 text-white px-3 py-1 rounded-xl text-sm">
                    {request.responses.length}
                  </span>
                </div>

                {request.responses.map((response, index) => (
                  <ResponseCard key={response.id} response={response} index={index} />
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Offer Help Card */}
              <div 
                className="bg-white rounded-2xl p-8 shadow-xl transition-transform duration-100"
                style={{
                  transform: `translate(${(mousePosition.x - 0.5) * 6}px, ${(mousePosition.y - 0.5) * 6}px)`,
                  animationDelay: '0.4s'
                }}
              >
                <h3 className="font-fraunces text-2xl font-semibold text-gray-900 mb-4">
                  Offer Your Help
                </h3>
                <form onSubmit={handleSubmitResponse} className="flex flex-col">
                  <textarea
                    placeholder="Tell them about your experience and how you can help..."
                    value={helpMessage}
                    onChange={(e) => setHelpMessage(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl resize-vertical min-h-[100px] mb-4 transition-colors duration-300 focus:outline-none focus:border-teal-600"
                  />
                  <button 
                    type="submit" 
                    className="w-full py-4 bg-gradient-to-r from-teal-600 to-teal-400 text-white rounded-xl font-semibold uppercase tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    Submit Response
                  </button>
                </form>
              </div>

              {/* Share Card */}
              <div 
                className="bg-white rounded-2xl p-8 shadow-xl transition-transform duration-100"
                style={{
                  transform: `translate(${(mousePosition.x - 0.5) * 8}px, ${(mousePosition.y - 0.5) * 8}px)`,
                  animationDelay: '0.5s'
                }}
              >
                <h3 className="font-fraunces text-2xl font-semibold text-gray-900 mb-4">
                  Share This
                </h3>
                <div className="flex flex-col gap-3">
                  <button className="w-full py-3.5 border-2 border-gray-200 bg-white rounded-xl font-medium text-gray-900 transition-all duration-300 hover:border-teal-600 hover:bg-teal-600/5 hover:translate-x-1">
                    Share on Social
                  </button>
                  <button className="w-full py-3.5 border-2 border-gray-200 bg-white rounded-xl font-medium text-gray-900 transition-all duration-300 hover:border-teal-600 hover:bg-teal-600/5 hover:translate-x-1">
                    Copy Link
                  </button>
                </div>
              </div>

              {/* Safety Tips Card */}
              <div 
                className="bg-white rounded-2xl p-8 shadow-xl transition-transform duration-100"
                style={{
                  transform: `translate(${(mousePosition.x - 0.5) * 10}px, ${(mousePosition.y - 0.5) * 10}px)`,
                  animationDelay: '0.6s'
                }}
              >
                <h3 className="font-fraunces text-2xl font-semibold text-gray-900 mb-4">
                  Safety Tips
                </h3>
                <ul className="text-sm leading-relaxed space-y-3">
                  <li className="pl-6 relative text-gray-600">
                    <span className="absolute left-0 text-teal-400 font-bold text-lg">✓</span>
                    Meet in a safe, public location
                  </li>
                  <li className="pl-6 relative text-gray-600">
                    <span className="absolute left-0 text-teal-400 font-bold text-lg">✓</span>
                    Verify the requester's identity
                  </li>
                  <li className="pl-6 relative text-gray-600">
                    <span className="absolute left-0 text-teal-400 font-bold text-lg">✓</span>
                    Never share personal financial info
                  </li>
                  <li className="pl-6 relative text-gray-600">
                    <span className="absolute left-0 text-teal-400 font-bold text-lg">✓</span>
                    Read community guidelines
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityServicePlatform;