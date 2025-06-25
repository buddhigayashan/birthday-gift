import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  Star,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Sparkles,
  Crown,
} from "lucide-react";
import Navigation from "./Navigation";

const WishesPage = ({ navigateTo }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showLoveMessage, setShowLoveMessage] = useState(false);
  const audioRef = useRef(null);

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

  const games = [
    "Tic Tac Toe",
    "Rock Paper Scissors",
    "Guess Number",
    "Memory Match",
    "Typing Speed",
    "Reaction Time",
  ];

  const GameSelector = () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1.5rem",
        padding: "1.5rem",
        justifyItems: "center",
      }}
    >
      {games.map((game, idx) => (
        <button
          key={idx}
          onClick={() => setSelectedGame(game)}
          style={{
            background: "linear-gradient(135deg, #ff6b9d, #c44569, #f8b500)",
            color: "#1a1a1a",
            padding: "1.5rem",
            borderRadius: "20px",
            fontWeight: "bold",
            fontSize: "1.1rem",
            boxShadow: "0 15px 35px rgba(255,107,157,0.4)",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            cursor: "pointer",
            border: "2px solid rgba(255,255,255,0.3)",
            position: "relative",
            overflow: "hidden",
            width: "100%",
            maxWidth: "250px",
            textAlign: "center",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-5px) scale(1.05)";
            e.target.style.boxShadow = "0 25px 50px rgba(255,107,157,0.6)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0) scale(1)";
            e.target.style.boxShadow = "0 15px 35px rgba(255,107,157,0.4)";
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background:
                "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
              transform: "rotate(45deg)",
              animation: "shimmer 3s infinite",
            }}
          />
          💖 {game} 💖
        </button>
      ))}
    </div>
  );

  const GameSuccess = () => (
    <div
      style={{
        textAlign: "center",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,182,193,0.7))",
        backdropFilter: "blur(20px)",
        borderRadius: "25px",
        padding: "3rem",
        boxShadow: "0 20px 40px rgba(255,20,147,0.3)",
        border: "2px solid rgba(255,105,180,0.6)",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <Crown
        style={{
          color: "#ff1493",
          margin: "0 auto 1rem",
          animation: "bounce 2s infinite",
        }}
        size={48}
      />
      <h3
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#1a1a1a",
          marginBottom: "1rem",
        }}
      >
        {selectedGame}
      </h3>
      <p style={{ color: "#1a1a1a", marginBottom: "2rem", fontSize: "1.2rem" }}>
        🎉 You conquered {selectedGame}! My champion! 🏆
      </p>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => navigateTo("games")}
          style={{
            background: "linear-gradient(135deg, #ff6b9d, #c44569)",
            color: "#fff",
            padding: "1rem 2rem",
            borderRadius: "25px",
            fontWeight: "bold",
            boxShadow: "0 10px 25px rgba(196,69,105,0.4)",
            transition: "all 0.3s",
            cursor: "pointer",
            border: "2px solid rgba(255,255,255,0.3)",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 15px 35px rgba(196,69,105,0.6)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 10px 25px rgba(196,69,105,0.4)";
          }}
        >
          Play Full Game 🎮
        </button>
        <button
          onClick={() => setSelectedGame(null)}
          style={{
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "#fff",
            padding: "1rem 2rem",
            borderRadius: "25px",
            fontWeight: "bold",
            boxShadow: "0 10px 25px rgba(118,75,162,0.4)",
            transition: "all 0.3s",
            cursor: "pointer",
            border: "2px solid rgba(255,255,255,0.3)",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 15px 35px rgba(118,75,162,0.6)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 10px 25px rgba(118,75,162,0.4)";
          }}
        >
          ⬅️ Back to Heaven
        </button>
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: "100vw",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
        padding: "5rem 0",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Navigation navigateTo={navigateTo} />
      <audio ref={audioRef} preload="metadata" />

      {/* Floating romantic elements */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            fontSize: `${Math.random() * 20 + 15}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `floatRomantic ${8 + Math.random() * 4}s infinite ${
              Math.random() * 5
            }s`,
            opacity: "0.7",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          {
            ["💕", "💖", "🌹", "💝", "✨", "🦋", "💎", "🌸"][
              Math.floor(Math.random() * 8)
            ]
          }
        </div>
      ))}

      <div
        style={{
          maxWidth: "80rem",
          width: "100%",
          padding: "0 2rem",
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4rem",
        }}
      >
        {/* Enhanced Title */}
        <div style={{ textAlign: "center", width: "100%" }}>
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "900",
              color: "#1a1a1a",
              marginBottom: "1rem",
              textShadow: "0 0 10px rgba(255,255,255,0.5)",
            }}
          >
            💖 Love & Desires 💖
          </h1>
          <p
            style={{
              fontSize: "1.5rem",
              color: "#1a1a1a",
              fontStyle: "italic",
              textShadow: "0 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            Where every heartbeat whispers your name...
          </p>
        </div>

        {/* Enhanced Wishes Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2.5rem",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {[
            {
              name: "Mom & Dad",
              message:
                "Happy Birthday, our precious daughter! You illuminate our world with your beauty, grace, and loving heart. Today and always, you are our greatest blessing. 🎂❤️",
              color: "linear-gradient(135deg, #ff9a9e, #fecfef, #fecfef)",
              icon: "👑",
            },
            {
              name: "Buddhi",
              message:
                "Happy Birthday, my goddess, my everything... You are the poetry my heart writes, the dream I never want to wake from. Your love intoxicates my soul. 💋💖",
              color: "linear-gradient(135deg, #a18cd1, #fbc2eb, #fbc2eb)",
              icon: "💕",
            },
          ].map((wish, i) => (
            <div
              key={i}
              style={{
                background: wish.color,
                borderRadius: "30px",
                padding: "3rem",
                boxShadow: "0 25px 60px rgba(255,20,147,0.3)",
                transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                border: "3px solid rgba(255,255,255,0.4)",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-10px) scale(1.02)";
                e.currentTarget.style.boxShadow =
                  "0 35px 80px rgba(255,20,147,0.5)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 25px 60px rgba(255,20,147,0.3)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  background:
                    "linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)",
                  transform: "rotate(45deg)",
                  animation: "shimmer 4s infinite",
                }}
              />
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "2rem",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "6rem",
                    height: "6rem",
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem",
                    boxShadow: "0 15px 35px rgba(255,255,255,0.2)",
                    border: "2px solid rgba(255,255,255,0.5)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "2rem",
                      animation: "heartbeat 2s infinite",
                    }}
                  >
                    {wish.icon}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "#1a1a1a",
                    textShadow: "0 2px 5px rgba(255,255,255,0.3)",
                  }}
                >
                  {wish.name}
                </h3>
              </div>
              <p
                style={{
                  color: "#1a1a1a",
                  fontStyle: "italic",
                  fontSize: "1.2rem",
                  lineHeight: "1.6",
                  textAlign: "center",
                }}
              >
                "{wish.message}"
              </p>
            </div>
          ))}
        </div>

        {/* Secret Love Message */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(255,20,147,0.1), rgba(255,105,180,0.2))",
            backdropFilter: "blur(20px)",
            borderRadius: "30px",
            padding: "3rem",
            boxShadow: "0 25px 60px rgba(255,20,147,0.3)",
            border: "3px solid rgba(255,20,147,0.3)",
            maxWidth: "50rem",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => setShowLoveMessage(!showLoveMessage)}
            style={{
              background: "linear-gradient(135deg, #ff1493, #ff69b4)",
              color: "#fff",
              padding: "1rem 2rem",
              borderRadius: "25px",
              fontWeight: "bold",
              fontSize: "1.2rem",
              boxShadow: "0 15px 35px rgba(255,20,147,0.4)",
              transition: "all 0.3s",
              cursor: "pointer",
              border: "2px solid rgba(255,255,255,0.3)",
              marginBottom: showLoveMessage ? "2rem" : "0",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 20px 45px rgba(255,20,147,0.6)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 15px 35px rgba(255,20,147,0.4)";
            }}
          >
            💋 {showLoveMessage ? "Hide" : "Reveal"} Secret Message 💋
          </button>
          {showLoveMessage && (
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,182,193,0.7))",
                borderRadius: "20px",
                padding: "2rem",
                animation: "fadeInUp 0.5s ease-out",
                border: "2px solid rgba(255,105,180,0.4)",
                width: "100%",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "1.4rem",
                  color: "#1a1a1a",
                  fontStyle: "italic",
                  lineHeight: "1.7",
                }}
              >
                "My darling, you are the fire in my veins, the rhythm of my
                heart, the very essence of my desires. Every curve of your smile
                ignites passion in my soul. You are my addiction, my sanctuary,
                my forever love. Happy Birthday, my irresistible queen... 🔥💕"
              </p>
            </div>
          )}
        </div>

        {/* Enhanced Games Section */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,182,193,0.7))",
            backdropFilter: "blur(25px)",
            borderRadius: "30px",
            padding: "3rem",
            boxShadow: "0 30px 70px rgba(167,139,250,0.4)",
            border: "3px solid rgba(167,139,250,0.5)",
            maxWidth: "60rem",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Star
              style={{
                color: "#f59e0b",
                animation: "spin 4s linear infinite",
                margin: "0 auto",
                display: "block",
                filter: "drop-shadow(0 0 10px #f59e0b)",
              }}
              size={50}
            />
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "#1a1a1a",
                marginTop: "1rem",
                marginBottom: "1rem",
                textShadow: "0 0 10px rgba(255,255,255,0.5)",
              }}
            >
              🎮 Passionate Playgrounds 🎮
            </h2>
            <p
              style={{
                color: "#1a1a1a",
                fontSize: "1.3rem",
                fontStyle: "italic",
              }}
            >
              Let's play together, my love... every game is sweeter with you! 💖
            </p>
          </div>
          {selectedGame ? <GameSuccess /> : <GameSelector />}
        </div>

        {/* Enhanced Music Section */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(255,20,147,0.1), rgba(255,105,180,0.2))",
            backdropFilter: "blur(25px)",
            borderRadius: "30px",
            padding: "3rem",
            boxShadow: "0 30px 70px rgba(236,72,153,0.4)",
            border: "3px solid rgba(236,72,153,0.5)",
            maxWidth: "60rem",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#1a1a1a",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              textShadow: "0 0 10px rgba(255,255,255,0.5)",
            }}
          >
            🎵 Your Love Symphony
            <Heart
              style={{
                color: "#f472b6",
                animation: "heartbeat 2s infinite",
                filter: "drop-shadow(0 0 10px #f472b6)",
              }}
              size={35}
            />
          </h3>

          {/* Now Playing Enhanced */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,182,193,0.7))",
              borderRadius: "20px",
              padding: "2rem",
              marginBottom: "2rem",
              border: "2px solid rgba(255,255,255,0.3)",
              position: "relative",
              overflow: "hidden",
              width: "100%",
              maxWidth: "500px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                height: "100%",
                background: `linear-gradient(90deg, rgba(255,20,147,0.1) ${
                  (currentTime / duration) * 100
                }%, transparent ${(currentTime / duration) * 100}%)`,
                transition: "all 0.3s ease",
              }}
            />
            <div style={{ position: "relative", zIndex: 2 }}>
              <h4
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  color: "#1a1a1a",
                  marginBottom: "0.5rem",
                  display: ".jet-black",
                  gap: "0.5rem",
                }}
              >
                <Sparkles
                  style={{
                    color: "#ff1493",
                    animation: "twinkle 2s infinite",
                  }}
                  size={20}
                />
                Now Serenading:
              </h4>
              <p
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "700",
                  color: "#1a1a1a",
                  textShadow: "0 2px 5px rgba(255,255,255,0.3)",
                }}
              >
                {playlist[currentSong].title}
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#333333",
                  fontStyle: "italic",
                }}
              >
                by {playlist[currentSong].artist}
              </p>
              <div style={{ marginTop: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.9rem",
                    color: "#333333",
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                  }}
                >
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.3)",
                    borderRadius: "25px",
                    height: "8px",
                    overflow: "hidden",
                    boxShadow: "inset 0 2px 5px rgba(0,0,0,0.2)",
                  }}
                >
                  <div
                    style={{
                      background:
                        "linear-gradient(90deg, #ff1493, #ff69b4, #fff)",
                      height: "8px",
                      borderRadius: "25px",
                      width: `${
                        duration ? (currentTime / duration) * 100 : 0
                      }%`,
                      transition: "width 0.3s ease",
                      boxShadow: "0 0 10px rgba(255,20,147,0.5)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Controls */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <button
              onClick={prevSong}
              style={{
                padding: "1rem",
                background: "linear-gradient(135deg, #a78bfa, #4f46e5)",
                borderRadius: "50%",
                color: "#fff",
                boxShadow: "0 10px 25px rgba(79,70,229,0.4)",
                transition: "all 0.3s",
                cursor: "pointer",
                border: "2px solid rgba(255,255,255,0.3)",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.15)";
                e.target.style.boxShadow = "0 15px 35px rgba(79,70,229,0.6)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 10px 25px rgba(79,70,229,0.4)";
              }}
            >
              <SkipBack size={24} />
            </button>
            <button
              onClick={togglePlayPause}
              style={{
                padding: "0.75rem",
                background: "linear-gradient(to right, #ec4899, #f43f5e)",
                borderRadius: "9999px",
                color: "#fff",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={nextSong}
              style={{
                padding: "0.5rem",
                background: "linear-gradient(to right, #a78bfa, #4f46e5)",
                borderRadius: "9999px",
                color: "#fff",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              <SkipForward size={20} />
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gap: "1rem",
              width: "100%",
              maxWidth: "500px",
            }}
          >
            {playlist.map((song, index) => (
              <div
                key={index}
                onClick={() => selectSong(index)}
                style={{
                  cursor: "pointer",
                  padding: "1rem",
                  borderRadius: "0.75rem",
                  transition: "all 0.3s",
                  background:
                    currentSong === index
                      ? "linear-gradient(to right, rgba(236,72,153,0.3), rgba(168,85,247,0.3))"
                      : "rgba(255,255,255,0.1)",
                  border:
                    currentSong === index
                      ? "1px solid #f472b6"
                      : "1px solid rgba(255,255,255,0.2)",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "0.75rem",
                      height: "0.75rem",
                      background:
                        currentSong === index && isPlaying
                          ? "#f472b6"
                          : "rgba(255,255,255,0.4)",
                      borderRadius: "9999px",
                      animation:
                        currentSong === index && isPlaying
                          ? "pulse 2s infinite"
                          : "none",
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#1a1a1a",
                      }}
                    >
                      {song.title}
                    </p>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "#333333",
                      }}
                    >
                      {song.artist}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Message */}
        <div
          style={{
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: "1.5rem",
            padding: "2.5rem",
            boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
            border: "2px solid rgba(167,139,250,0.5)",
            maxWidth: "48rem",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Star
            style={{
              color: "#f59e0b",
              animation: "pulse 2s infinite",
              margin: "0 auto",
              display: "block",
            }}
            size={40}
          />
          <h2
            style={{
              fontSize: "2.25rem",
              fontWeight: "bold",
              color: "#1a1a1a",
              marginBottom: "1.5rem",
              textAlign: "center",
              animation: "fade-in 1s ease-in-out",
            }}
          >
            🌟 You Are Loved 🌟
          </h2>
          <p
            style={{
              color: "#333333",
              fontSize: "1.25rem",
              marginBottom: "1.5rem",
              textAlign: "center",
              animation: "fade-in 1s ease-in-out 0.2s",
            }}
          >
            Your love touches everyone. Shine on your special day, my heart!
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => navigateTo("welcome")}
              style={{
                background: "linear-gradient(to right, #ec4899, #a78bfa)",
                color: "#fff",
                padding: "1rem 2.5rem",
                borderRadius: "9999px",
                fontWeight: "bold",
                boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
                transition: "all 0.3s",
                animation: "pulse 2s infinite",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.target.style.boxShadow = "0 20px 25px rgba(0,0,0,0.15)")
              }
              onMouseOut={(e) =>
                (e.target.style.boxShadow = "0 10px 15px rgba(0,0,0,0.1)")
              }
            >
              Home 🏠
            </button>
            <button
              onClick={() => navigateTo("memories")}
              style={{
                background: "linear-gradient(to right, #a78bfa, #4f46e5)",
                color: "#fff",
                padding: "1rem 2.5rem",
                borderRadius: "9999px",
                fontWeight: "bold",
                boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
                transition: "all 0.3s",
                animation: "pulse 2s infinite",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.target.style.boxShadow = "0 20px 25px rgba(0,0,0,0.15)")
              }
              onMouseOut={(e) =>
                (e.target.style.boxShadow = "0 10px 15px rgba(0,0,0,0.1)")
              }
            >
              Memories 💭
            </button>
          </div>
        </div>

        {/* Final Birthday Message */}
        <div
          style={{
            textAlign: "center",
            width: "100%",
            maxWidth: "48rem",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "linear-gradient(to right, #ec4899, #a78bfa)",
              color: "#fff",
              padding: "1.5rem 3rem",
              borderRadius: "9999px",
              fontSize: "1.875rem",
              fontWeight: "800",
              boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
              animation: "fade-in 1s ease-in-out",
            }}
          >
            🎂 Happy Birthday, My Queen! 🎂
          </div>
        </div>
      </div>

      {/* Floating Hearts */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: "20px",
            height: "20px",
            background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>') no-repeat center`,
            backgroundSize: "contain",
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            animation: `float 6s infinite ${i * 1.5}s`,
            opacity: "0.6",
          }}
        />
      ))}

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-20vh) rotate(180deg); opacity: 0.8; }
          100% { transform: translateY(-40vh) rotate(360deg); opacity: 0; }
        }
        @keyframes floatRomantic {
          0% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-30vh); opacity: 0.8; }
          100% { transform: translateY(-60vh); opacity: 0; }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
        @keyframes heartbeat {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes twinkle {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default WishesPage;
