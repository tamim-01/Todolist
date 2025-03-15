import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <header className="bg-gray-800 shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex flex-row items-center">
            <img src="./logo.svg" alt="Task Manager Logo" className="h-12" />
            <p className="font-bold text-xl ml-2 text-green-400">
              Task Manager
            </p>
          </div>
          <nav className="hidden md:flex flex-row space-x-4">
            <button
              onClick={() => navigate("/signup")}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition duration-300"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="bg-gray-800 text-green-400 px-6 py-2 rounded-full border border-green-400 hover:bg-gray-700 transition duration-300"
            >
              Sign In
            </button>
          </nav>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-green-400 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <button
              onClick={() => {
                navigate("/signup");
                toggleMenu();
              }}
              className="block w-full text-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-300"
            >
              Sign Up
            </button>
            <button
              onClick={() => {
                navigate("/signin");
                toggleMenu();
              }}
              className="block w-full text-center bg-gray-800 text-green-400 px-4 py-2 rounded-full border border-green-400 hover:bg-gray-700 transition duration-300"
            >
              Sign In
            </button>
          </div>
        )}
      </header>

      <main className="flex-grow container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-extrabold text-green-400 mb-6">
          Welcome to TaskManager
        </h1>
        <p className="text-xl text-green-300 mb-8 max-w-2xl mx-auto">
          Boost your productivity and organize your life with ease.
        </p>
        <div className="mb-8 text-left flex flex-row justify-start items-center  max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="inline-block  ml-2 w-6 h-6 border-2 border-green-400 rounded-md transition-all duration-200 ease-in-out transform hover:scale-110 hover:bg-green-400 hover:border-transparent"></div>
          <div className="inline-block mx-2  ">
            <TypeAnimation
              sequence={[
                "Buy groceries",
                1000,
                "Call mom",
                1000,
                "Finish project",
                1000,
                "Go to gym",
                1000,
                "Walk the dog",
                1000,
                "Prepare presentation",
                500,
                "Schedule dentist appointment",
                500,
              ]}
              wrapper="div"
              cursor={true}
              repeat={Infinity}
              style={{
                fontSize: "1.5em",
                display: "inline-block",
                color: "#4ade80",
              }}
            />
          </div>
        </div>
        <button
          onClick={() => navigate("/signup")}
          className="bg-green-500 text-white px-8 py-3 rounded-full text-xl font-semibold my-4 hover:bg-green-600 transition duration-300 shadow-lg"
        >
          Get Started
        </button>
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-green-400 mb-2">
              Organize Tasks
            </h3>
            <p className="text-gray-300">
              Efficiently manage and prioritize your daily tasks.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-green-400 mb-2">
              Track Progress
            </h3>
            <p className="text-gray-300">
              Monitor your progress and celebrate your achievements.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-green-400 mb-2">
              Clear Your Mind
            </h3>
            <p className="text-gray-300">
              With managing your tasks have a clear mind and open to good ideas.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-green-400 py-8">
        <div className="container mx-auto text-center">
          <p>© 2024 TaskManager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
