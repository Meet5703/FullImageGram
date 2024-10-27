import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/variables.js";

export const generateToken = ({ payload }) => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  return token;
};

export const verifyToken = (token) => {
  const payload = jwt.verify(token, JWT_SECRET);
  return payload;
};
