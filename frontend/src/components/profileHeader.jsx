import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileNav from "./ProfileNav";
import config from "../config";
export default function ProfileHeader() {
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
    <header className="flex justify-between items-center pt-4 pb-4 px-12 text-lg mb-32 border-b-2 border-gray-700">
      <div
        onClick={() => {
          navigate("/");
        }}
        className="flex flex-row items-center cursor-pointer"
      >
        <img src="/logo.svg" className="h-12" alt="Task Manager Logo" />
        <p className="font-bold text-xl ml-2 text-green-400">Task Manager</p>
      </div>
      <ProfileNav
        profileImage={userdata.avatar_src}
        username={userdata.username}
      />
    </header>
  );
}
