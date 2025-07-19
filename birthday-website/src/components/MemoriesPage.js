import React from "react";
import Navigation from "./Navigation";

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
  const [showVideo, setShowVideo] = React.useState(false);

  const hearts = [...Array(7)].map((_, i) => {
    const left = Math.random() * 100;
    const delay = i * 1.5;
    const duration = 7 + Math.random() * 5;
    const rotateY = Math.random() * 30 - 15;
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

  const loveRain = [...Array(25)].map((_, i) => {
    const left = Math.random() * 100;
    const duration = 5 + Math.random() * 5;
    const delay = Math.random() * 5;
    return (
      <div
        key={`rain-${i}`}
        className="love-drop"
        style={{
          left: `${left}vw`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0% { top: 100vh; opacity: 0.7; }
          100% { top: -10vh; opacity: 0; }
        }
        @keyframes rainDown {
          0% { top: -10vh; opacity: 0.8; }
          100% { top: 110vh; opacity: 0; }
        }
        .love-drop {
          position: fixed;
          top: -10vh;
          width: 15px;
          height: 15px;
          background-color: rgba(255, 105, 180, 0.7);
          transform: rotate(-45deg);
          border-radius: 50% 50% 0 0;
          box-shadow: 0 0 10px rgba(255, 105, 180, 0.8);
          animation-name: rainDown;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          z-index: 0;
          pointer-events: none;
        }
      `}</style>

      <div className="romantic-bg w-screen pt-20 pb-20 min-h-[calc(100vh-8rem)]">
        {loveRain}
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
                  text: `I was nervous, but your smile made it all worth it. That \"yes\" changed my world forever. Now, every day with you feels like a beautiful beginning. ❤️`,
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
                  <p className="text-gray-600 text-sm sm:text-xl leading-relaxed">
                    {text}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 sm:mt-12">
              {showVideo ? (
                <video
                  controls
                  autoPlay
                  className="mx-auto rounded-2xl shadow-lg w-[80%] sm:w-[50%]"
                >
                  <source
                    src="/WhatsApp Video 2025-07-14 at 18.32.02_5d5f9060.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              ) : (
<>
  <button
    onClick={() => setShowVideo(true)}
    className="pulse-button bg-gradient-to-r from-rose-600 to-pink-600 text-rose-100 px-6 sm:px-12 py-2 sm:py-5 rounded-full text-base sm:text-2xl font-bold hover:shadow-xl transition-all duration-300"
    style={{ boxShadow: "0 0 25px rgba(255, 105, 180, 0.9)" }}
  >
    See Short Sweet Wish Video 🎥
  </button>
  <p>To enjoy the video fully, please open it in full screen.</p>
</>


              )}
            </div>
          </div>
        </div>
        {hearts}
      </div>
    </>
  );
};

export default MemoriesPage;
