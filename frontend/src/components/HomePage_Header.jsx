import React, { useState, useEffect } from "react";

import ProfileNav from "./ProfileNav";
import { useNavigate } from "react-router-dom";
import config from "../config";

const Header = () => {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/api/user`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const userData = await response.json();

          setUserdata(userData);
          console.log(">>> ~ fetchUserData ~ userData:", userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <header className="flex justify-between items-center pt-4 pb-4 px-12 text-lg border-b-2 border-gray-700">
      <div
        onClick={() => {
          navigate("/");
        }}
        className="flex flex-row items-center cursor-pointer"
      >
        <img src="/logo.svg" alt="Logo" className="h-12" />
        <p className="font-bold text-xl ml-2 text-green-400">Task Manager</p>
      </div>
      <ProfileNav
        username={userdata.username}
        editeProfile={true}
        profileImage={userdata.avatar_src || "/avatars/def.png"}
      />
    </header>
  );
};

export default Header;
