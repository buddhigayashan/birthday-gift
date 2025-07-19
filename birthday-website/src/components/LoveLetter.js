import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Play, Pause, Volume2, VolumeX } from "lucide-react";
import Navigation from "./Navigation";

const LoveLetter = ({ loginData, navigateTo }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Auto-play music when component mounts
  useEffect(() => {
    const playMusic = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.5; // Set volume to 50%
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.warn("Autoplay failed:", error);
          // Autoplay failed, user will need to click play button
        }
      }
    };

    // Small delay to ensure component is fully mounted
    const timer = setTimeout(playMusic, 500);
    return () => clearTimeout(timer);
  }, []);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.warn("Play failed:", error);
          });
      }
    }
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Floating hearts animation elements
  const floatingHearts = [...Array(10)].map((_, i) => (
    <motion.div
      key={i}
      className="absolute w-6 h-6 bg-pink-400 rounded-full opacity-40"
      style={{
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
      }}
      animate={{
        y: [-10, 10, -10],
        x: [0, 5, -5, 0],
        rotate: [0, 20, -20, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 6 + Math.random() * 3,
        ease: "easeInOut",
        delay: i * 0.5,
      }}
    />
  ));

  // Rose petals animation elements
  const rosePetals = [...Array(15)].map((_, i) => (
    <img
      key={`petal-${i}`}
      src="/petal.png"
      alt="rose petal"
      className="petal absolute w-6 h-6 pointer-events-none"
      style={{
        left: `${Math.random() * 100}vw`,
        animationDuration: `${5 + Math.random() * 5}s`,
        animationDelay: `${Math.random() * 5}s`,
        top: `-${Math.random() * 10}vh`, // start slightly above viewport
      }}
    />
  ));

  // Handler for surprise button click - plays music and navigates
  const handleSurpriseClick = () => {
    // Ensure music is playing before navigating
    if (audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => {
          console.warn("Play failed:", e);
        });
    }
    navigateTo("surprise");
  };

  return (
    <div className="relative w-screen min-h-screen bg-gradient-to-br from-rose-100 via-pink-200 to-rose-300 overflow-hidden pt-20 pb-20">
      {/* 🎵 Background Music */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/romantic-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Music Controls - Fixed position */}
      <motion.div
        className="fixed top-24 right-6 z-50 flex gap-2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <button
          onClick={togglePlayPause}
          className="bg-white/20 backdrop-blur-md border border-pink-300/50 rounded-full p-3 hover:bg-white/30 transition-all duration-300 shadow-lg"
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? (
            <Pause className="text-pink-600" size={20} />
          ) : (
            <Play className="text-pink-600" size={20} />
          )}
        </button>

        <button
          onClick={toggleMute}
          className="bg-white/20 backdrop-blur-md border border-pink-300/50 rounded-full p-3 hover:bg-white/30 transition-all duration-300 shadow-lg"
          title={isMuted ? "Unmute Music" : "Mute Music"}
        >
          {isMuted ? (
            <VolumeX className="text-pink-600" size={20} />
          ) : (
            <Volume2 className="text-pink-600" size={20} />
          )}
        </button>
      </motion.div>

      {/* 🌹 Rose Petals */}
      {rosePetals}

      {/* 💗 Floating Hearts */}
      {floatingHearts}

      {/* Navigation bar */}
      <Navigation navigateTo={navigateTo} />

      {/* 💌 Love Letter Container */}
      <motion.div
        className="relative max-w-5xl mx-auto bg-white/20 backdrop-blur-2xl border border-pink-300/50 rounded-3xl shadow-2xl p-8 sm:p-14 z-10"
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <Mail
            className="mx-auto text-rose-600 animate-pulse drop-shadow-xl"
            size={48}
          />
          <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 mt-4 animate-fade-in">
            💌 To My Sweetest Suddi 💌
          </h1>
        </div>

        {/* Letter Body */}
        <motion.div
          className="space-y-6 text-gray-800 leading-loose text-base sm:text-xl px-4 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <p className="font-semibold">My Dearest Suddi (Dewmi Oshadi),</p>

          <p>
            Today is all about you. The world is lucky to have someone like <strong>
              you</strong> in it — and I’m even luckier to have you in my life. 💖
          </p>

          <p>
           You make everything feel better — your smile, your laugh, even just being near you makes my day brighter. I don’t always have the fanciest words, but I just want you to know how much you mean to me. ✨
          </p>

          <p>
            Every little moment with you — your hugs, your laughs, your sleepy face — they stay in my heart. You’re the most special part of my life, and I don’t ever want that to change. 🌙
          </p>

          <p>
            Thank you for being you. I’ll always be here — through every up and down, through everything. Let’s make this life a good one, together. 🌹
          </p>

          <p className="text-lg sm:text-2xl font-bold text-pink-600">
            Happy Birthday, my beautiful Suddi! You're not just my girlfriend —{" "}
            you are my muse, my light, my forever. 💕
          </p>

          <p className="text-right text-lg sm:text-2xl">
            Forever yours,
            <br />
            <span className="font-bold text-rose-600">
              With all my love, Buddhi ❤️
            </span>
          </p>
        </motion.div>

        {/* Music Status Indicator */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p className="text-pink-600 text-sm flex items-center justify-center gap-2">
            <Volume2 size={16} />
            {isPlaying ? "Playing romantic music..." : "Music paused"}
          </p>
        </motion.div>

        {/* Surprise Button */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <button
            onClick={handleSurpriseClick}
            className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-red-600 hover:to-pink-600 text-white px-8 sm:px-14 py-3 sm:py-5 rounded-full text-lg sm:text-2xl font-bold shadow-xl hover:shadow-pink-300 transition-all duration-300 transform hover:scale-105"
          >
            Ready for a Surprise? 🎁
          </button>
        </motion.div>
      </motion.div>

      {/* Additional CSS for petals animation */}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
        .petal {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoveLetter;
