import React from "react";
import Navigation from "./Navigation";

const MemoriesPage = ({ navigateTo }) => (
  <div className="w-screen confetti-bg pt-20 pb-20 min-h-[calc(100vh-8rem)]">
    <Navigation navigateTo={navigateTo} />
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center">
        <h1 className="text-3xl sm:text-6xl font-extrabold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-6 sm:mb-12 animate-fade-in">
          🌟 Our Precious Memories 🌟
        </h1>

        <div className="space-y-6 sm:space-y-10">
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-4 sm:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-rose-300/50">
            <h3 className="text-xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-6">
              The Day We Met
            </h3>
            <p className="text-gray-600 text-sm sm:text-xl leading-relaxed animate-fade-in">
              Our eyes locked, and my world changed. You’re my dream, my love,
              my everything. ✨
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-4 sm:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-rose-300/50">
            <h3 className="text-xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-6">
              Our First Date
            </h3>
            <p className="text-gray-600 text-sm sm:text-xl leading-relaxed animate-fade-in delay-200">
              Your smile stole my heart that night. I knew I’d love you forever.
              💕
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-4 sm:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-rose-300/50">
            <h3 className="text-xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-6">
              Every Day With You
            </h3>
            <p className="text-gray-600 text-sm sm:text-xl leading-relaxed animate-fade-in delay-400">
              Each moment with you is a gift. Here’s to our endless love story!
              🥰
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-12">
          <button
            onClick={() => navigateTo("gallery")}
            className="bg-gradient-to-r from-rose-600 to-pink-600 text-rose-100 px-6 sm:px-12 py-2 sm:py-5 rounded-full text-base sm:text-2xl font-bold hover:shadow-xl transition-all duration-300 animate-pulse"
          >
            See Our Photo Gallery 📸
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

export default MemoriesPage;
