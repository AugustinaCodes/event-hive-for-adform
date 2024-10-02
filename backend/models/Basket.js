import mongoose from "mongoose";

const basketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        eventId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        }
      },
    ],
    totalCost: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Basket", basketSchema);
