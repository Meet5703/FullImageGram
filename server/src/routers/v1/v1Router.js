import express from "express";
// import postRoutes from "./Post.js";
import userRoutes from "./User.js";
const app = express();

// app.use("/posts", postRoutes);
app.use("/users", userRoutes);

export default app;
