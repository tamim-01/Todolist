import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import config from "../config";
const ProfileNav = ({
  profileImage = "/avatars/def.png",
  editeProfile,
  username,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`relative ${
        isMobile ? "flex flex-col items-end" : "flex flex-col items-center"
      }`}
    >
      {/* Profile Image */}
      <div
        className="w-12 h-12 rounded-full overflow-hidden cursor-pointer z-10"
        onClick={toggleNav}
      >
        <img
          src={profileImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className={`mt-2 text-sm text-green-400 shadow-md px-1 rounded-lg ${
          isMobile ? "text-right" : "text-center"
        }`}
      >
        {username}
      </div>

      {/* Navigation Menu */}
      <nav
        className={`${
          isMobile
            ? "absolute top-full mt-2 right-0"
            : "absolute right-0 mr-4 mt-2"
        }
          bg-gray-800 shadow-md transition-all duration-300 ease-in-out
          ${
            isMobile
              ? "flex flex-col rounded-md"
              : "flex items-center rounded-l-full"
          }
          ${
            isOpen
              ? isMobile
                ? "max-h-40 opacity-100 p-3"
                : `${editeProfile ? "w-64" : "w-32"} opacity-100 pl-3`
              : isMobile
              ? "max-h-0 opacity-0 p-0"
              : "w-0 opacity-0 pl-0"
          }
        `}
      >
        <ul
          className={`${isMobile ? "flex flex-col space-y-2" : "flex space-x-4"}
          whitespace-nowrap overflow-hidden
        `}
        >
          <li
            onClick={async () => {
              try {
                // Call the logout endpoint
                const response = await fetch(
                  `${config.apiBaseUrl}/api/logout`,
                  {
                    method: "POST",
                    credentials: "include",
                  }
                );

                if (response.ok) {
                  // Redirect to the sign-in page
                  navigate("/signin");
                  setIsOpen(false);
                } else {
                  console.error("Logout failed");
                }
              } catch (error) {
                console.error("Error during logout:", error);
              }
            }}
            className="cursor-pointer py-1 text-red-500 hover:text-green-500"
          >
            Log Out
          </li>
          {editeProfile && (
            <li
              onClick={() => {
                navigate("/profile");
                setIsOpen(false);
              }}
              className="cursor-pointer py-1 text-green-400 hover:text-green-500"
            >
              Edit Profile
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default ProfileNav;
