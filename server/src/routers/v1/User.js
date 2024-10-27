import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  signIn,
  updateUserById,
} from "../../controllers/User.js";
import { authenticate } from "../../middlewares/authentication.js";

const router = express.Router();

router.post("/signup", createUser);

router.post("/login", signIn);

router.get("/", getAllUsers);

router.get("/:id", authenticate, getUserById);

router.put("/:id", authenticate, updateUserById);

router.delete("/:id", authenticate, deleteUserById);

export default router;
