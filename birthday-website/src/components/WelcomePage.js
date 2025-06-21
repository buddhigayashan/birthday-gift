import React from "react";
import { Gift, Heart, Sparkles } from "lucide-react";
import Navigation from "./Navigation";

const WelcomePage = ({ loginData, navigateTo }) => (
  <div className="w-screen confetti-bg pt-20 pb-20 min-h-[calc(100vh-8rem)]">
    <Navigation navigateTo={navigateTo} />
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center">
        <div className="mb-6 sm:mb-10 animate-bounce">
          <Gift className="mx-auto text-rose-500" size={80} />
        </div>
        <h1 className="text-4xl sm:text-8xl font-extrabold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6 animate-fade-in">
          🎂 HAPPY BIRTHDAY! 🎂
        </h1>
        <h2 className="text-2xl sm:text-5xl text-gray-800 mb-6 sm:mb-10 font-bold animate-fade-in delay-200">
          My darling {loginData.name}, your day has begun!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-4 sm:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-rose-300/50">
            <Heart
              className="mx-auto text-rose-500 mb-4 sm:mb-6 animate-pulse"
              size={40}
            />
            <h3 className="text-xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
              Made With Love
            </h3>
            <p className="text-gray-600 text-sm sm:text-lg">
              This is all for you, filled with my endless love and birthday
              wishes!
            </p>
            <button
              onClick={() => navigateTo("memories")}
              className="mt-4 sm:mt-6 bg-gradient-to-r from-rose-500 to-red-500 text-rose-100 px-6 sm:px-10 py-2 sm:py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300 animate-pulse text-sm sm:text-lg"
            >
              Explore Memories
            </button>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-4 sm:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-rose-300/50">
            <Sparkles
              className="mx-auto text-purple-500 mb-4 sm:mb-6 animate-pulse"
              size={40}
            />
            <h3 className="text-xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
              Magical Surprises
            </h3>
            <p className="text-gray-600 text-sm sm:text-lg">
              Unwrap the surprises I’ve crafted for you, my love!
            </p>
            <button
              onClick={() => navigateTo("surprise")}
              className="mt-4 sm:mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-rose-100 px-6 sm:px-10 py-2 sm:py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300 animate-pulse text-sm sm:text-lg"
            >
              Find Surprises
            </button>
          </div>
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

export default WelcomePage;
