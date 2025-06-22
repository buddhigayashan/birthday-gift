import React, { useState, useRef, useEffect } from "react";
import {
  Gift,
  Heart,
  Sparkles,
  Video,
  ArrowLeft,
  Play,
  Pause,
  SkipForward,
  SkipBack,
} from "lucide-react";
import Navigation from "./Navigation";

const SurprisePage = ({ navigateTo }) => {
  const [showGiftBoxes, setShowGiftBoxes] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [showShoes, setShowShoes] = useState(false);
  const [boxOpened, setBoxOpened] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const correctBox = 1;

  const playlist = [
    {
      title: "Kiyannata Beri",
      artist: "Tharam Dushyanth Weeraman",
      file: "/kiyannata-beri-tharam-dushyanth-weeraman.mp3",
    },
    {
      title: "Penena Thek Mane",
      artist: "Samith Sirimanna",
      file: "/penena-thek-mane-samith-sirimanna.mp3",
    },
    {
      title: "Sulagak Wela Oba Soya Enna One",
      artist: "Shihan Mihiranga",
      file: "/Sulagak-Wela-Oba-Soya-Enna-One-Shihan-Mihiranga-www.song.lk.mp3",
    },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current.duration);
      });
      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current.currentTime);
      });
      audioRef.current.addEventListener("ended", nextSong);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentSong].file;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentSong]);

  const togglePlayPause = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log("Audio playback error:", error);
    }
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % playlist.length);
  };

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const selectSong = (index) => {
    setCurrentSong(index);
    setIsPlaying(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleGiftClick = () => {
    setShowGiftBoxes(true);
  };

  const handleBoxClick = (boxIndex) => {
    setSelectedBox(boxIndex);
    setBoxOpened(true);
    setTimeout(() => {
      if (boxIndex === correctBox) {
        setShowShoes(true);
      } else {
        setTimeout(() => {
          setSelectedBox(null);
          setBoxOpened(false);
        }, 1000);
      }
    }, 1000);
  };

  const resetGame = () => {
    setShowGiftBoxes(false);
    setSelectedBox(null);
    setShowShoes(false);
    setBoxOpened(false);
  };

  const FloatingParticle = () => (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full opacity-60 animate-float-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${4 + Math.random() * 3}s`,
          }}
        />
      ))}
      {[...Array(8)].map((_, i) => (
        <div
          key={`heart-${i}`}
          className="fixed text-pink-400 pointer-events-none opacity-60"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            animation: `float-heart ${4 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${i * 1.5}s`,
          }}
        >
          <Heart size={20 + Math.random() * 20} fill="currentColor" />
        </div>
      ))}
    </div>
  );

  if (showShoes) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-pink-900 via-rose-800 to-red-900 animate-gradient-shift">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_50%)] animate-pulse" />
        </div>
        <FloatingParticle />
        <Navigation navigateTo={navigateTo} />
        <div className="relative z-10 pt-24 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 animate-bounce">
              <Sparkles className="mx-auto text-yellow-400" size={64} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent mb-6 animate-fade-in">
              🎉 Congratulations, My Love! 🎉
            </h1>
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Your Perfect Gift! 👠✨
              </h2>
              <img
                src="/shoes.jpg"
                alt="Beautiful shoes"
                className="mx-auto rounded-2xl shadow-xl max-w-xs w-full mb-6 object-cover"
                style={{ maxHeight: "300px" }}
              />
              <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-4 rounded-2xl border border-white/20">
                <p className="text-lg font-semibold text-white mb-2">
                  Elegant shoes for my queen! 👑
                </p>
                <p className="text-sm text-white/80">
                  Stunning and perfect, just like you! 💕
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-full font-bold hover:shadow-xl transition-all duration-300 flex items-center gap-2 hover:scale-105"
              >
                <ArrowLeft size={20} /> Play Again
              </button>
              <button
                onClick={() => navigateTo("wishes")}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Watch Wishes Video 🎬
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showGiftBoxes) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 animate-gradient-shift">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_50%)] animate-pulse" />
        </div>
        <FloatingParticle />
        <Navigation navigateTo={navigateTo} />
        <div className="relative z-10 pt-24 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 animate-fade-in">
              Choose Your Gift Box! 🎁
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Pick a box to reveal your special surprise! 💖
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[0, 1, 2].map((boxIndex) => (
                <div
                  key={boxIndex}
                  className={`relative cursor-pointer transform transition-all duration-500 ${
                    selectedBox === boxIndex ? "scale-110" : "hover:scale-105"
                  }`}
                  onClick={() => !boxOpened && handleBoxClick(boxIndex)}
                >
                  <div
                    className={`bg-gradient-to-br ${
                      boxIndex === 0
                        ? "from-red-400 to-pink-500"
                        : boxIndex === 1
                        ? "from-purple-400 to-indigo-500"
                        : "from-blue-400 to-cyan-500"
                    } p-6 rounded-3xl shadow-2xl border-2 border-white/30 ${
                      selectedBox === boxIndex && boxOpened ? "animate-pulse" : ""
                    }`}
                  >
                    <Gift
                      size={60}
                      className={`mx-auto text-white mb-2 ${
                        selectedBox === boxIndex ? "animate-bounce" : ""
                      }`}
                    />
                    <h3 className="text-lg font-bold text-white">
                      Box {boxIndex + 1}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {selectedBox === boxIndex && boxOpened
                        ? boxIndex === correctBox
                          ? "🎉 Winner!"
                          : "😔 Try Again!"
                        : "Click to Open!"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={resetGame}
              className="mt-8 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-full font-bold hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto hover:scale-105"
            >
              <ArrowLeft size={20} />
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-orange-900 via-red-800 to-pink-900 animate-gradient-shift">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_50%)] animate-pulse" />
        <div
          className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(255,0,128,0.1)_0deg,transparent_60deg,rgba(255,165,0,0.1)_120deg,transparent_180deg,rgba(255,255,0,0.1)_240deg,transparent_300deg,rgba(255,0,128,0.1)_360deg)] animate-spin"
          style={{ animationDuration: "20s" }}
        />
      </div>
      <FloatingParticle />
      <audio ref={audioRef} preload="metadata" />
      <Navigation navigateTo={navigateTo} />
      <div className="relative z-10 pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8 animate-bounce">
            <Gift className="mx-auto text-yellow-400" size={64} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent mb-6 animate-fade-in">
            🎁 Surprise, My Love! 🎁
          </h1>
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
            A special gift awaits you! Explore the surprises crafted with all my love. 💖
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/20 hover:scale-105">
              <Video className="mx-auto text-purple-400 mb-4" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">
                Special Wishes Video
              </h3>
              <p className="text-sm text-white/80 mb-4">
                A heartfelt video message just for you!
              </p>
              <button
                onClick={() => navigateTo("wishes")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-bold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Watch Now 🎬
              </button>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/20 hover:scale-105">
              <Gift className="mx-auto text-orange-400 mb-4" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">
                Your Special Gift
              </h3>
              <p className="text-sm text-white/80 mb-4">
                Something elegant for your pretty feet! ✨
              </p>
              <button
                onClick={handleGiftClick}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-full font-bold hover:shadow-xl transition-all duration-300 animate-pulse hover:scale-105"
              >
                Open Gift! 🎁
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center gap-2">
              🎵 Our Love Playlist
              <Heart className="text-pink-400 animate-pulse" size={24} />
            </h3>
            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-4 mb-6 border border-white/20">
              <h4 className="text-lg font-bold text-white mb-2">Now Playing:</h4>
              <p className="text-base text-pink-300 font-semibold">
                {playlist[currentSong].title}
              </p>
              <p className="text-sm text-white/70">
                {playlist[currentSong].artist}
              </p>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-white/70 mb-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-pink-400 to-purple-400 h-2 rounded-full"
                    style={{
                      width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={prevSong}
                className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white hover:shadow-lg transition-all duration-300 hover:scale-110"
              >
                <SkipBack size={20} />
              </button>
              <button
                onClick={togglePlayPause}
                className="p-3 bg-gradient-to-r from-pink-600 to-red-600 rounded-full text-white hover:shadow-xl transition-all duration-300 hover:scale-110"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button
                onClick={nextSong}
                className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white hover:shadow-lg transition-all duration-300 hover:scale-110"
              >
                <SkipForward size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {playlist.map((song, index) => (
                <div
                  key={index}
                  onClick={() => selectSong(index)}
                  className={`cursor-pointer p-4 rounded-xl transition-all duration-300 hover:scale-105 border ${
                    currentSong === index
                      ? "bg-gradient-to-r from-pink-500/30 to-purple-500/30 border-pink-400"
                      : "bg-white/10 border-white/20 hover:border-white/40"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {currentSong === index && isPlaying ? (
                      <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse" />
                    ) : (
                      <div className="w-3 h-3 bg-white/40 rounded-full" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {song.title}
                      </p>
                      <p className="text-xs text-white/70">{song.artist}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes float-particle {
          0% { transform: translateY(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        @keyframes float-heart {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-50px) scale(1.2); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.8; }
        }
        .animate-gradient-shift { animation: gradient-shift 4s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle 8s linear infinite; }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default SurprisePage;