import Event from "../models/Event.js";

// Controller to get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events
    res.json(events); // Return events as JSON
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

// Controller to get a single event by ID
export const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error });
  }
};

// Controller to create a new event (admin only)
export const createEvent = async (req, res) => {
  const { name, description, totalSeats, price, startDate, endDate, location } =
    req.body;

  try {
    const newEvent = new Event({
      name,
      description,
      totalSeats,
      remainingSeats: totalSeats, // remainingSeats should start equal to totalSeats
      price,
      startDate,
      endDate,
      location,
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

// Controller to update an existing event (admin only)
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true, // This ensures that Mongoose validation is applied
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Error updating event", error });
  }
};
