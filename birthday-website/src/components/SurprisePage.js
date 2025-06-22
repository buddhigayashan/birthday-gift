import React, { useState } from "react";
import { Gift, Heart, Sparkles, Video, ArrowLeft } from "lucide-react";
import Navigation from "./Navigation";

const SurprisePage = ({ navigateTo }) => {
  const [showGiftBoxes, setShowGiftBoxes] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [showShoes, setShowShoes] = useState(false);
  const [boxOpened, setBoxOpened] = useState(false);

  // The correct box (can be 0, 1, or 2)
  const correctBox = 1; // Middle box has the shoes

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
        // Wrong box - show animation and reset
        setTimeout(() => {
          setSelectedBox(null);
          setBoxOpened(false);
        }, 2000);
      }
    }, 1000);
  };

  const resetGame = () => {
    setShowGiftBoxes(false);
    setSelectedBox(null);
    setShowShoes(false);
    setBoxOpened(false);
  };

  if (showShoes) {
    return (
      <div className="w-screen confetti-bg pt-20 pb-20 min-h-[calc(100vh-8rem)]">
        <Navigation navigateTo={navigateTo} />
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="mb-8 animate-bounce">
              <Sparkles className="mx-auto text-rose-500" size={80} />
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-8 animate-fade-in">
              🎉 CONGRATULATIONS! 🎉
            </h1>

            <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-pink-300/50 mb-8">
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-6">
                Your Perfect Gift! 👠✨
              </h2>

              {/* Shoes Image */}
              <div className="mb-6 transform hover:scale-105 transition-all duration-300">
                <img
                  src="/shoes.jpg"
                  alt="Beautiful shoes for Suddi"
                  className="mx-auto rounded-2xl shadow-xl max-w-md w-full"
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                />
              </div>

              <div className="bg-gradient-to-r from-pink-300 to-purple-300 p-6 rounded-2xl">
                <p className="text-lg sm:text-2xl font-semibold text-gray-800 mb-2">
                  Beautiful shoes for my beautiful queen! 👑
                </p>
                <p className="text-sm sm:text-lg text-gray-700">
                  Just like you, they're elegant, stunning, and perfect in every
                  way! 💕
                </p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-full text-lg font-bold hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                Play Again
              </button>
              <button
                onClick={() => navigateTo("wishes")}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-full text-lg font-bold hover:shadow-xl transition-all duration-300"
              >
                See Wishes Video 🎊
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showGiftBoxes) {
    return (
      <div className="w-screen confetti-bg pt-20 pb-20 min-h-[calc(100vh-8rem)]">
        <Navigation navigateTo={navigateTo} />
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
              Choose Your Gift Box! 🎁
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8">
              One of these boxes contains your special surprise! Choose
              wisely... 💖
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
                    } p-8 rounded-3xl shadow-2xl border-4 border-white/30 ${
                      selectedBox === boxIndex && boxOpened
                        ? "animate-pulse"
                        : ""
                    }`}
                  >
                    <Gift
                      size={80}
                      className={`mx-auto text-white mb-4 ${
                        selectedBox === boxIndex ? "animate-bounce" : ""
                      }`}
                    />
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Box {boxIndex + 1}
                    </h3>
                    <p className="text-white/90">
                      {selectedBox === boxIndex && boxOpened
                        ? boxIndex === correctBox
                          ? "🎉 Winner!"
                          : "😔 Try again!"
                        : "Click to open!"}
                    </p>
                  </div>

                  {selectedBox === boxIndex && boxOpened && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {boxIndex === correctBox ? (
                        <div className="text-6xl animate-bounce">🎉</div>
                      ) : (
                        <div className="text-6xl animate-pulse">❌</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={resetGame}
              className="mt-8 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-full text-lg font-bold hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <ArrowLeft size={20} />
              Back to Surprises
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen confetti-bg pt-20 pb-20 min-h-[calc(100vh-8rem)]">
      <Navigation navigateTo={navigateTo} />
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <div className="mb-6 sm:mb-10 animate-bounce">
            <Gift className="mx-auto text-rose-500" size={80} />
          </div>
          <h1 className="text-4xl sm:text-7xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4 sm:mb-8 animate-fade-in">
            🎁 SURPRISE, MY LOVE! 🎁
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            {/* Wishes Video Section */}
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-4 sm:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-amber-300/50">
              <h3 className="text-xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-6">
                🎥 Special Wishes Video
              </h3>
              <div className="mb-4">
                <Video className="mx-auto text-purple-600" size={60} />
              </div>
              <p className="text-gray-600 text-sm sm:text-lg mb-2 sm:mb-4">
                A heartfelt video message just for you!
              </p>
              <div className="bg-gradient-to-r from-purple-300 to-pink-300 p-2 sm:p-4 rounded-2xl">
                <p className="font-semibold text-sm sm:text-lg">
                  💕 From my heart
                </p>
                <p className="text-sm sm:text-lg">🎬 Personal message</p>
              </div>
              <button
                onClick={() => navigateTo("wishes")}
                className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm sm:text-lg font-bold hover:shadow-xl transition-all duration-300"
              >
                Watch Now 🎬
              </button>
            </div>

            {/* Your Gift Section */}
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-4 sm:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-amber-300/50">
              <h3 className="text-xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-6">
                🎁 Your Special Gift
              </h3>
              <div className="mb-4">
                <div className="text-6xl mb-2">✨ </div>
              </div>
              <p className="text-gray-600 text-sm sm:text-lg mb-2 sm:mb-4">
                Something beautiful for my beautiful queen!
              </p>
              <div className="bg-gradient-to-r from-amber-300 to-orange-300 p-2 sm:p-4 rounded-2xl">
                <p className="font-semibold text-sm sm:text-lg">
                  💡 Hint: For your pretty feet!
                </p>
                <p className="text-sm sm:text-lg">✨ Elegant & perfect</p>
              </div>
              <button
                onClick={handleGiftClick}
                className="mt-4 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-full text-sm sm:text-lg font-bold hover:shadow-xl transition-all duration-300 animate-pulse"
              >
                Open Gift! 🎁
              </button>
            </div>
          </div>

          {/* Love Playlist Section */}
          <div className="mt-6 sm:mt-12 bg-white/20 backdrop-blur-xl rounded-3xl p-4 sm:p-10 shadow-2xl border-2 border-amber-300/50 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-6">
              🎵 Love Playlist
            </h3>
            <p className="text-gray-600 text-sm sm:text-lg mb-2 sm:mb-4">
              Songs that sing our love story!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-left">
              <div className="bg-gradient-to-r from-pink-200 to-purple-200 p-2 sm:p-4 rounded-xl">
                <p className="font-semibold text-sm sm:text-lg">🎶 "Perfect"</p>
                <p className="text-xs sm:text-sm text-gray-600">
                  You're my perfection
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-200 to-indigo-200 p-2 sm:p-4 rounded-xl">
                <p className="font-semibold text-sm sm:text-lg">
                  🎶 "Can't Help Myself"
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  I'm yours forever
                </p>
              </div>
              <div className="bg-gradient-to-r from-indigo-200 to-blue-200 p-2 sm:p-4 rounded-xl">
                <p className="font-semibold text-sm sm:text-lg">🎶 "Happy"</p>
                <p className="text-xs sm:text-sm text-gray-600">
                  You bring me joy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating hearts animation */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="heart"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}

      <style>{`
        .heart {
          position: absolute;
          width: 20px;
          height: 20px;
          background: #ff69b4;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          animation: heartFloat 6s ease-in-out infinite;
          pointer-events: none;
        }
        
        .heart::before {
          content: '';
          position: absolute;
          top: -10px;
          left: 0;
          width: 20px;
          height: 20px;
          background: #ff69b4;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          transform: rotate(-45deg);
        }
        
        @keyframes heartFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        
        .confetti-bg {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SurprisePage;
