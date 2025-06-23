import React, { useEffect, useRef } from "react";
import { Lock, Heart, Sparkles } from "lucide-react";

const LoginPage = ({ loginData, setLoginData, handleLogin }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Particle effect initialization
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.density = Math.random() * 30 + 1;
        this.color = `hsl(${Math.random() * 30 + 330}, 70%, 60%)`;
        this.directionX = Math.random() * 2 - 1;
        this.directionY = Math.random() * 2 - 1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    // Create particles
    const particles = [];
    for (let i = 0; i < Math.floor(canvas.width / 10); i++) {
      particles.push(new Particle());
    }

    // Animation loop
    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Interactive particle background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
      />

      {/* Floating holographic elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/10 filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-pink-600/10 filter blur-3xl animate-pulse delay-300"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <div className="w-full max-w-md">
          {/* Glass morphism card with floating effect */}
          <div className="relative group transform transition-all duration-500 hover:-translate-y-1">
            {/* Holographic border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 rounded-3xl blur opacity-70 group-hover:opacity-100 transition duration-500 animate-border-pulse"></div>

            {/* Main card */}
            <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 overflow-hidden">
              {/* Subtle grid pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-grid-white/10"></div>
              </div>

              {/* Header */}
              <div className="text-center mb-8 relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-pink-500/30">
                    <Lock className="text-white" size={32} />
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400 mb-3 tracking-tight">
                  Your Birthday Portal
                </h1>
                <p className="text-pink-300/90 font-medium">
                  Enter our secret code, my love
                </p>
              </div>

              {/* Form */}
              <div className="space-y-6 relative z-10">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={loginData.name}
                    onChange={(e) =>
                      setLoginData({ ...loginData, name: e.target.value })
                    }
                    className="w-full px-5 py-3.5 bg-gray-700/50 border border-gray-600/50 rounded-2xl placeholder-pink-300/70 text-pink-100 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition duration-300 shadow-lg backdrop-blur-sm"
                  />
                  <Sparkles
                    className="absolute right-4 top-3.5 text-pink-400/80"
                    size={18}
                  />
                </div>

                <div className="relative">
                  <input
                    type="password"
                    placeholder="Our special code"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    className="w-full px-5 py-3.5 bg-gray-700/50 border border-gray-600/50 rounded-2xl placeholder-pink-300/70 text-pink-100 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition duration-300 shadow-lg backdrop-blur-sm"
                  />
                  <Heart
                    className="absolute right-4 top-3.5 text-pink-400/80"
                    size={18}
                    fill="#ec4899"
                  />
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full py-4 px-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:shadow-pink-500/20 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden group"
                >
                  <span className="relative z-10">Unlock Your Surprise</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="relative z-10"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center relative z-10">
                <p className="text-pink-400/60 text-sm font-medium">
                  Made with ♥ for you
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-pink-900/70 to-purple-900/70 backdrop-blur-lg text-white p-3 text-center z-20 border-t border-white/10">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-medium text-pink-200/80">
            Created by Buddhi - Full-Stack Developer from Sri Lanka 🇱🇰
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-1 text-[0.7rem]">
            <a
              href="https://linkedin.com/in/buddhi-jayawickrama-a82007366"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-300 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="tel:+94717071306"
              className="hover:text-pink-300 transition-colors"
            >
              0717071306
            </a>
            <a
              href="mailto:buddhigjayawickrama@gmail.com"
              className="hover:text-pink-300 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes border-pulse {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }

        .bg-grid-white/10 {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }

        body {
          overflow-x: hidden;
          background-color: #0f172a;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
