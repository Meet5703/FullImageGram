import { useState, useEffect } from "react";
import { BASE_URL } from "../Contexts/axiosInstence";
import { useNavigate, useLocation } from "react-router-dom";

// Separate function to check login status from URL
export const checkStatusSuccess = (location, setIsLoggedIn, navigate) => {
  const params = new URLSearchParams(location.search);
  const success = params.get("success");

  if (success === "true") {
    setIsLoggedIn(true);
    navigate("/");
  }
};

export const useGoogleLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSignin = () => {
    window.open(`${BASE_URL}/auth/google`, "_self");
  };

  useEffect(() => {
    checkStatusSuccess(location, setIsLoggedIn, navigate);
  }, [location, navigate]);

  return { isLoggedIn, handleGoogleSignin };
};

export const LoginUser = async (userData, signIn) => {
  try {
    await signIn(userData);
    window.location.href = "/?success=true"; // Redirect on success
  } catch (error) {
    console.log("Login failed:", error);
    throw error; // Re-throw error for handling in the calling component
  }
};
