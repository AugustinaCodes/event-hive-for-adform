import Reservation from "../models/Reservation.js";
import Event from "../models/Event.js";

// Create a new reservation for an event
export const createReservation = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user.sub;

  try {
    const event = await Event.findById(eventId);

    if (!event || event.remainingSeats <= 0) {
      return res.status(400).json({ message: "Event is full or not found" });
    }

    const reservation = new Reservation({
      user: userId,
      event: eventId,
    });

    await reservation.save();

    // Decrease remaining seats in the event
    event.remainingSeats -= 1;
    await event.save();

    res
      .status(201)
      .json({ message: "Reservation created successfully", reservation });
  } catch (error) {
    res.status(500).json({ message: "Error creating reservation", error });
  }
};

// Get all reservations of the authenticated user
export const getUserReservations = async (req, res) => {
  const userId = req.user.sub;

  try {
    const reservations = await Reservation.find({ user: userId }).populate(
      "event"
    );
    res.status(200).json({ message: "User reservations", reservations });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error });
  }
};

// Get all reservations (admin only)
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("user event");
    res.status(200).json({ message: "All reservations", reservations });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error });
  }
};
