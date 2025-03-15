import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/index.js";
import Loading from "./Loading.jsx";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/api/user`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          navigate("/signup");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        navigate("/signup");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
