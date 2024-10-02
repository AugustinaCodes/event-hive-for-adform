import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Snackbar,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./BasketPage.module.scss";
import LoggedInNavigationBar from "../../components/LoggedInNavigationBar/LoggedInNavigationBar";

interface BasketItem {
  eventId: string;
  name: string;
  quantity: number;
  price: number;
}

interface User {
  credits: number;
  id: string;
  name: string;
}

export default function BasketPage() {
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBasketData = async () => {
      try {
        setLoading(true);

        const userResponse = await axios.get(
          "http://localhost:3000/api/users/profile",
          {
            withCredentials: true,
          }
        );
        console.log("User Response:", userResponse);
        const fetchedUser = userResponse.data.user;
        if (!fetchedUser || !fetchedUser.email) {
          setError("User not found or no ID available.");
          return;
        }
        setUser(fetchedUser);

        const basketResponse = await axios.get(
          "http://localhost:3000/api/basket",
          {
            params: {
              userId: fetchedUser._id, // Use _id from the user object
            },
            withCredentials: true,
          }
        );
          setBasket(basketResponse.data);
        } catch (error) {
        setError("Error fetching basket data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBasketData();
  }, []);

  const totalCost = basket.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const remainingBalance = (user?.credits ?? 0) - totalCost;

  const handleCheckout = () => {
    setOpenDialog(true);
  };

  const confirmCheckout = async () => {
    setOpenDialog(false);

    try {
      await axios.post(
        "http://localhost:3000/api/checkout",
        { basket },
        { withCredentials: true }
      );
      setSnackbarMessage("Checkout successful!");
      setBasket([]);
      navigate("/events");
    } catch (error) {
      setSnackbarMessage("Checkout failed. Please try again.");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarMessage(null);
  };

  return (
    <div className={styles.basketPage}>
      <LoggedInNavigationBar />
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          message={error}
          onClose={handleCloseSnackbar}
        />
      ) : (
        <div className={styles.basketContainer}>
          <Typography variant="h4" className={styles.title}>
            Your Basket
          </Typography>
          {basket.map((item) => (
            <Card key={item.eventId} className={styles.basketItem}>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="body2">
                  Price: {item.price} Credits
                </Typography>
                <Typography variant="body2">
                  Total: {item.quantity * item.price} Credits
                </Typography>
              </CardContent>
            </Card>
          ))}

          <div className={styles.summary}>
            <Typography variant="h6">
              Total Cost: {totalCost} Credits
            </Typography>
            <Typography variant="h6">
              Remaining Balance: {remainingBalance} Credits
            </Typography>
            {remainingBalance < 0 && (
              <Typography variant="body2" color="error">
                Warning: You do not have enough credits!
              </Typography>
            )}
          </div>

          <CardActions className={styles.actions}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              disabled={remainingBalance < 0 || basket.length === 0}
            >
              Checkout
            </Button>
          </CardActions>

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Confirm Checkout</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to proceed with the checkout? This action
                is irreversible.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button onClick={confirmCheckout} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={!!snackbarMessage}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
          />
        </div>
      )}
    </div>
  );
}
