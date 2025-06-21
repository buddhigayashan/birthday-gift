import React from "react";
import { Gift } from "lucide-react";
import Navigation from "./Navigation";

const SurprisePage = ({ navigateTo }) => (
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
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-4 sm:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-amber-300/50">
            <h3 className="text-xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-6">
              🎪 Virtual Party
            </h3>
            <p className="text-gray-600 text-sm sm:text-lg mb-2 sm:mb-4">
              A magical party with your loved ones awaits tonight!
            </p>
            <div className="bg-gradient-to-r from-pink-300 to-purple-300 p-2 sm:p-4 rounded-2xl">
              <p className="font-semibold text-sm sm:text-lg">🕕 7:00 PM</p>
              <p className="text-sm sm:text-lg">📱 Video Call (link sent)</p>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-4 sm:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-amber-300/50">
            <h3 className="text-xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-6">
              🌟 Your Gift
            </h3>
            <p className="text-gray-600 text-sm sm:text-lg mb-2 sm:mb-4">
              A sparkling surprise is waiting in your room!
            </p>
            <div className="bg-gradient-to-r from-amber-300 to-orange-300 p-2 sm:p-4 rounded-2xl">
              <p className="font-semibold text-sm sm:text-lg">
                💡 Hint: It shines like you!
              </p>
              <p className="text-sm sm:text-lg">✨ For my queen</p>
            </div>
          </div>
        </div>

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
                You’re my perfection
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-200 to-indigo-200 p-2 sm:p-4 rounded-xl">
              <p className="font-semibold text-sm sm:text-lg">
                🎶 "Can't Help Myself"
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                I’m yours forever
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

        <div className="mt-6 sm:mt-12">
          <button
            onClick={() => navigateTo("wishes")}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-rose-100 px-6 sm:px-12 py-2 sm:py-5 rounded-full text-base sm:text-2xl font-bold hover:shadow-xl transition-all duration-300 animate-pulse"
          >
            See Wishes 🎊
          </button>
        </div>
      </div>
    </div>
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
  </div>
);

export default SurprisePage;
