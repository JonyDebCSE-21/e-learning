import mongoose, { Schema, models } from "mongoose";

const orderSchema = new Schema(
  {
    line_items: Object,
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    paid: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Order = models?.Order || mongoose.model("Order", orderSchema);
