import  { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router';

const WelcomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      title: "Welcome to Community Support",
      subtitle: "Where Neighbors Help Neighbors",
      description: "Join thousands of community members exchanging services, sharing skills, and building stronger neighborhoods together.",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=800&fit=crop",
      color: "from-teal-600 to-teal-800",
      stats: { number: "10,000+", label: "Active Members" }
    },
    {
      title: "Share Your Skills",
      subtitle: "Offer What You Love Doing",
      description: "From tutoring to home repairs, gardening to tech support - your skills can make a real difference in someone's life.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=800&fit=crop",
      color: "from-orange-500 to-orange-700",
      stats: { number: "5,000+", label: "Services Offered" }
    },
    {
      title: "Get Help When You Need It",
      subtitle: "Request Services From Trusted Neighbors",
      description: "Need help with moving? Looking for a tutor? Our community is here to support you with verified, trusted members.",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&h=800&fit=crop",
      color: "from-purple-600 to-purple-800",
      stats: { number: "15,000+", label: "Requests Fulfilled" }
    },
    {
      title: "Build Lasting Connections",
      subtitle: "More Than Just Services",
      description: "Create meaningful relationships with your neighbors. Every interaction strengthens our community and builds trust.",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=800&fit=crop",
      color: "from-blue-600 to-blue-800",
      stats: { number: "95%", label: "Satisfaction Rate" }
    }
  ];

 

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index:number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
     

      
      <div className="relative h-screen overflow-hidden">
       
        <div className="relative h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105'
              }`}
            >
              
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-85`}></div>
              </div>              
              <div className="relative h-full flex items-center justify-center px-6">
                <div className="max-w-4xl text-center text-white">
                 
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full mb-6 animate-fade-in">
                    <Star className="text-yellow-300" size={20} fill="currentColor" />
                    <span className="font-semibold">{slide.stats.number}</span>
                    <span className="text-white/80">{slide.stats.label}</span>
                  </div>

                  <h1 className="text-6xl md:text-7xl font-bold mb-4 animate-slide-up">
                    {slide.title}
                  </h1>
                  <p className="text-2xl md:text-3xl font-medium mb-6 text-white/90 animate-slide-up delay-100">
                    {slide.subtitle}
                  </p>
                  <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-white/80 leading-relaxed animate-slide-up delay-200">
                    {slide.description}
                  </p>

                  
                  <div className="flex gap-4 justify-center animate-slide-up delay-300">
                 
                 <Link to="/auth">
                 <button className="group px-8 py-4 bg-white text-slate-800 rounded-lg font-semibold text-lg hover:bg-slate-100 transition shadow-xl hover:shadow-2xl flex items-center gap-2">
                      Join Our Community
                      <ArrowRight className="group-hover:translate-x-1 transition" size={20} />
                    </button>
                 </Link>
                    
                    <button className="px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-lg font-semibold text-lg hover:bg-white/30 transition border-2 border-white/40">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

       
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full transition z-40 group"
        >
          <ChevronLeft className="text-white group-hover:scale-110 transition" size={32} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full transition z-40 group"
        >
          <ChevronRight className="text-white group-hover:scale-110 transition" size={32} />
        </button>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-40">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all ${
                index === currentSlide
                  ? 'w-12 h-3 bg-white'
                  : 'w-3 h-3 bg-white/50 hover:bg-white/70'
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-40">
          <div className="flex flex-col items-center gap-2 text-white/80">
            <span className="text-sm font-medium">Scroll to explore</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;