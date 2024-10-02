import mongoose from "mongoose";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config(); // For loading environment variables like DB URL

const { MONGO_URI_ADMIN } =
  process.env;

  const addAdmin = async () => {
    try {
      // Connect to MongoDB
      await mongoose.connect(MONGO_URI_ADMIN);
      console.log("Connected to the database");
  
      // Find your user by email and update role to admin
      const email = "baugustina@gmail.com";
      const user = await User.findOneAndUpdate(
        { email: email }, // Search only by email
        { role: "admin" }, // Update role to admin
        { new: true, upsert: true } // Create if doesn't exist
      );
  
      if (user) {
        console.log(`User ${user.email} is now an admin.`);
      } else {
        console.log("User not found.");
      }
  
      mongoose.connection.close();
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };
  

addAdmin();
