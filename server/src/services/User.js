import {
  createUserRepo,
  deleteUserByIdRepo,
  getAllUsersRepo,
  getUserByEmailRepo,
  getUserByIdRepo,
  updateUserByIdRepo,
} from "../repository/User.js";
import { generateToken } from "../utils/JWT.js";
import bcrypt from "bcrypt";
export const signInService = async ({ email, password }, res) => {
  const user = await getUserByEmailRepo(email);
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const tokenObject = { id: user._id, email: user.email, role: user.role };
  const token = await generateToken({ payload: tokenObject });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  return { token, user };
};
export const createUserService = async (user) => {
  const existingUser = await getUserByEmailRepo(user.email);
  if (existingUser) {
    throw new Error("User already exists");
  }
  const userData = await createUserRepo(user);
  return userData;
};

export const getUserByIdService = async (id) => {
  const user = await getUserByIdRepo(id);
  return user;
};

export const getAllUsersService = async (limit, offset) => {
  const users = await getAllUsersRepo(limit, offset);
  return users;
};

export const updateUserByIdService = async ({ id, userObject }) => {
  const user = await updateUserByIdRepo({ id, userObject });
  return user;
};

export const deleteUserByIdService = async (id) => {
  const user = await deleteUserByIdRepo(id);
  return user;
};
