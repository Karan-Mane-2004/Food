// cloudConfig.js
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: "foodDel",
  api_key: 631625578227829,
  api_secret: "xMRnCWL9HIbjz69nP7sE8p86FR4",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "foodDel", // folder name in Cloudinary
    allowed_formats: ["png", "jpg", "jpeg"],
  },
});

export { cloudinary, storage };
