import React from "react";
import { Mail } from "lucide-react";
import Navigation from "./Navigation";

const LoveLetter = ({ loginData, navigateTo }) => (
  <div className="w-screen confetti-bg pt-20 pb-20 min-h-[calc(100vh-8rem)]">
    <Navigation navigateTo={navigateTo} />
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-12 shadow-2xl border-2 border-rose-300/50">
        <div className="text-center mb-6 sm:mb-8">
          <Mail className="mx-auto text-rose-500 animate-pulse" size={40} />
          <h1 className="text-3xl sm:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4 sm:mb-6 animate-fade-in">
            💌 My Heart’s Letter 💌
          </h1>
        </div>

        <div className="space-y-4 sm:space-y-6 text-gray-800 leading-relaxed text-sm sm:text-xl">
          <p className="font-semibold animate-fade-in">
            My Dearest {loginData.name},
          </p>

          <p className="animate-fade-in delay-200">
            Today, your birthday fills my heart with joy! You’re my sunshine, my
            strength, my everything. 🎉
          </p>

          <p className="animate-fade-in delay-400">
            Your smile lights my world, and your love makes every day a dream.
            I’m so blessed to have you.
          </p>

          <p className="animate-fade-in delay-600">
            I cherish your laughter, your spirit, and even your sleepy cuddles.
            You’re my perfect love.
          </p>

          <p className="animate-fade-in delay-800">
            I promise to love you forever, support your dreams, and make every
            moment magical for you.
          </p>

          <p className="text-lg sm:text-2xl font-bold animate-fade-in delay-1000">
            Happy Birthday, my soulmate! To our endless love! 💕
          </p>

          <p className="text-right text-lg sm:text-2xl animate-fade-in delay-1200">
            Yours forever,
            <br />
            <span className="font-bold">Your eternal love ❤️</span>
          </p>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <button
            onClick={() => navigateTo("surprise")}
            className="bg-gradient-to-r from-red-600 to-pink-600 text-rose-100 px-6 sm:px-12 py-2 sm:py-5 rounded-full text-base sm:text-2xl font-bold hover:shadow-xl transition-all duration-300 animate-pulse"
          >
            Ready for a Surprise? 🎁
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

export default LoveLetter;
