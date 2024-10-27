import mongoose from "mongoose";
import { DB_URI } from "./variables.js";

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB connection is already established.");
    return;
  }
  try {
    const conn = await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB connection lost. Attempting to reconnect...");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB successfully reconnected.");
    });

    mongoose.connection.on("error", (error) => {
      console.log(`MongoDB connection error: ${error.message}`);
    });
  } catch (error) {
    console.log(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};
