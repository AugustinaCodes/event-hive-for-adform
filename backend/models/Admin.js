import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      enum: ["updateEvent", "deleteEvent", "createEvent", "other"],
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    timestamp: {
      type: Date,
      defualt: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin", adminSchema);
