import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Snackbar } from "@mui/material";

interface User {
  email: string;
  name: string;
  credits: number;
  role: string; 
}

interface Reservation {
  _id: string;
  eventId: string; 
}

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<User | null>(null); 
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileResponse = await axios.get("/api/users/profile");
        setUserProfile(profileResponse.data.user);

        const reservationsResponse = await axios.get("/api/users/reservations");
        if (Array.isArray(reservationsResponse.data)) {
          setReservations(reservationsResponse.data);
        } else {
          console.error("Unexpected data format:", reservationsResponse.data);
          setError("Error fetching reservations.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Error fetching user profile.");
      }
    };

    fetchUserProfile();
  }, []);

  const handleDeleteReservation = async (reservationId: string) => {
    try {
      await axios.delete(`/api/users/reservations/${reservationId}`);
      // Remove the deleted reservation from state
      setReservations((prev) => prev.filter((res) => res._id !== reservationId));
      setSuccess("Reservation deleted successfully!");
    } catch (error) {
      console.error("Error deleting reservation:", error);
      setError("Error deleting reservation.");
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <div>
      <h1>User Profile</h1>
      {userProfile ? (
        <div>
          <p>Name: {userProfile.name}</p>
          <p>Email: {userProfile.email}</p>
          <p>Credits: {userProfile.credits}</p>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}

      <h2>Your Reservations</h2>
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation._id}>
              Reservation ID: {reservation._id}
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => handleDeleteReservation(reservation._id)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reservations found.</p>
      )}

      {error && <Snackbar open={!!error} onClose={handleCloseSnackbar} message={error} />}
      {success && <Snackbar open={!!success} onClose={handleCloseSnackbar} message={success} />}
    </div>
  );
}