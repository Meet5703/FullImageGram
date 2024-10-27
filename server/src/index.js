import express from "express";
import { connectDB } from "./configs/dbConfig.js";

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
