import { create } from "zustand";
import { axiosInstance } from "./axiosInstence";
import { toast } from "react-hot-toast";

// Function to check if token cookie exists
// const checkUserStats = () => {
//   return document.cookie
//     .split("; ")
//     .some((cookie) => cookie.startsWith("token="));
// };

const useAuth = create((set) => ({
  isLoggedIn: false,
  user: {
    name: "",
    email: "",
    password: "",
  },
  setUser: (user) => set({ user }),

  signUp: async (userData) => {
    try {
      console.log(userData);

      const response = await axiosInstance.post(
        "/api/v1/users/signup",
        userData
      );
      console.log(response.data);

      set({ user: response.data.user });
      toast.success("Signup successful!");

      return { user: response.data.user };
    } catch (error) {
      console.log(error.response);

      if (error.response.status === 401) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Signup failed. Please try again.");
      }
      throw error;
    }
  },

  signIn: async (userData) => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/users/login",
        userData
      );
      console.log(response.data);

      set({ user: response.data.user, isLoggedIn: true });
      toast.success("Login successful!");
      return { user: response.data.user, isLoggedIn: true };
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
      throw error;
    }
  },

  logOut: () => {
    // e.preventDefault();
    // Clear the token cookie by setting Max-Age to 0
    document.cookie = "token=; Max-Age=0";
    console.log(document.cookie);

    set({ user: { name: "", email: "", password: "" }, isLoggedIn: false });
    toast.success("Logged out successfully.");
  },
}));

export default useAuth;
