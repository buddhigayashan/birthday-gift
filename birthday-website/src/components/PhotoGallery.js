import React from "react";
import { Camera } from "lucide-react";
import Navigation from "./Navigation";

// Import your photos
import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import photo4 from "../assets/photo4.jpg";
import photo5 from "../assets/photo5.jpg";
import photo6 from "../assets/photo6.jpg";

const PhotoGallery = ({ navigateTo }) => {
  // Photo data with imported images
  const photos = [
    {
      id: 1,
      src: photo1,
      caption: "The day you gifted me a red rose — love in full bloom",
    },
    { id: 2, src: photo2, caption: "The golden glow of our perfect sunset" },
    {
      id: 3,
      src: photo3,
      caption: "Our first stroll through the mall—hand in hand",
    },
    {
      id: 4,
      src: photo4,
      caption: "A soft white rose — your purest gesture of love",
    },
    { id: 5, src: photo5, caption: "Our magical first adventure together" },
    {
      id: 6,
      src: photo6,
      caption: "Valentine’s Day — twinning in red, hearts entwined",
    },
  ];

  return (
    <div className="w-screen confetti-bg pt-20 pb-20 min-h-[calc(100vh-8rem)]">
      <Navigation navigateTo={navigateTo} />
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h1 className="text-3xl sm:text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 sm:mb-12 animate-fade-in">
            📸 Our Love in Pictures 📸
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white/20 backdrop-blur-xl rounded-3xl p-3 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-purple-300/50 hover:scale-105"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-2 sm:mb-4 shadow-lg">
                  <img
                    src={photo.src}
                    alt={`Memory ${photo.id}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div
                    className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-300 rounded-2xl flex items-center justify-center"
                    style={{ display: "none" }}
                  >
                    <Camera className="text-gray-600" size={32} />
                    <span className="ml-1 sm:ml-2 text-gray-700 font-semibold text-sm sm:text-lg">
                      Photo {photo.id}
                    </span>
                  </div>
                </div>
                <p className="text-center text-gray-800 font-semibold text-sm sm:text-lg animate-fade-in">
                  {photo.caption}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:mt-12 bg-white/20 backdrop-blur-xl rounded-3xl p-4 sm:p-10 shadow-2xl border-2 border-purple-300/50 max-w-4xl mx-auto">
            <p className="text-gray-600 text-sm sm:text-xl italic animate-fade-in">
              Every photo with you is a treasure. These memories are priceless!
              💝
            </p>
            <button
              onClick={() => navigateTo("letter")}
              className="mt-4 sm:mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-rose-100 px-6 sm:px-12 py-2 sm:py-5 rounded-full text-base sm:text-2xl font-bold hover:shadow-xl transition-all duration-300 animate-pulse hover:scale-105"
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
};

export default PhotoGallery;
