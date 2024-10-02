import Basket from "../models/Basket.js";
import Event from "../models/Event.js";

// Add item to basket
export const addToBasket = async (req, res) => {
  const { userId, eventId, quantity } = req.body;

  try {
    // Find the event in the database
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Calculate the price for the tickets
    const price = event.price * quantity;

    // Find the user's basket or create a new one
    let basket = await Basket.findOne({ user: userId });
    if (!basket) {
      basket = new Basket({
        user: userId,
        items: [{ eventId, quantity, price }],
        totalCost: price,
      });
    } else {
      // Check if the event is already in the basket
      const existingItem = basket.items.find(
        (item) => item.eventId.toString() === eventId
      );

      if (existingItem) {
        // Update the quantity and price if the item is already in the basket
        existingItem.quantity += quantity;
        existingItem.price = event.price * existingItem.quantity;
      } else {
        // Add the new item to the basket
        basket.items.push({ eventId, quantity, price });
      }

      // Recalculate the total cost
      basket.totalCost = basket.items.reduce(
        (total, item) => total + item.price,
        0
      );
    }

    // Save the updated basket
    await basket.save();
    return res.status(200).json(basket);
  } catch (error) {
    console.error("Error adding to basket:", error);
    return res.status(500).json({ message: "Error adding to basket" });
  }
};

// Update item in basket
export const updateBasketItem = async (req, res) => {
  const { userId, quantity } = req.body;
  const { eventId } = req.params;

  try {
    const basket = await Basket.findOne({ user: userId });
    if (!basket) {
      return res.status(404).json({ message: "Basket not found" });
    }

    const item = basket.items.find((i) => i.eventId.toString() === eventId);
    if (!item) {
      return res.status(404).json({ message: "Event not found in basket" });
    }

    // Update quantity and price
    const event = await Event.findById(eventId);
    item.quantity = quantity;
    item.price = event.price * quantity;

    basket.totalCost = basket.items.reduce(
      (total, item) => total + item.price,
      0
    );

    await basket.save();
    return res.status(200).json(basket);
  } catch (error) {
    console.error("Error updating basket:", error);
    return res.status(500).json({ message: "Error updating basket item" });
  }
};

// Remove item from basket
export const removeFromBasket = async (req, res) => {
  const { userId } = req.body;
  const { eventId } = req.params;

  try {
    const basket = await Basket.findOne({ user: userId });
    if (!basket) {
      return res.status(404).json({ message: "Basket not found" });
    }

    basket.items = basket.items.filter(
      (item) => item.eventId.toString() !== eventId
    );
    basket.totalCost = basket.items.reduce(
      (total, item) => total + item.price,
      0
    );

    await basket.save();
    return res.status(200).json(basket);
  } catch (error) {
    console.error("Error removing item from basket:", error);
    return res.status(500).json({ message: "Error removing item from basket" });
  }
};

// Fetch user's basket
export const getBasket = async (req, res) => {


  try {
    const { userId } = req.query;
    const basket = await Basket.findOne({ user: userId })
    if (!basket) {
      return res.status(404).json({ message: "Basket not found" });
    }

    return res.status(200).json(basket);
  } catch (error) {
    console.error("Error fetching basket:", error);
    return res.status(500).json({ message: "Error fetching basket" });
  }
};
