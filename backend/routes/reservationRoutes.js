import express from "express";
import {
  createReservation,
  getUserReservations,
  getAllReservations,
} from "../controllers/reservationController.js";
import { ensureAuthenticated, ensureAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new reservation
router.post("/", ensureAuthenticated, createReservation);

// Get all reservations of the authenticated user
router.get("/my-reservations", ensureAuthenticated, getUserReservations);

// Get all reservations (admin only)
router.get("/all", ensureAuthenticated, ensureAdmin, getAllReservations);

export default router;
