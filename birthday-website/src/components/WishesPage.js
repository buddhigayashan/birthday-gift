import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  Star,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Sparkles,
} from "lucide-react";
import Navigation from "./Navigation";

const WishesPage = ({ navigateTo }) => {
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showLoveMessage, setShowLoveMessage] = useState(false);
  const [showGames, setShowGames] = useState(false);
  const audioRef = useRef(null);

  const playlist = [
    {
      title: "Kiyannata Beri",
      artist: "Tharam Dushyanth Weeraman",
      file: "/kiyannata-beri-tharam-dushyanth-weeraman.mp3",
    },

    {
      title: "Sulagak Wela Oba Soya Enna One",
      artist: "Shihan Mihiranga",
      file: "/Sulagak-Wela-Oba-Soya-Enna-One-Shihan-Mihiranga-www.song.lk.mp3",
    },

    {
      title: "Mandaram Wahipoda",
      artist: "	Centigradz",
      file: "Pahasara_Obe_Adare_-_Mandaram_Wahipoda_Centigradz_Sarigama_lk.mp3",
    },

    {
      title: "Asa Gatena Dasa Dahasak",
      artist: "Shihan Mihiranga",
      file: "/Asa-Gatena-Dasa-Dahasak-Shihan-Mihiranga-.mp3",
    },

    {
      title: "Penena Thek Mane",
      artist: "Samith Sirimanna",
      file: "/penena-thek-mane-samith-sirimanna.mp3",
    },

    {
      title: "Dinaka-Mage-Divi-Gamane",
      artist: "Shihan Mihiranga",
      file: "/Dinaka-Mage-Divi-Gamane-Shihan-Mihiranga-www.song.lk.mp3",
    },
    {
      title: "Rosa_Kalpana ",
      artist: "Shehan_Galahitiyawa ",
      file: "/Rosa_Kalpana_Shehan_Galahitiyawa_Sarigama_lk.mp3",
    },

    {
      title: "Me-Es-Diha-Balan ",
      artist: "Shihan Mihiranga",
      file: "/Me-Es-Diha-Balan-Shihan-Mihiranga-www.song.lk.mp3",
    },

    {
      title: "dangakara-hadakari-obe-kammul ",
      artist: " BNS",
      file: "/ddangakara-hadakari-obe-kammul-sirasa-super-stars.mp3",
    },

    {
      title: "thumula-namunukula  ",
      artist: " saman-jayanath- ",
      file: "/thumula-namunukula-uma-saman-jayanath-jinadasa.mp3",
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

  const filteredPlaylist = playlist.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const games = [
    { name: "Ludo", link: "https://ludoking.com/" },
    { name: "Subway Surfers", link: "https://poki.com/en/g/subway-surfers" },
    { name: "Candy Crush Saga", link: "https://www.candycrushsaga.com/" },
    { name: "Dress Up Games", link: "https://www.y8.com/tags/dress_up" },
    {
      name: "Cooking Fever",
      link: "https://www.nordcurrent.com/games/cooking-fever",
    },
    { name: "Puzzle Adventure", link: "https://www.puzzle-adventure.com/" },
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
        <a
          key={idx}
          href={game.link}
          target="_blank"
          rel="noopener noreferrer"
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
            textDecoration: "none",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-5px) scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0 25px 50px rgba(255,107,157,0.6)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow =
              "0 15px 35px rgba(255,107,157,0.4)";
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
          💖 {game.name} 💖
        </a>
      ))}
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
              name: "Buddhi",
              message: `🎉Happy Birthday my Suddi ❤️

              You mean so much to me.💖
              
                I’m so lucky to have you in my life. 😘  Thank you for your love 💗 , your care 👩‍❤️‍💋‍👨, and for always being by my side 🥰 .
               💘I hope your day is full of happiness and smiles 🌹 . I will always be here for you 💞 . Love you so much. 🎂❤️`,
              color: "linear-gradient(135deg, #a18cd1, #fbc2eb, #fbc2eb)",
              icon: "💕",
            },
            {
              name: "Sanjula",
              message: `🎉💖 Happy Birthday to My Dearest Roomie & Soul Sister 💖🎉

From day one at uni, you’ve been more than just a roommate—you’ve been my best friend, my biggest supporter, my happy pill, and the sister I got to choose. Thank you for filling my life with laughter, late night talks, crazy memories, and unbreakable trust.

I’m so lucky to have you by my side, through all the highs and lows. Never change your heart, your energy, your kindness is truly one of a kind. You deserve every bit of happiness, love, and success this world has to offer.

Here’s to many more years of friendship, growth, and dancing through life together. Love you so much sudu! 💕💫

HAPPY BIRTHDAY, Mage CHUTAAAA 👑🎂❤😘 `,
              color: "linear-gradient(135deg, #ff9a9e, #fecfef, #fecfef)",
              icon: "❤️",
            },

            {
              name: "Nishadi",
              message: `Happy birthday Dew! 🧚‍♀️ May this birthday fills with happiness & blessings for u! Keep smiling as always!!!! ✨

Love from Nishadi. 🫶`,
              color: "linear-gradient(135deg, #ff9a9e, #fecfef, #fecfef)",
              icon: "❤️",
            },

            {
              name: "Chandeepa",
              message: `🎂 Happy Birthday! 🎂

Wishing you the happiest birthday and a year ahead filled with joy, success, and unforgettable moments! It’s always been great getting to know you — you’re such a kind, thoughtful, and genuinely amazing person. As the girlfriend of my best friend, you’ve naturally become a wonderful part of our circle, and I truly appreciate the positive energy you bring.

Hope today brings you all the love you deserve and that this year is your best one yet. Keep smiling and shining — and enjoy every second of your special day! ✨🎈💐`,
              color: "linear-gradient(135deg, #ff9a9e, #fecfef, #fecfef)",
              icon: "❤️",
            },
 {
              name: "Senumi",
              message: `🎉🎂❤️May your special day be filled with joy, laughter, and everything that makes you happy!!🎂`,
              color: "linear-gradient(135deg, #ff9a9e, #fecfef, #fecfef)",
              icon: "❤️",
            },


 {
              name: "Peshala",
              message:
                "You’re more than just a roommate🫂. Life’s so much better with you around  from the laughs to the late-night chats👻. I hope your birthday is filled with love, happiness, and everything you’ve been dreaming of💫. Happy Birthday nangaaa😘🎂",
              color: "linear-gradient(135deg, #a18cd1, #fbc2eb, #fbc2eb)",
              icon: "❤️",
            },



 
            {
              name: "Tharuka",
              message:
                "Happy Birthday, Dewmi! 🎉 Wishing you a day full of joy, laughter, and unforgettable moments. May this year bring you all the happiness and success you deserve! Have an amazing time celebrating! - From your friend, Tharuka 🎂",
              color: "linear-gradient(135deg, #ff9a9e, #fecfef, #fecfef)",
              icon: "❤️",
            },
           



            {
              name: "Ojitha",
              message: `Happy Birthday, Dewmi! 🎉
Hope your special day is filled with joy, laughter, and all your favorite things! Wishing you a wonderful year ahead.
Have an amazing celebration! 🎂✨
- Ojitha`,
              color: "linear-gradient(135deg, #ff9a9e, #fecfef, #fecfef)",
              icon: "❤️",
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
                "😍මන් ආසයි ඔයා ඔයාගේම ජීවිතේ දිනනවා දකින්න.. මන් ආසයි ඔයා
                ජීවිතේට එන හැම බාදකයකටම මුහුන දීලා ඒවා එකින් එක ජය ගන්නවා
                දකින්න.❤‍🩹 මතක තියාගන්න , ඔයා ඉදිරියට යන හැම පියවරක් ගානෙම
                මම,මට පුලුවන් විදියට ඔයා එක්ක ඉන්නවා🫣 ඉතින් , මන් ආසයි ඔයා
                දිනනවා දකින්න .❤‍🩹🫂"
              </p>
            </div>
          )}
        </div>

        {/* Passionate Playgrounds Button */}
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
            onClick={() => setShowGames(!showGames)}
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
              marginBottom: showGames ? "2rem" : "0",
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
            🎮 {showGames ? "Hide" : "Passionate Playgrounds"} 🎮
          </button>

          {/* Enhanced Games Section */}
          {showGames && (
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
                animation: "fadeInUp 0.5s ease-out",
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
                  Let's play together, my love... every game is sweeter with
                  you! 💖
                </p>
              </div>
              <GameSelector />
            </div>
          )}
        </div>

        {/* Your Lovely Playlist Button */}
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
            onClick={() => setShowPlaylist(!showPlaylist)}
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
              marginBottom: showPlaylist ? "2rem" : "0",
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
            🎶 {showPlaylist ? "Hide" : "Your Lovely Playlist"} 🎶
          </button>

          {/* Enhanced Music Section */}
          {showPlaylist && (
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
                animation: "fadeInUp 0.5s ease-out",
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

              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search songs or artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "25px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.1)",
                  color: "#1a1a1a",
                  fontSize: "1rem",
                  marginBottom: "2rem",
                  outline: "none",
                  transition: "all 0.3s",
                }}
                onFocus={(e) => {
                  e.target.style.border = "2px solid #f472b6";
                  e.target.style.boxShadow = "0 0 10px rgba(244,114,182,0.5)";
                }}
                onBlur={(e) => {
                  e.target.style.border = "2px solid rgba(255,255,255,0.3)";
                  e.target.style.boxShadow = "none";
                }}
              />

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
                      display: "flex",
                      alignItems: "center",
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
                    e.target.style.boxShadow =
                      "0 15px 35px rgba(79,70,229,0.6)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow =
                      "0 10px 25px rgba(79,70,229,0.4)";
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
                {filteredPlaylist.length > 0 ? (
                  filteredPlaylist.map((song, index) => (
                    <div
                      key={index}
                      onClick={() => selectSong(playlist.indexOf(song))}
                      style={{
                        cursor: "pointer",
                        padding: "1rem",
                        borderRadius: "0.75rem",
                        transition: "all 0.3s",
                        background:
                          currentSong === playlist.indexOf(song)
                            ? "linear-gradient(to right, rgba(236,72,153,0.3), rgba(168,85,247,0.3))"
                            : "rgba(255,255,255,0.1)",
                        border:
                          currentSong === playlist.indexOf(song)
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
                              currentSong === playlist.indexOf(song) &&
                              isPlaying
                                ? "#f472b6"
                                : "rgba(255,255,255,0.4)",
                            borderRadius: "9999px",
                            animation:
                              currentSong === playlist.indexOf(song) &&
                              isPlaying
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
                  ))
                ) : (
                  <p
                    style={{
                      color: "#1a1a1a",
                      fontSize: "1rem",
                      textAlign: "center",
                    }}
                  >
                    No songs found.
                  </p>
                )}
              </div>
            </div>
          )}
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
