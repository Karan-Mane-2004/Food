import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food iten
export const addFood = async (req, res) => {
  // let image_filename = `${req.file.filename}`;
  let image_filename = req.file ? req.file.filename : null;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// all food list
export const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food item
export const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error" });
  }
};

export default { addFood, listFood, removeFood };
