import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    githubId: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: false, // Email is not required
      unique: true,
      trim: true,
      lowercase: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    credits: {
      type: Number,
      default: 500,
    },
    role: {
      type: String,
      enum: ["visitor", "admin"],
      default: "visitor",
    },
    reservations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
