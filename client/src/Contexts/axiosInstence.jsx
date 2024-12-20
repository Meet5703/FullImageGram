import axios from "axios";
export const BASE_URL = "https://fullimagegram.onrender.com";

// export const BASE_URL = "https://fullimagegram.onrender.com";
export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
