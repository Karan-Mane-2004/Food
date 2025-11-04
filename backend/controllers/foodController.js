import cloudinary from "../config/cloudConfig.js";
import FoodModel from "../models/foodModel.js";

export const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!req.file)
      return res.json({ success: false, message: "Image required" });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "fooddel",
    });

    const newFood = await FoodModel.create({
      name,
      description,
      price,
      category,
      image: result.secure_url,
      public_id: result.public_id,
    });

    res.json({
      success: true,
      message: "Food added successfully",
      data: newFood,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const listFood = async (req, res) => {
  const foods = await FoodModel.find();
  res.json({ success: true, data: foods });
};

export const removeFood = async (req, res) => {
  try {
    const foodId = req.body.id;

    if (!foodId) {
      return res
        .status(400)
        .json({ success: false, message: "Food ID is required" });
    }

    const deletedFood = await FoodModel.findByIdAndDelete(foodId);

    if (!deletedFood) {
      return res.json({ success: false, message: "Food not found" });
    }

    res.json({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    console.log("Delete error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
