import React, { useState, useEffect, useRef } from "react";
import {
  Camera,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Sparkles,
} from "lucide-react";
import { Mail } from "lucide-react";
import Navigation from "./Navigation";

// Import your photos
import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import photo4 from "../assets/photo4.jpg";
import photo5 from "../assets/photo5.jpg";
import photo6 from "../assets/photo6.jpg";

const PhotoGallery = ({ navigateTo }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showMusicControls, setShowMusicControls] = useState(false);
  const audioRef = useRef(null);

  // Photo data with imported images
  const photos = [
    {
      id: 1,
      src: photo1,
      caption: "The day you gifted me a red rose — love in full bloom",
    },
    { id: 2, src: photo2, caption: "The golden glow of our perfect sunset" },
    {
      id: 3,
      src: photo3,
      caption: "Our first stroll through the mall—hand in hand",
    },
    {
      id: 4,
      src: photo4,
      caption: "A soft white rose — your purest gesture of love",
    },
    { id: 5, src: photo5, caption: "Our magical first adventure together" },
    {
      id: 6,
      src: photo6,
      caption: "Valentine's Day — twinning in red, hearts entwined",
    },
  ];

  useEffect(() => {
    // Initialize audio
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.loop = true;
    }

    // Auto-play music after 1 second
    const timer = setTimeout(() => {
      setShowMusicControls(true);
      handlePlayPause();
    }, 1000);

    // Cycle through photos for spotlight effect
    const photoTimer = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(photoTimer);
    };
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Handle autoplay restrictions
          setShowMusicControls(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const FloatingElement = ({ children, delay = 0, className = "" }) => (
    <div
      className={`animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );

  const ParticleEffect = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        >
          <Heart className="text-pink-300/30" size={8 + Math.random() * 16} />
        </div>
      ))}
      {[...Array(15)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute animate-sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          <Sparkles
            className="text-yellow-300/40"
            size={6 + Math.random() * 12}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-screen min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-purple-400 to-indigo-500 animate-gradient-shift"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-rose-300 via-transparent to-blue-300 animate-gradient-shift-reverse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.3)_0%,transparent_50%)] animate-pulse"></div>
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,182,193,0.4)_0%,transparent_50%)] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Particle Effects */}
      <ParticleEffect />

      {/* Audio Element */}
      <audio ref={audioRef} src="/gallery.mp3" preload="auto" />

      {/* Music Controls */}
      {showMusicControls && (
        <div className="fixed top-4 right-4 z-50 bg-white/20 backdrop-blur-xl rounded-full p-2 shadow-lg border border-white/30">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePlayPause}
              className="p-2 rounded-full bg-pink-500/80 hover:bg-pink-600/80 transition-colors"
            >
              {isPlaying ? (
                <Pause className="text-white" size={16} />
              ) : (
                <Play className="text-white" size={16} />
              )}
            </button>
            <button
              onClick={handleMuteToggle}
              className="p-2 rounded-full bg-purple-500/80 hover:bg-purple-600/80 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="text-white" size={16} />
              ) : (
                <Volume2 className="text-white" size={16} />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 pt-20 pb-20 min-h-screen">
        <Navigation navigateTo={navigateTo} />

        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <FloatingElement delay={0.5}>
              <h1 className="text-3xl sm:text-6xl font-extrabold bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent mb-6 sm:mb-12 animate-fade-in drop-shadow-2xl">
                📸 Our Love in Pictures 📸
              </h1>
            </FloatingElement>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {photos.map((photo, index) => (
                <FloatingElement key={photo.id} delay={index * 0.2}>
                  <div
                    className={`relative bg-white/10 backdrop-blur-2xl rounded-3xl p-3 sm:p-6 shadow-2xl hover:shadow-4xl transition-all duration-500 border-2 border-white/30 hover:border-pink-300/50 hover:scale-105 group ${
                      currentPhotoIndex === index
                        ? "ring-4 ring-pink-300/50 animate-pulse-ring"
                        : ""
                    }`}
                  >
                    {/* Glow effect for current photo */}
                    {currentPhotoIndex === index && (
                      <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl blur opacity-30 animate-pulse"></div>
                    )}

                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-2 sm:mb-4 shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 to-purple-200/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <img
                        src={photo.src}
                        alt={`Memory ${photo.id}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter group-hover:brightness-110"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      {/* Fallback placeholder */}
                      <div
                        className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-300 rounded-2xl flex items-center justify-center"
                        style={{ display: "none" }}
                      >
                        <Camera className="text-gray-600" size={32} />
                        <span className="ml-1 sm:ml-2 text-gray-700 font-semibold text-sm sm:text-lg">
                          Photo {photo.id}
                        </span>
                      </div>

                      {/* Overlay hearts on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <Heart
                          className="text-pink-300 animate-bounce"
                          size={32}
                          fill="currentColor"
                        />
                      </div>
                    </div>

                    <p className="text-center text-white font-semibold text-sm sm:text-lg animate-fade-in drop-shadow-lg">
                      {photo.caption}
                    </p>
                  </div>
                </FloatingElement>
              ))}
            </div>

            <FloatingElement delay={1.5}>
              <div className="mt-6 sm:mt-12 bg-white/10 backdrop-blur-2xl rounded-3xl p-4 sm:p-10 shadow-2xl border-2 border-white/30 max-w-4xl mx-auto hover:bg-white/15 transition-all duration-500">
                <p className="text-white text-sm sm:text-xl italic animate-fade-in drop-shadow-lg">
                  Every photo with you is a treasure. These memories are
                  priceless! 💝
                </p>
                <button
                  onClick={() => navigateTo("letter")}
                  className="mt-4 sm:mt-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 sm:px-12 py-2 sm:py-5 rounded-full text-base sm:text-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 animate-pulse hover:scale-105 border-2 border-white/30"
                >
                  Read My Love Letter 💌
                </button>
              </div>
            </FloatingElement>
          </div>
        </div>

        {/* Floating Hearts */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="fixed pointer-events-none z-5"
            style={{
              left: `${Math.random() * 100}vw`,
              top: `${Math.random() * 100}vh`,
              animationDelay: `${i * 2}s`,
            }}
          >
            <Heart
              className="text-pink-300/40 animate-float-heart"
              size={20 + Math.random() * 20}
              fill="currentColor"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes gradient-shift-reverse {
          0%,
          100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }

        @keyframes float-particle {
          0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes float-heart {
          0% {
            transform: translateY(0px) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-50px) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }

        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(236, 72, 153, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(236, 72, 153, 0);
          }
        }

        .animate-gradient-shift {
          animation: gradient-shift 4s ease-in-out infinite;
        }

        .animate-gradient-shift-reverse {
          animation: gradient-shift-reverse 4s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-particle {
          animation: float-particle 8s linear infinite;
        }

        .animate-float-heart {
          animation: float-heart 4s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        .animate-pulse-ring {
          animation: pulse-ring 2s infinite;
        }

        .shadow-4xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default PhotoGallery;
