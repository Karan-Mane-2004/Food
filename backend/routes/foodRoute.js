import express from "express";
import multer from "multer";
import { storage } from "../config/cloudConfig.js";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";

const upload = multer({ storage });

const router = express.Router();

router.post("/add", upload.single("image"), addFood);
router.get("/list", listFood);
router.post("/remove", removeFood);

export default router;
