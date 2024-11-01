import {
  createPostService,
  deletePostByIdService,
  getAllPostsService,
  getPostByIdService,
  updatePostByIdService,
} from "../services/Post.js";

export const createPost = (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file.path;
    const postObject = { title, image };
    createPostService(postObject);
    return res
      .status(200)
      .json({ message: "Post created successfully", data: postObject });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const posts = await getAllPostsService(limit, offset);
    return res.status(200).json({ data: posts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await getPostByIdService(id);
    return res.status(200).json({ data: post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const postObject = req.body;
    postObject.image = req.file.path;
    const post = await updatePostByIdService({ id, postObject });
    return res
      .status(200)
      .json({ data: postObject, message: "Post updated", post: post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await deletePostByIdService(id);
    return res.status(200).json({ data: post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
