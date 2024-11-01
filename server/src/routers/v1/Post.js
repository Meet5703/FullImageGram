import express from "express";
import {
  createPost,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePostById,
} from "../../controllers/Post.js";
import upload from "../../configs/multerConfig.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts managing API
 */

/**
 * @swagger
 * /api/v1/posts/create:
 *   post:
 *     tags: [Posts]
 *     summary: Create a new post
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: The image file to upload
 *       - in: body
 *         name: post
 *         description: The post to create
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             content:
 *               type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.post("/create", upload.single("image"), createPost);
/**
 * @swagger
 * /api/v1/posts:
 *   get:
 *     tags: [Posts]
 *     summary: Get all posts
 *     responses:
 *       200:
 *         description: A list of posts
 */
router.get("/", getAllPosts);
/**
 * @swagger
 * /api/v1/posts/{id}:
 *   get:
 *     tags: [Posts]
 *     summary: Get a post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The post
 *       404:
 *         description: Post not found
 */
router.get("/:id", getPostById);
/**
 * @swagger
 * /api/v1/posts/{id}:
 *   put:
 *     tags: [Posts]
 *     summary: Update a post by ID
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The post ID
 *         schema:
 *           type: string
 *       - in: formData
 *         name: image
 *         type: file
 *         description: The new image file to upload
 *       - in: body
 *         name: post
 *         description: The post data to update
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             content:
 *               type: string
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Post not found
 */

router.put("/:id", upload.single("image"), updatePostById);
/**
 * @swagger
 * /api/v1/posts/{id}:
 *   delete:
 *     tags: [Posts]
 *     summary: Delete a post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Post not found
 */
router.delete("/:id", deletePostById);

export default router;
