import React from "react";
import Navigation from "./Navigation";

// Base style for floating hearts with 3D effects
const heartStyleBase = {
  position: "fixed",
  width: "30px",
  height: "30px",
  backgroundColor: "rgba(255, 105, 180, 0.7)",
  transform: "rotate(-45deg) translateZ(0)",
  animationName: "floatUp",
  animationTimingFunction: "ease-in-out",
  animationIterationCount: "infinite",
  filter: "drop-shadow(0 0 12px rgba(255, 105, 180, 0.9))",
  opacity: 0.7,
  zIndex: 2,
  pointerEvents: "none",
  borderRadius: "15px 15px 0 0",
};

const MemoriesPage = ({ navigateTo }) => {
  // Floating animated hearts with 3D rotation
  const hearts = [...Array(7)].map((_, i) => {
    const left = Math.random() * 100;
    const delay = i * 1.5;
    const duration = 7 + Math.random() * 5;
    const rotateY = Math.random() * 30 - 15; // Slight 3D rotation
    return (
      <div
        key={i}
        style={{
          ...heartStyleBase,
          left: `${left}vw`,
          top: "110vh",
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          transform: `rotate(-45deg) rotateY(${rotateY}deg) translateZ(0)`,
        }}
      >
        <svg
          viewBox="0 0 32 29.6"
          width="30"
          height="30"
          fill="rgba(255, 105, 180, 0.9)"
          style={{
            filter: "drop-shadow(0 0 15px rgba(255, 105, 180, 1))",
            display: "block",
            transform: "translateZ(10px)",
          }}
        >
          <path d="M23.6 0c-3.1 0-5.9 1.7-7.6 4.3C14.3 1.7 11.5 0 8.4 0 3.8 0 0 3.8 0 8.4c0 4.7 4.7 8.7 11.8 14.8 0.5 0.4 1.2 0.4 1.7 0 7.1-6.1 11.8-10.1 11.8-14.8C31.6 3.8 27.8 0 23.6 0z" />
        </svg>
      </div>
    );
  });

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(-45deg) rotateY(0deg) translateZ(0);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-60vh) rotate(-45deg) rotateY(20deg) translateZ(20px);
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) rotate(-45deg) rotateY(0deg) translateZ(0);
            opacity: 0;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px) rotateX(-10deg); }
          to { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }
        @keyframes pulseBg {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5) translateZ(0); }
          50% { opacity: 0.8; transform: scale(1.2) translateZ(10px); }
        }
        .romantic-bg {
          background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 40%, #f0c4e8 100%);
          background-size: 300% 300%;
          animation: pulseBg 12s ease-in-out infinite alternate;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }
        .sparkle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: sparkle 3s infinite;
          z-index: 1;
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.9));
        }
        .memory-card {
          backdrop-filter: blur(20px) saturate(150%);
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2rem;
          border: 2px solid rgba(255, 182, 193, 0.3);
          box-shadow: 0 10px 40px rgba(255, 105, 180, 0.2);
          transition: all 0.5s cubic-bezier(0.5, 1.8, 0.3, 0.8);
          position: relative;
          overflow: hidden;
          animation: fadeIn 1.3s cubic-bezier(0.5, 1.8, 0.3, 0.8) both;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        .memory-card:hover {
          transform: translateY(-10px) scale(1.05) rotateX(5deg);
          box-shadow: 0 20px 50px rgba(255, 105, 180, 0.25);
        }
        .glow-title {
          text-shadow: 0 0 20px rgba(255, 105, 180, 0.9), 0 0 40px rgba(255, 105, 180, 0.4);
          animation: fadeIn 1.6s cubic-bezier(0.5, 1.8, 0.3, 0.8) both;
        }
        .pulse-button {
          animation: fadeIn 1.7s cubic-bezier(0.5, 1.8, 0.3, 0.8) both, pulseBtn 2.5s infinite;
          transform: translateZ(0);
        }
        @keyframes pulseBtn {
          0% { box-shadow: 0 0 0 0 rgba(255, 105, 180, 0.8); transform: translateZ(0); }
          70% { box-shadow: 0 0 0 20px rgba(255, 105, 180, 0); transform: translateZ(10px); }
          100% { box-shadow: 0 0 0 0 rgba(255, 105, 180, 0); transform: translateZ(0); }
        }
      `}</style>

      <div className="romantic-bg w-screen pt-20 pb-20 min-h-[calc(100vh-8rem)]">
        {/* Sparkle effects for dreamy background */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}vw`,
              top: `${Math.random() * 100}vh`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
        <Navigation navigateTo={navigateTo} />
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="glow-title text-3xl sm:text-6xl font-extrabold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-6 sm:mb-12">
              🌟 Our Precious Memories 🌟
            </h1>
            <div className="space-y-6 sm:space-y-10">
              {[
                {
                  title: "The Day We Met",
                  text: "Our eyes locked, and my world changed. You’re my dream, my love, my everything. ✨",
                  delay: "0s",
                },
                {
                  title: "The Moment I Asked You Out",
                  text: `I was nervous, but your smile made it all worth it. That "yes" changed my world forever. Now, every day with you feels like a beautiful beginning. ❤️`,
                  delay: "0.2s",
                },
                {
                  title: "Every Day With You",
                  text: "Each moment with you is a gift. Here’s to our endless love story! 🥰",
                  delay: "0.4s",
                },
              ].map(({ title, text, delay }, idx) => (
                <div
                  key={idx}
                  className="memory-card p-4 sm:p-10 shadow-2xl hover:shadow-3xl border-2 border-rose-300/50"
                  style={{ animationDelay: delay }}
                >
                  <h3 className="text-xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-6">
                    {title}
                  </h3>
                  <p
                    className="text-gray-600 text-sm sm:text-xl leading-relaxed"
                    style={{ animationDelay: delay }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 sm:mt-12">
              <button
                onClick={() => navigateTo("gallery")}
                className="pulse-button bg-gradient-to-r from-rose-600 to-pink-600 text-rose-100 px-6 sm:px-12 py-2 sm:py-5 rounded-full text-base sm:text-2xl font-bold hover:shadow-xl transition-all duration-300"
                style={{ boxShadow: "0 0 25px rgba(255, 105, 180, 0.9)" }}
              >
                See Our Photo Gallery 📸
              </button>
            </div>
          </div>
        </div>
        {hearts}
      </div>
    </>
  );
};

export default MemoriesPage;
