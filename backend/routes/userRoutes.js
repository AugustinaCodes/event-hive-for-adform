import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  updateUserRole,
  getUserReservations,
  deleteReservation
} from "../controllers/userController.js";
import { ensureAuthenticated, ensureAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get the authenticated user's profile
router.get("/profile", getUserProfile);

// Update the authenticated user's profile
router.put("/profile", updateUserProfile);

// Get the authenticated user's reservations
router.get("/reservations", getUserReservations);

// Delete a reservation
router.delete("/reservations/:id", deleteReservation);

// Get all users (admin only)
router.get("/all", ensureAuthenticated, ensureAdmin, getAllUsers);

// Update a user's role (admin only)
router.put("/role", ensureAuthenticated, ensureAdmin, updateUserRole);

export default router;
