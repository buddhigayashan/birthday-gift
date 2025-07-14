import React from "react";
import { Heart } from "lucide-react";

const Navigation = ({ navigateTo }) => (
  <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white p-4 shadow-2xl z-50 backdrop-blur-md">
    <div className="flex justify-center items-center flex-col sm:flex-row sm:justify-between max-w-6xl mx-auto px-4">
      <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2 text-rose-100 animate-pulse">
        <Heart className="text-red-400" size={24} />
        Happy Birthday, My Love!
      </h1>
      <div className="flex gap-4 mt-4 sm:mt-0 flex-wrap justify-center">
        {["welcome" , "wishes", "letter", "memories" , "surprise","gallery" ].map(
          (page) => (
            <button
              key={page}
              onClick={() => navigateTo(page)}
              className="text-base sm:text-xl text-rose-100 font-semibold hover:text-white transition-all duration-300 hover:scale-110"
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          )
        )}
      </div>
    </div>
  </nav>
);

export default Navigation;
