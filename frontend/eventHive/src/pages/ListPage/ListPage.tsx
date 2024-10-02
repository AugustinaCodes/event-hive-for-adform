import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import LoggedInNavigationBar from "../../components/LoggedInNavigationBar/LoggedInNavigationBar";
import styles from "./ListPage.module.scss";

interface Event {
  _id: string;
  name: string;
  description: string;
  totalSeats: number;
  remainingSeats: number;
  price: number;
  startDate: string;
  endDate: string;
}

interface User {
  _id: string;
  role: string;
  credits?: number;
}

export default function ListPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<{
    [key: string]: number;
  }>({});
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/users/all",
          {
            withCredentials: true,
          }
        );
        if (
          response.data &&
          response.data.users &&
          response.data.users.length > 0
        ) {
          setUser(response.data.users[0]);
        } else {
          setUser(null);
        }
      } catch (error) {
        setError("Error fetching user data. Please try again later.");
      }
    };

    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/events", {
          withCredentials: true,
        });
        setEvents(response.data);
      } catch (error) {
        setError("Error fetching events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchEvents();
  }, []);

  const handleAddToBasket = (eventId: string) => {
    const quantity = selectedQuantity[eventId] || 1;
    setSnackbarMessage(`Added ${quantity} ticket(s) for event to the basket.`);
  };

  const handleQuantityChange = (eventId: string, value: number) => {
    setSelectedQuantity((prevState) => ({
      ...prevState,
      [eventId]: value,
    }));
  };

  const handleEditEvent = (eventId: string) => {
    navigate(`/events/edit/${eventId}`);
  };

  const handleCloseSnackbar = () => {
    setSnackbarMessage(null);
  };

  return (
    <div className={styles.listPage}>
      <LoggedInNavigationBar />
      <Typography variant="h2" className={styles.eventListTitle}>
        Event List
      </Typography>
      {loading && <CircularProgress />}
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={error}
        />
      )}
      {snackbarMessage && (
        <Snackbar
          open={!!snackbarMessage}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      )}
      <div className={styles.cardContainer}>
        {!loading &&
          !error &&
          events.map((event) => (
            <Card key={event._id} className={styles.eventCard}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {event.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {event.description}
                </Typography>
                <Typography variant="body2">
                  Total Seats: {event.totalSeats}
                </Typography>
                <Typography variant="body2">
                  Remaining Seats: {event.remainingSeats}
                </Typography>
                <Typography variant="body2">
                  Price: {event.price} Credits
                </Typography>
                <Typography variant="body2">
                  Date: {new Date(event.startDate).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions className={styles.cardActions}>
                {user?.role === "admin" && (
                  <IconButton onClick={() => handleEditEvent(event._id)}>
                    <EditIcon />
                  </IconButton>
                )}
                {event.remainingSeats > 0 &&
                (user?.credits ?? 0) >= event.price ? (
                  <div className={styles.addToBasket}>
                    <TextField
                      type="number"
                      value={selectedQuantity[event._id] || 1}
                      onChange={(e) =>
                        handleQuantityChange(
                          event._id,
                          parseInt(e.target.value, 10)
                        )
                      }
                      inputProps={{
                        min: 1,
                        max: event.remainingSeats,
                      }}
                      style={{ width: "60px", marginRight: "10px" }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddToBasket(event._id)}
                      disabled={
                        selectedQuantity[event._id] > event.remainingSeats ||
                        selectedQuantity[event._id] * event.price >
                          (user?.credits ?? 0)
                      }
                    >
                      Add to Basket
                    </Button>
                  </div>
                ) : (
                  <Button disabled>Sold Out / Not Enough Credits</Button>
                )}
              </CardActions>
            </Card>
          ))}
      </div>
    </div>
  );
}
