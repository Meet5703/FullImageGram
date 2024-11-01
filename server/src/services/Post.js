import {
  createPostRepo,
  deleteImgFromCloud,
  deletePostByIdRepo,
  getAllPostsRepo,
  getPostByIdRepo,
  updatePostByIdRepo,
} from "../repository/Post.js";

export const createPostService = async (postObject) => {
  const post = await createPostRepo(postObject);
  return post;
};

export const getAllPostsService = async (limit, offset) => {
  const posts = await getAllPostsRepo(limit, offset);
  return posts;
};

export const getPostByIdService = async (id) => {
  const post = await getPostByIdRepo(id);
  return post;
};

export const updatePostByIdService = async ({ id, postObject }) => {
  const post = await updatePostByIdRepo({ id, postObject });
  return post;
};

export const deletePostByIdService = async (id) => {
  const post = await deletePostByIdRepo(id);
  return post;
};
