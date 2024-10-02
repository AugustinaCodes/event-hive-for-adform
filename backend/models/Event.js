import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    totalSeats: {
      type: Number,
      required: true,
      min: 1,
    },
    remainingSeats: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: function (value) {
          return value <= this.totalSeats;
        },
        message: "Remaining seats cannot exceed total seats.",
      },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value >= this.startDate;
        },
        message: "End date must be after or equal to the start date",
      },
    },
    location: {
      city: {
        type: String,
        required: true,
      },
      venue: {
        type: String,
        trim: true,
      },
      address: {
        type: String,
        trim: true,
      },
    },
    bookings: [
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

export default mongoose.model("Event", eventSchema);
