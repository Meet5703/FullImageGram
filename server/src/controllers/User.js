import User from "../models/User.js";
import { getAllUsersService, signInService } from "../services/User.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const validPassword = password.length >= 6;
    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const validateEmail = email.match(/^\S+@\S+$/);
    if (!validateEmail) {
      return res
        .status(401)
        .json({ message: "Email must be a valid email address" });
    }
    const user = await User.create({ name, email, password });
    return res
      .status(201)
      .json({ message: "User created successfully", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await signInService({ email, password }, res);
    return res
      .status(200)
      .json({ message: "User signed in successfully", data: userData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const user = await getAllUsersService(limit, offset);
    return res
      .status(200)
      .json({ message: "Users fetched successfully", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res
      .status(200)
      .json({ message: "User fetched successfully", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userObject = req.body;
    const user = await User.findByIdAndUpdate(id, userObject, { new: true });
    return res
      .status(200)
      .json({ message: "User updated successfully", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "User deleted successfully", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
