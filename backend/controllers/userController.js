import User from "../models/User.js";

// Get the authenticated user's profile
export async function getUserProfile(req, res) {
  const userId = req.user.sub;

  try {
    const user = await User.findOne({ oauthId: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile data",
      user: {
        email: user.email,
        name: user.name,
        credits: user.credits,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

// Update the authenticated user's profile
export async function updateUserProfile(req, res) {
  const userId = req.user.sub;

  try {
    const user = await User.findOne({ oauthId: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name } = req.body;
    if (name) {
      user.name = name;
    }

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
}

// Get the authenticated user's reservations
export async function getUserReservations(req, res) {
  const userId = req.user.sub;

  try {
    const reservations = await Reservation.find({ userId }).populate('eventId'); // Populate with event details if necessary
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error });
  }
}

// Delete a reservation
export async function deleteReservation(req, res) {
  const { id } = req.params; // id of the reservation to delete

  try {
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    await Reservation.findByIdAndDelete(id);
    res.status(204).send(); // No content response
  } catch (error) {
    res.status(500).json({ message: "Error deleting reservation", error });
  }
}

// Get all users (admin only)
export async function getAllUsers(req, res) {
  try {
    const users = await User.find(); // Admin fetches all users
    res.status(200).json({ message: "All users", users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
}

// Update a user's role (admin only)
export async function updateUserRole(req, res) {
  const { userId, role } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: "User role updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user role", error });
  }
}
