import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import WelcomePage from "./components/WelcomePage";
import MemoriesPage from "./components/MemoriesPage";
import PhotoGallery from "./components/PhotoGallery";
import LoveLetter from "./components/LoveLetter";
import SurprisePage from "./components/SurprisePage";
import WishesPage from "./components/WishesPage";
import Navigation from "./components/Navigation"; // Corrected import path
import "./App.css";

const App = () => {
  const [loginData, setLoginData] = useState({ name: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleLogin = () => {
    if (
      loginData.name &&
      (loginData.password === "iloveyou" ||
        loginData.password === "suddi")
    ) {
      setIsLoggedIn(true);
      setCurrentPage("welcome");
    } else {
      alert('Wrong password! Hint: Use "iloveyou" or "birthday2024" ❤️');
    }
  };

  const navigateTo = (page) => {
    if (isLoggedIn) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="App">
      {currentPage === "login" && (
        <LoginPage
          loginData={loginData}
          setLoginData={setLoginData}
          handleLogin={handleLogin}
        />
      )}
      {currentPage === "welcome" && isLoggedIn && (
        <WelcomePage loginData={loginData} navigateTo={navigateTo} />
      )}
      {currentPage === "memories" && isLoggedIn && (
        <MemoriesPage navigateTo={navigateTo} />
      )}
      {currentPage === "gallery" && isLoggedIn && (
        <PhotoGallery navigateTo={navigateTo} />
      )}
      {currentPage === "letter" && isLoggedIn && (
        <LoveLetter loginData={loginData} navigateTo={navigateTo} />
      )}
      {currentPage === "surprise" && isLoggedIn && (
        <SurprisePage navigateTo={navigateTo} />
      )}
      {currentPage === "wishes" && isLoggedIn && (
        <WishesPage navigateTo={navigateTo} />
      )}
    </div>
  );
};

export default App;
