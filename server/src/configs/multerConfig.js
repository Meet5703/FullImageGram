import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { cloudinaryInstance } from "./cloudinaryConfig.js";

// Correctly instantiate CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryInstance, // Make sure this is the cloudinary instance, not the config
  params: {
    folder: "ImageGram",
    allowedFormats: ["jpeg", "png", "jpg", "webp"],
  },
});

const upload = multer({ storage });

export default upload;
