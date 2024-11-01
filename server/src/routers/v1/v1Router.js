import express from "express";
// import postRoutes from "./Post.js";
import userRoutes from "./User.js";
import postRoutes from "./Post.js";
const app = express();

// app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

export default app;
