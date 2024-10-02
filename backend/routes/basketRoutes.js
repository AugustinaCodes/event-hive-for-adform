import express from "express";
import {
  addToBasket,
  updateBasketItem,
  removeFromBasket,
  getBasket,
} from "../controllers/basketController.js";

const router = express.Router();

// Route to add an event to the basket
router.post("/", addToBasket);

// Route to update an event's quantity in the basket
router.put("/:eventId", updateBasketItem);

// Route to remove an event from the basket
router.delete("/:eventId", removeFromBasket);

// Route to fetch the user's basket
router.get("/", getBasket);

export default router;
