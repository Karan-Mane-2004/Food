import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // Cloudinary URL
    public_id: { type: String, required: true }, // Cloudinary ID
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.food || mongoose.model("food", foodSchema);
