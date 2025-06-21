import React from "react";
import { Camera } from "lucide-react";
import Navigation from "./Navigation";

const PhotoGallery = ({ navigateTo }) => (
  <div className="w-screen confetti-bg pt-20 pb-20 min-h-[calc(100vh-8rem)]">
    <Navigation navigateTo={navigateTo} />
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center">
        <h1 className="text-3xl sm:text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 sm:mb-12 animate-fade-in">
          📸 Our Love in Pictures 📸
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white/20 backdrop-blur-xl rounded-3xl p-3 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-purple-300/50"
            >
              <div className="aspect-square bg-gradient-to-br from-pink-300 to-purple-300 rounded-2xl flex items-center justify-center mb-2 sm:mb-4">
                <Camera className="text-gray-600" size={32} />
                <span className="ml-1 sm:ml-2 text-gray-700 font-semibold text-sm sm:text-lg">
                  Photo {i}
                </span>
              </div>
              <p className="text-center text-gray-800 font-semibold text-sm sm:text-lg animate-fade-in">
                {i === 1 && "Our first adventure together"}
                {i === 2 && "That perfect sunset moment"}
                {i === 3 && "Your radiant smile"}
                {i === 4 && "Dancing in the rain"}
                {i === 5 && "Our cozy night"}
                {i === 6 && "Your laughter that day"}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:mt-12 bg-white/20 backdrop-blur-xl rounded-3xl p-4 sm:p-10 shadow-2xl border-2 border-purple-300/50 max-w-4xl mx-auto">
          <p className="text-gray-600 text-sm sm:text-xl italic animate-fade-in">
            Every photo with you is a treasure. Add our real memories to make it
            perfect! 💝
          </p>
          <button
            onClick={() => navigateTo("letter")}
            className="mt-4 sm:mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-rose-100 px-6 sm:px-12 py-2 sm:py-5 rounded-full text-base sm:text-2xl font-bold hover:shadow-xl transition-all duration-300 animate-pulse"
          >
            Read My Love Letter 💌
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

export default PhotoGallery;
