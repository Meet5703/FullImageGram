import { cloudinaryInstance } from "../configs/cloudinaryConfig.js";
import Post from "../models/post.js";
import cloudinary from "cloudinary";
export const createPostRepo = async ({ title, image, user }) => {
  const post = await Post.create({ title, image, user });
  return post;
};

export const getAllPostsRepo = async (limit, offset) => {
  const totalPosts = await Post.countDocuments();
  const totalPagesCalc = Math.ceil(totalPosts / Number(limit));
  const posts = await Post.find().skip(Number(offset)).limit(Number(limit));

  return { totalPages: totalPagesCalc, posts };
};

export const getPostByIdRepo = async (id) => {
  const post = await Post.findById(id);
  return post;
};

export const updatePostByIdRepo = async ({ id, postObject }) => {
  try {
    if (postObject.image) {
      await deleteImgFromCloud(id);
    }
    const post = await Post.findByIdAndUpdate(id, postObject, { new: true });
    if (!post) {
      throw new Error("Post update failed");
    }
    return post;
  } catch (error) {
    console.error("Error in updating post:", error.message);
    throw error;
  }
};

export const deletePostByIdRepo = async (id) => {
  await deleteImgFromCloud(id);
  const post = await Post.findByIdAndDelete(id);
  return post;
};

export const deleteImgFromCloud = async (id) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new Error("Post not found");
  }
  const imageUrl = post.image;
  const pathParts = imageUrl.split("/");
  const versionIndex = pathParts.findIndex((part) => part.startsWith("v"));
  const publicId = pathParts
    .slice(versionIndex + 1)
    .join("/")
    .split(".")[0];
  await cloudinary.uploader.destroy(publicId, {
    invalidate: true,
  });
  return post;
};
