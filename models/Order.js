import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    orderItems: [
      {
        name: String,
        qty: Number,
        price: Number
      }
    ],
    totalPrice: Number,
    isPaid: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
