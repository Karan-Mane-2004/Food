import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware (always before routes)
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// static files
app.use("/images", express.static("uploads"));

// api routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);

app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// app.get("/", (req, res) => {
//   res.send("working well");
// });

// app listen
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
