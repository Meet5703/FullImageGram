import { create } from "zustand";
import { axiosInstance } from "./axiosInstence";
import { toast } from "react-hot-toast";

export const usePosts = create((set) => ({
  post: {
    title: "",
    img: "",
    username: "",
  },
  createPost: async (post) => {
    try {
      const response = await axiosInstance.post("/api/v1/posts", post);
      set({ post: { title: "", img: "", username: "" } });
      console.log("Post created successfully:", response.data);
      toast.success("Post created successfully");
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  },
}));
