import React from "react";
import { Lock } from "lucide-react";

const LoginPage = ({ loginData, setLoginData, handleLogin }) => (
  <div className="w-screen confetti-bg pt-20 pb-20 min-h-[calc(100vh-8rem)]">
    <div className="max-w-lg mx-auto px-4">
      <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-rose-300/50">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="bg-gradient-to-r from-rose-500 to-purple-600 p-3 sm:p-5 rounded-full shadow-lg">
              <Lock className="text-rose-100" size={28} />
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-rose-100 mb-2 animate-fade-in">
            🎉 Birthday Surprise 🎉
          </h1>
          <p className="text-rose-100/80 text-base sm:text-lg">
            Unlock your magical day, my sweetheart!
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <input
              type="text"
              placeholder="Your beautiful name..."
              value={loginData.name}
              onChange={(e) =>
                setLoginData({ ...loginData, name: e.target.value })
              }
              className="w-full p-3 sm:p-5 rounded-2xl bg-white/10 border border-rose-200/30 text-rose-100 placeholder-rose-100/60 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all duration-300 text-base sm:text-lg"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Secret password (hint: my love for you) ❤️"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="w-full p-3 sm:p-5 rounded-2xl bg-white/10 border border-rose-200/30 text-rose-100 placeholder-rose-100/60 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all duration-300 text-base sm:text-lg"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-rose-100 p-3 sm:p-5 rounded-2xl font-bold hover:bg-rose-600 hover:shadow-xl transition-all duration-300 animate-pulse text-base sm:text-lg"
          >
            Unlock the Magic! ✨
          </button>
        </div>

        <div className="text-center mt-4 sm:mt-6">
          <p className="text-rose-100/60 text-sm sm:text-lg">
            Made with all my heart for you 💕
          </p>
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
          animationDelay: `${i * 1}s`,
        }}
      />
    ))}
    <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-rose-500/80 to-purple-600/80 backdrop-blur-md text-rose-100 p-2 sm:p-4 text-center shadow-lg animate-fade-in">
      <p className="text-sm sm:text-lg font-semibold">
        Created by Buddhi - A Full-Stack Developer & Creative Technologist from
        Sri Lanka 🇱🇰
      </p>
      <p className="text-xs sm:text-sm">
        🌐 Website: Coming Soon | 🔗 LinkedIn:{" "}
        <a
          href="https://linkedin.com/in/buddhi-jayawickrama-a82007366"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          linkedin.com/in/buddhi-jayawickrama-a82007366
        </a>
      </p>
      <p className="text-xs sm:text-sm">
        📱 Phone: 0717071306 | 📧 Email:{" "}
        <a
          href="mailto:buddhigjayawickrama@gmail.com"
          className="underline hover:text-white"
        >
          buddhigjayawickrama@gmail.com
        </a>
      </p>
    </footer>
  </div>
);

export default LoginPage;
