import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Snackbar } from "@mui/material";
import styles from './EditPage.module.scss';

// src/types/Event.ts

export interface Event {
  _id: string; // Add this property for the ID of the event
  name: string;
  description: string;
  totalSeats: number;
  remainingSeats: number;
  price: number;
  startDate: string; // Consider using Date type if you want to handle date objects directly
  endDate: string; // Same as above
  location: {
    city: string;
    venue?: string; // Optional
    address?: string; // Optional
  };
}

export default function EditPage() {
  const [eventData, setEventData] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>(); // Get event ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/events/${id}`);
        setEventData(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
        setError("Error fetching event. Please try again.");
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventData((prev) => ({
      ...prev!,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    if (eventData) {
        const updatedData = {
            ...eventData,
            startDate: new Date(eventData.startDate),
            endDate: new Date(eventData.endDate),
        };

        try {
            await axios.put(`http://localhost:3000/api/events/${id}`, updatedData);
            setSuccess("Event updated successfully!");
            setTimeout(() => navigate("/listpage"), 2000);
        } catch (error) {
            console.error("Error updating event:", error);
            setError("Error updating event. Please try again.");
        }
    }
};

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <div className={styles.editPage}>
      <h1>Edit Event</h1>
      {error && <Snackbar open={!!error} onClose={handleCloseSnackbar} message={error} />}
      {success && <Snackbar open={!!success} onClose={handleCloseSnackbar} message={success} />}
      
      {eventData && (
        <div className={styles.formContainer}>
          <TextField
            label="Event Name"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Total Seats"
            name="totalSeats"
            type="number"
            value={eventData.totalSeats}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Remaining Seats"
            name="remainingSeats"
            type="number"
            value={eventData.remainingSeats}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={eventData.price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            value={eventData.startDate.split("T")[0]} // Format date
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            value={eventData.endDate.split("T")[0]} // Format date
            onChange={handleChange}
            fullWidth
          />
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update Event
          </Button>
        </div>
      )}
    </div>
  );
}