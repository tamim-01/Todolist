import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import config from "../config/index.js";
import Loading from "./Loading"; // Use the same Loading component

const UnprotectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/api/user`, {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });

        if (response.ok) {
          setIsAuthenticated(true); // User is authenticated

          // Check if the current route is one of "/", "/signin", or "/signup"
          const unprotectedRoutes = ["/", "/signin", "/signup"];
          if (unprotectedRoutes.includes(location.pathname)) {
            navigate("/manager"); // Redirect to /manager
          }
        } else {
          setIsAuthenticated(false); // User is not authenticated
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false); // Assume user is not authenticated on error
      } finally {
        setIsLoading(false); // Set loading to false after the check
      }
    };

    checkAuth();
  }, [navigate, location.pathname]); // Add location.pathname to dependency array

  // Show a loading spinner or message while checking authentication
  if (isLoading) {
    return <Loading />; // Use the same Loading component
  }

  // Render the children if not authenticated or if the route is not one of the unprotected routes
  return !isAuthenticated ? children : null;
};

export default UnprotectedRoute;
