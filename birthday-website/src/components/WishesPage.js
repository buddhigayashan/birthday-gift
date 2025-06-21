import React from "react";
import { Heart, Star } from "lucide-react";
import Navigation from "./Navigation";

const WishesPage = ({ navigateTo }) => (
  <div className="w-screen confetti-bg pt-20 pb-20 min-h-[calc(100vh-8rem)]">
    <Navigation navigateTo={navigateTo} />
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center">
        <h1 className="text-3xl sm:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 sm:mb-12 animate-fade-in">
          🎊 Love & Wishes 🎊
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {[
            {
              name: "Mom & Dad",
              message: "Happy birthday, our angel! Shine bright! 🥰",
              color: "from-pink-300 to-rose-300",
            },
            {
              name: "Sarah",
              message: "HAPPY BIRTHDAY! 🎉 Party tonight! 💕",
              color: "from-purple-300 to-pink-300",
            },
            {
              name: "Work Team",
              message: "Happy birthday, star! Enjoy! 🎂",
              color: "from-blue-300 to-indigo-300",
            },
            {
              name: "Grandma",
              message: "My dear, happy birthday! Love you! 👵💝",
              color: "from-amber-300 to-orange-300",
            },
            {
              name: "Friends",
              message: "Happy birthday! 🎈 Miss you! Have fun!",
              color: "from-green-300 to-teal-300",
            },
            {
              name: "Tommy",
              message: "Happy birthday, Auntie! 🖍️👦",
              color: "from-red-300 to-pink-300",
            },
          ].map((wish, i) => (
            <div
              key={i}
              className={`bg-white/20 backdrop-blur-xl rounded-3xl p-3 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 ${wish.color}/50`}
            >
              <div className="text-center mb-2 sm:mb-4">
                <div className="w-12 sm:w-20 h-12 sm:h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-3">
                  <Heart className="text-rose-500 animate-pulse" size={16} />
                </div>
                <h3 className="text-base sm:text-2xl font-bold text-gray-800">
                  {wish.name}
                </h3>
              </div>
              <p className="text-gray-800 text-sm sm:text-lg italic animate-fade-in">
                "{wish.message}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:mt-12 bg-white/20 backdrop-blur-xl rounded-3xl p-4 sm:p-10 shadow-2xl border-2 border-purple-300/50 max-w-4xl mx-auto">
          <Star className="mx-auto text-amber-500 animate-pulse" size={40} />
          <h2 className="text-xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-6 animate-fade-in">
            🌟 You Are Loved 🌟
          </h2>
          <p className="text-gray-600 text-sm sm:text-xl mb-2 sm:mb-6 animate-fade-in delay-200">
            Your love touches everyone. Shine on your special day, my heart!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
            <button
              onClick={() => navigateTo("welcome")}
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-rose-100 px-4 sm:px-10 py-2 sm:py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300 animate-pulse text-sm sm:text-lg"
            >
              Home 🏠
            </button>
            <button
              onClick={() => navigateTo("memories")}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-rose-100 px-4 sm:px-10 py-2 sm:py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300 animate-pulse text-sm sm:text-lg"
            >
              Memories 💭
            </button>
          </div>
        </div>

        <div className="mt-4 sm:mt-8">
          <div className="inline-block bg-gradient-to-r from-pink-600 to-purple-600 text-rose-100 px-6 sm:px-12 py-2 sm:py-6 rounded-full text-base sm:text-3xl font-extrabold shadow-2xl animate-fade-in">
            🎂 Happy Birthday, My Queen! 🎂
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

export default WishesPage;
