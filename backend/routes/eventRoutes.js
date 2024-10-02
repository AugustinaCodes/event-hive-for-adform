import express from "express";
import { getAllEvents, getEventById, createEvent, updateEvent } from "../controllers/eventController.js"
import { ensureAuthenticated } from "../middleware/authMiddleware.js"

const router = express.Router();

// Get all events (public route)
router.get("/", getAllEvents);

// Get a specific event by ID (public route)
router.get("/:id", getEventById);

// Create a new event (admin route, ensureAuthenticated will ensure only admins can access)
router.post("/", createEvent);
router.put("/:id", updateEvent); 

export default router;