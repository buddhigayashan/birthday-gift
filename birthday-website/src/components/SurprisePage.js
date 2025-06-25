import React, { useState, useRef, useEffect } from "react";
import { Gift, Heart, Sparkles, Video, ArrowLeft, X } from "lucide-react";
import Navigation from "./Navigation";
 


 
const SurprisePage = ({ navigateTo }) => {
  const [showGiftBoxes, setShowGiftBoxes] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [showShoes, setShowShoes] = useState(false);
  const [boxOpened, setBoxOpened] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [dewDrops, setDewDrops] = useState([]);
  const [heartFormed, setHeartFormed] = useState(false);
  const videoRef = useRef(null);
  const correctBox = 1;

  // Generate dew drops with heart formation logic
  useEffect(() => {
    const generateDewDrops = () => {
      const drops = [];
      const numDrops = 60; // Reduced for better visibility

      // Heart shape equation: x² + (y - √|x|)² = 1 (scaled and positioned)
      const heartPoints = [];
      for (let t = 0; t <= 2 * Math.PI; t += 0.15) {
        const x = 16 * Math.sin(t) ** 3;
        const y = -(
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t)
        );
        heartPoints.push({ x: x * 2.5 + 50, y: y * 1.8 + 45 }); // Scale and center better
      }

      for (let i = 0; i < numDrops; i++) {
        const targetPoint =
          heartPoints[Math.floor(Math.random() * heartPoints.length)];
        drops.push({
          id: i,
          startX: Math.random() * 100,
          startY: -10,
          targetX: targetPoint.x,
          targetY: targetPoint.y,
          delay: Math.random() * 2000, // Reduced delay for faster start
          duration: 3000 + Math.random() * 1000, // Slower for better visibility
          size: 6 + Math.random() * 8, // Larger drops
          opacity: 0.8 + Math.random() * 0.2, // More visible
        });
      }
      setDewDrops(drops);

      // Form heart after drops fall
      setTimeout(() => {
        setHeartFormed(true);
      }, 5000); // Extended time to see the process
    };

    generateDewDrops();
  }, []);

  useEffect(() => {
    if (showVideoModal && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [showVideoModal]);

  const handleGiftClick = () => {
    setShowGiftBoxes(true);
  };

  const handleBoxClick = (boxIndex) => {
    setSelectedBox(boxIndex);
    setBoxOpened(true);
    setTimeout(() => {
      if (boxIndex === correctBox) {
        setShowShoes(true);
      } else {
        setTimeout(() => {
          setSelectedBox(null);
          setBoxOpened(false);
        }, 1000);
      }
    }, 1000);
  };

  const resetGame = () => {
    setShowGiftBoxes(false);
    setSelectedBox(null);
    setShowShoes(false);
    setBoxOpened(false);
  };

  const openVideoModal = () => {
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const FloatingParticle = () => (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full opacity-60 animate-float-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${4 + Math.random() * 3}s`,
          }}
        />
      ))}
      {[...Array(8)].map((_, i) => (
        <div
          key={`heart-${i}`}
          className="fixed text-pink-400 pointer-events-none opacity-60"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            animation: `float-heart ${
              4 + Math.random() * 3
            }s ease-in-out infinite`,
            animationDelay: `${i * 1.5}s`,
          }}
        >
          <Heart size={20 + Math.random() * 20} fill="currentColor" />
        </div>
      ))}
    </div>
  );

  // Dew Drops Animation Component
  const DewDropsHeart = () => (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {dewDrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute rounded-full bg-gradient-to-br from-cyan-300 via-blue-300 to-cyan-400 shadow-2xl dewdrop"
          style={{
            width: `${drop.size}px`,
            height: `${drop.size}px`,
            left: `${drop.startX}%`,
            top: `${drop.startY}%`,
            opacity: drop.opacity,
            boxShadow:
              "0 0 15px rgba(0, 191, 255, 0.8), inset 0 0 8px rgba(255, 255, 255, 0.9), 0 0 25px rgba(173, 216, 230, 0.6)",
            animation: `dewfall-${drop.id} ${drop.duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${drop.delay}ms forwards`,
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        />
      ))}

      {heartFormed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="heart-pulse">
            <Heart
              size={150}
              className="text-pink-400 drop-shadow-2xl"
              fill="currentColor"
              style={{
                filter:
                  "drop-shadow(0 0 30px rgba(255, 20, 147, 1)) drop-shadow(0 0 60px rgba(255, 105, 180, 0.8))",
                animation: "heartbeat 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        ${dewDrops
          .map(
            (drop) => `
          @keyframes dewfall-${drop.id} {
            0% {
              transform: translateY(0) rotate(0deg) scale(0.5);
              opacity: 0;
            }
            15% {
              opacity: ${drop.opacity};
              transform: translateY(10vh) rotate(30deg) scale(1);
            }
            70% {
              transform: translateY(40vh) rotate(180deg) scale(1);
              opacity: ${drop.opacity};
            }
            85% {
              transform: translate(${(drop.targetX - drop.startX) * 0.7}vw, ${
              drop.targetY * 0.8
            }vh) rotate(270deg) scale(1.2);
              opacity: 1;
            }
            100% {
              transform: translate(${drop.targetX - drop.startX}vw, ${
              drop.targetY
            }vh) rotate(360deg) scale(1.5);
              opacity: 1;
              box-shadow: 0 0 25px rgba(0, 191, 255, 1), inset 0 0 15px rgba(255, 255, 255, 1), 0 0 40px rgba(173, 216, 230, 0.8);
            }
          }
        `
          )
          .join("")}

        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 30px rgba(255, 20, 147, 1))
              drop-shadow(0 0 60px rgba(255, 105, 180, 0.8));
          }
          50% {
            transform: scale(1.15);
            filter: drop-shadow(0 0 50px rgba(255, 20, 147, 1))
              drop-shadow(0 0 80px rgba(255, 105, 180, 1));
          }
        }

        .dewdrop {
          position: relative;
          backdrop-filter: blur(1px);
        }

        .dewdrop::before {
          content: "";
          position: absolute;
          top: 15%;
          left: 25%;
          width: 40%;
          height: 40%;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.3) 70%,
            transparent 100%
          );
          border-radius: 50%;
        }

        .dewdrop::after {
          content: "";
          position: absolute;
          top: 60%;
          left: 60%;
          width: 20%;
          height: 20%;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          filter: blur(0.5px);
        }

        .heart-pulse {
          animation: heartPulse 3s ease-in-out infinite;
        }

        @keyframes heartPulse {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
            filter: drop-shadow(0 0 30px rgba(255, 20, 147, 1))
              drop-shadow(0 0 60px rgba(255, 105, 180, 0.8));
          }
          25% {
            transform: scale(1.1) rotate(-2deg);
            filter: drop-shadow(0 0 40px rgba(255, 20, 147, 1))
              drop-shadow(0 0 70px rgba(255, 105, 180, 0.9));
          }
          50% {
            transform: scale(1.2) rotate(0deg);
            filter: drop-shadow(0 0 50px rgba(255, 20, 147, 1))
              drop-shadow(0 0 80px rgba(255, 105, 180, 1));
          }
          75% {
            transform: scale(1.1) rotate(2deg);
            filter: drop-shadow(0 0 40px rgba(255, 20, 147, 1))
              drop-shadow(0 0 70px rgba(255, 105, 180, 0.9));
          }
        }
      `}</style>
    </div>
  );

  if (showShoes) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-pink-900 via-rose-800 to-red-900 animate-gradient-shift">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_50%)] animate-pulse" />
        </div>
        <FloatingParticle />
        <Navigation navigateTo={navigateTo} />
        <div className="relative z-10 pt-24 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 animate-bounce">
              <Sparkles className="mx-auto text-yellow-400" size={64} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent mb-6 animate-fade-in">
              🎉 Congratulations, My Love! 🎉
            </h1>
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Your Perfect Gift! 👠✨
              </h2>
              <img
                src="/shoes.jpg"
                alt="Beautiful shoes"
                className="mx-auto rounded-2xl shadow-xl max-w-xs w-full mb-6 object-cover"
                style={{ maxHeight: "300px" }}
              />
              <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-4 rounded-2xl border border-white/20">
                <p className="text-lg font-semibold text-white mb-2">
                  Elegant shoes for my queen! 👑
                </p>
                <p className="text-sm text-white/80">
                  Stunning and perfect, just like you! 💕
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-full font-bold hover:shadow-xl transition-all duration-300 flex items-center gap-2 hover:scale-105"
              >
                <ArrowLeft size={20} /> Play Again
              </button>
              <button
                onClick={() => navigateTo("wishes")}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                See Wishes 🎂
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showGiftBoxes) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 animate-gradient-shift">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_50%)] animate-pulse" />
        </div>
        <FloatingParticle />
        <Navigation navigateTo={navigateTo} />
        <div className="relative z-10 pt-24 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 animate-fade-in">
              Choose Your Gift Box! 🎁
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Pick a box to reveal your special surprise! 💖
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[0, 1, 2].map((boxIndex) => (
                <div
                  key={boxIndex}
                  className={`relative cursor-pointer transform transition-all duration-500 ${
                    selectedBox === boxIndex ? "scale-110" : "hover:scale-105"
                  }`}
                  onClick={() => !boxOpened && handleBoxClick(boxIndex)}
                >
                  <div
                    className={`bg-gradient-to-br ${
                      boxIndex === 0
                        ? "from-red-400 to-pink-500"
                        : boxIndex === 1
                        ? "from-purple-400 to-indigo-500"
                        : "from-blue-400 to-cyan-500"
                    } p-6 rounded-3xl shadow-2xl border-2 border-white/30 ${
                      selectedBox === boxIndex && boxOpened
                        ? "animate-pulse"
                        : ""
                    }`}
                  >
                    <Gift
                      size={60}
                      className={`mx-auto text-white mb-2 ${
                        selectedBox === boxIndex ? "animate-bounce" : ""
                      }`}
                    />
                    <h3 className="text-lg font-bold text-white">
                      Box {boxIndex + 1}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {selectedBox === boxIndex && boxOpened
                        ? boxIndex === correctBox
                          ? "🎉 Winner!"
                          : "😔 Try Again!"
                        : "Click to Open!"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={resetGame}
              className="mt-8 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-full font-bold hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto hover:scale-105"
            >
              <ArrowLeft size={20} />
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-orange-900 via-red-800 to-pink-900 animate-gradient-shift">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_50%)] animate-pulse" />
        <div
          className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(255,0,128,0.1)_0deg,transparent_60deg,rgba(255,165,0,0.1)_120deg,transparent_180deg,rgba(255,255,0,0.1)_240deg,transparent_300deg,rgba(255,0,128,0.1)_360deg)] animate-spin"
          style={{ animationDuration: "20s" }}
        />
      </div>
      <FloatingParticle />
      <DewDropsHeart />
      <Navigation navigateTo={navigateTo} />
      <div className="relative z-30 pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8 animate-bounce">
            <Gift className="mx-auto text-yellow-400" size={64} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent mb-6 animate-fade-in">
            🎁 Surprise, My Love! 🎁
          </h1>
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
            A special gift awaits you! Explore the surprises crafted with all my
            love. 💖
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/20 hover:scale-105">
              <Video className="mx-auto text-purple-400 mb-4" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">
                Special Wishes Video
              </h3>
              <p className="text-sm text-white/80 mb-4">
                A heartfelt video message just for you!
              </p>
              <button
                onClick={openVideoModal}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-bold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Watch Now 🎬
              </button>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/20 hover:scale-105">
              <Gift className="mx-auto text-orange-400 mb-4" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">
                Your Special Gift
              </h3>
              <p className="text-sm text-white/80 mb-4">
                Something elegant for your pretty feet! ✨
              </p>
              <button
                onClick={handleGiftClick}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-full font-bold hover:shadow-xl transition-all duration-300 animate-pulse hover:scale-105"
              >
                Open Gift! 🎁
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
              💝 Made with Love
              <Heart className="text-pink-400 animate-pulse" size={24} />
            </h3>
            <p className="text-lg text-white/90 leading-relaxed">
              Watch as the dewdrops of my love fall from heaven and come
              together to form the heart that beats only for you. Each drop
              represents a moment we've shared, a laugh we've had, and a dream
              we'll make come true together.
            </p>
            <div className="mt-6 p-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl border border-white/20">
              <p className="text-sm text-pink-200 italic">
                "Like dewdrops that shimmer in the morning light, my love for
                you sparkles eternal and bright." ✨
              </p>
            </div>
          </div>
        </div>
      </div>

      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 sm:px-0">
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-4 sm:p-6 max-w-3xl w-full">
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 text-white hover:text-pink-400 transition-all duration-300 z-10"
            >
              <X size={24} />
            </button>
            <video
              ref={videoRef}
              src="/wishes-video.mp4"
              controls
              className="w-full max-w-full h-auto max-h-[80vh] rounded-2xl object-contain"
              autoPlay
            />
          </div>
        </div>
      )}

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
        @keyframes float-particle {
          0% {
            transform: translateY(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh);
            opacity: 0;
          }
        }
        @keyframes float-heart {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-50px) scale(1.2);
            opacity: 1;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-gradient-shift {
          animation: gradient-shift 4s ease-in-out infinite;
        }
        .animate-float-particle {
          animation: float-particle 8s linear infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SurprisePage;
