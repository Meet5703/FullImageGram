import cloudinary from "cloudinary";
import {
  CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from "./variables.js";

// Configure Cloudinary and export the instance
cloudinary.v2.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const cloudinaryInstance = cloudinary.v2;
