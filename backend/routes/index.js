import express from "express";
import passport from "passport";
import eventRoutes from "./eventRoutes.js";
import userRoutes from "./userRoutes.js";
import basketRoutes from "./basketRoutes.js"
import reservationRoutes from "./reservationRoutes.js"
// import { ensureAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }), 
  (req, res) => {
    res.redirect('http://localhost:5173/listpage');
  }
);

// Route to log out
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

  
  // Example protected route
//   router.get('/profile', ensureAuthenticated, (req, res) => {
//     res.json({ user: req.user });
//   });

  router.use("/api/events", eventRoutes);
  // Add the user routes
router.use("/api/users", userRoutes);

// Add the reservation routes
router.use("/api/reservations", reservationRoutes);

router.use("/api/basket", basketRoutes);


export default router;