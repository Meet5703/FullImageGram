import express from "express";
import { connectDB } from "./configs/dbConfig.js";
import apiRouter from "./routers/apiRouter.js";
import cookieParser from "cookie-parser";
const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", apiRouter);
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
