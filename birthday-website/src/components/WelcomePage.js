import React, { useState, useRef, useEffect } from "react";
import {
  Gift,
  Heart,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Star,
  Cake,
  PartyPopper,
  Crown,
  Flower2,
  Music,
} from "lucide-react";
import Navigation from "./Navigation";

const WelcomePage = ({ loginData, navigateTo }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Auto-play birthday music when component mounts
  useEffect(() => {
    const playMusic = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.6; // Set volume to 60%
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.warn("Autoplay failed:", error);
          // Autoplay failed, user will need to click play button
        }
      }
    };

    // Small delay to ensure component is fully mounted
    const timer = setTimeout(playMusic, 800);
    return () => clearTimeout(timer);
  }, []);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.warn("Play failed:", error);
          });
      }
    }
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Floating celebration elements
  const celebrationElements = [...Array(12)].map((_, i) => {
    const icons = [Star, Sparkles, Heart, Flower2, Crown];
    const IconComponent = icons[i % icons.length];
    const colors = [
      "text-pink-400",
      "text-purple-400",
      "text-rose-400",
      "text-amber-400",
      "text-red-400",
    ];

    return (
      <div
        key={i}
        className={`absolute ${
          colors[i % colors.length]
        } opacity-60 pointer-events-none`}
        style={{
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          fontSize: `${20 + Math.random() * 20}px`,
        }}
      >
        <IconComponent
          size={20 + Math.random() * 15}
          className="animate-pulse floating-element"
          style={{
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      </div>
    );
  });

  return (
    <div className="relative w-screen birthday-gradient pt-16 pb-16 min-h-screen overflow-hidden">
      {/* 🎵 Birthday Music */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/happy-birthday.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Music Controls - Fixed position */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={togglePlayPause}
          className="bg-white/25 backdrop-blur-md border border-pink-300/60 rounded-full p-3 hover:bg-white/35 transition-all duration-300 shadow-lg hover:shadow-pink-200 group"
          title={isPlaying ? "Pause Birthday Music" : "Play Birthday Music"}
        >
          {isPlaying ? (
            <Pause
              className="text-pink-600 group-hover:text-pink-700"
              size={22}
            />
          ) : (
            <Play
              className="text-pink-600 group-hover:text-pink-700"
              size={22}
            />
          )}
        </button>

        <button
          onClick={toggleMute}
          className="bg-white/25 backdrop-blur-md border border-pink-300/60 rounded-full p-3 hover:bg-white/35 transition-all duration-300 shadow-lg hover:shadow-pink-200 group"
          title={isMuted ? "Unmute Music" : "Mute Music"}
        >
          {isMuted ? (
            <VolumeX
              className="text-pink-600 group-hover:text-pink-700"
              size={22}
            />
          ) : (
            <Volume2
              className="text-pink-600 group-hover:text-pink-700"
              size={22}
            />
          )}
        </button>

        {/* Music indicator */}
        <div className="bg-white/20 backdrop-blur-md border border-pink-300/40 rounded-full px-3 py-2">
          <div className="flex items-center gap-2">
            <Music className="text-pink-600" size={16} />
            <div
              className={`w-2 h-2 rounded-full ${
                isPlaying ? "bg-green-500 animate-pulse" : "bg-gray-400"
              }`}
            ></div>
          </div>
        </div>
      </div>

      {/* Floating celebration elements */}
      {celebrationElements}

      {/* Navigation bar */}
      <Navigation navigateTo={navigateTo} />

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center">
          {/* Header Section */}
          <div className="mb-8 sm:mb-12">
            <div className="flex justify-center items-center gap-4 mb-6 sm:mb-8">
              <PartyPopper
                className="text-purple-500 animate-bounce"
                size={60}
              />
              <Cake className="text-rose-500 animate-pulse" size={80} />
              <PartyPopper
                className="text-purple-500 animate-bounce"
                size={60}
                style={{ animationDelay: "0.5s" }}
              />
            </div>

            {/* Main Birthday Title */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6 animate-fade-in leading-tight">
              🎂 HAPPY BIRTHDAY! 🎂
            </h1>

            {/* Personal Message */}
            <div className="bg-white/15 backdrop-blur-xl rounded-3xl border border-pink-300/50 p-6 sm:p-8 mb-8 sm:mb-12 shadow-2xl max-w-4xl mx-auto">
              <Crown
                className="mx-auto text-amber-500 mb-4 animate-pulse"
                size={50}
              />
              <h2 className="text-2xl sm:text-4xl lg:text-5xl text-gray-800 font-bold animate-fade-in delay-200 leading-relaxed">
                My precious{" "}
                <span className="text-pink-600">
                  👑 Queen {loginData.name} 👑
                </span>
                ,
                <br />
                <span className="text-purple-600">
                  ✨ Your magical day has begun! ✨
                </span>
              </h2>
              <div className="flex justify-center gap-4 mt-6">
                <Sparkles className="text-pink-500 animate-spin" size={24} />
                <Heart className="text-red-500 animate-pulse" size={24} />
                <Star className="text-amber-500 animate-bounce" size={24} />
                <Heart
                  className="text-red-500 animate-pulse"
                  size={24}
                  style={{ animationDelay: "0.5s" }}
                />
                <Sparkles
                  className="text-pink-500 animate-spin"
                  size={24}
                  style={{ animationDelay: "1s" }}
                />
              </div>
            </div>
          </div>

          {/* Action Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12">
            {/* Memories Card */}
            <div className="group bg-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-rose-300/50 hover:border-rose-400/70 transform hover:scale-105">
              <div className="flex justify-center items-center gap-3 mb-6">
                <Heart
                  className="text-rose-500 animate-pulse group-hover:animate-bounce"
                  size={50}
                />
                <Flower2 className="text-pink-500 animate-pulse" size={40} />
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                💕 Made With Love 💕
              </h3>
              <p className="text-gray-700 text-base sm:text-xl leading-relaxed mb-6 sm:mb-8">
                This magical experience is crafted with all my love, filled with
                precious memories and endless birthday wishes just for you, my
                darling! 🌹
              </p>
              <button
                onClick={() => navigateTo("memories")}
                className="bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 hover:from-red-500 hover:via-pink-500 hover:to-rose-500 text-white px-8 sm:px-12 py-3 sm:py-5 rounded-full font-bold text-base sm:text-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse group-hover:animate-none"
              >
                🌟 Explore Our Memories 🌟
              </button>
            </div>

            {/* Surprises Card */}
            <div className="group bg-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-purple-300/50 hover:border-purple-400/70 transform hover:scale-105">
              <div className="flex justify-center items-center gap-3 mb-6">
                <Gift
                  className="text-purple-500 animate-bounce group-hover:animate-pulse"
                  size={50}
                />
                <Sparkles className="text-pink-500 animate-spin" size={40} />
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                🎁 Magical Surprises 🎁
              </h3>
              <p className="text-gray-700 text-base sm:text-xl leading-relaxed mb-6 sm:mb-8">
                Unwrap the amazing surprises I've carefully prepared for you, my
                love! Each one is a token of my endless affection! ✨
              </p>
              <button
                onClick={() => navigateTo("surprise")}
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:from-indigo-500 hover:via-pink-500 hover:to-purple-500 text-white px-8 sm:px-12 py-3 sm:py-5 rounded-full font-bold text-base sm:text-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse group-hover:animate-none"
              >
                🎉 Discover Surprises 🎉
              </button>
            </div>
          </div>

          {/* Music Status */}
          <div className="bg-white/15 backdrop-blur-xl rounded-2xl border border-pink-300/40 p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3">
              <Music className="text-pink-600" size={20} />
              <p className="text-pink-700 font-medium">
                {isPlaying ? "🎵 Playing Birthday Music..." : "🎵 Music Paused"}
              </p>
              <div
                className={`w-3 h-3 rounded-full ${
                  isPlaying ? "bg-green-500 animate-pulse" : "bg-gray-400"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating hearts animation */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="heart"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            animationDelay: `${i * 1.2}s`,
            animationDuration: `${4 + Math.random() * 2}s`,
          }}
        />
      ))}

      {/* CSS Styles */}
      <style>{`
        .birthday-gradient {
          background: linear-gradient(135deg, 
            #ffecd2 0%, 
            #fcb69f 25%, 
            #ff8a80 50%, 
            #ff80ab 75%, 
            #ea80fc 100%
          );
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .heart {
          position: absolute;
          width: 25px;
          height: 25px;
          background: linear-gradient(45deg, #ff69b4, #ff1493);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          animation: heartFloat ease-in-out infinite;
          pointer-events: none;
          opacity: 0.8;
        }
        
        .heart::before {
          content: '';
          position: absolute;
          top: -12px;
          left: 0;
          width: 25px;
          height: 25px;
          background: linear-gradient(45deg, #ff69b4, #ff1493);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          transform: rotate(-45deg);
        }
        
        @keyframes heartFloat {
          0%, 100% { 
            transform: translateY(0) rotate(0deg) scale(1); 
            opacity: 0.8; 
          }
          25% { 
            transform: translateY(-30px) rotate(90deg) scale(1.1); 
            opacity: 1; 
          }
          50% { 
            transform: translateY(-15px) rotate(180deg) scale(0.9); 
            opacity: 0.9; 
          }
          75% { 
            transform: translateY(-25px) rotate(270deg) scale(1.05); 
            opacity: 1; 
          }
        }
        
        .floating-element {
          animation: float ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.6; 
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 1; 
          }
        }
        
        @keyframes fade-in {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1.2s ease-out;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        /* Responsive improvements */
        @media (max-width: 640px) {
          .heart {
            width: 18px;
            height: 18px;
          }
          
          .heart::before {
            width: 18px;
            height: 18px;
            top: -9px;
          }
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;
