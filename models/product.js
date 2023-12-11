<<<<<<< HEAD
import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalOrders: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const Product = models?.Product || model("Product", ProductSchema);
=======
const { Schema, models, model, default: mongoose } = require("mongoose");

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

export const Product =
  models?.Product || mongoose.model("Product", productSchema);
>>>>>>> 5943200 (webstore product added)
