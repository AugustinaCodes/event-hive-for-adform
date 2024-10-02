import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { errMiddleware } from "./middleware/errorMiddleware.js";
import router from "./routes/index.js";
import passport from "passport";
import GitHubStrategy from "passport-github2";
import session from "express-session";
import User from "./models/User.js";
import MongoStore from "connect-mongo";

dotenv.config();

const { PORT, MONGO_URI, SESSION_SECRET } =
  process.env;

mongoose
  .connect(MONGO_URI, { dbName: "eventHive" })
  .then(() => console.log("Connected to MONGO DB"))
  .catch(() => console.log("Failed to connect to MONGO database"));

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Adjust to your client-side URL
  credentials: true, // Allow credentials to be sent
}));
app.use(express.json());

// Session setup
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: MONGO_URI,
    dbName: "eventHive", // Specify your database name if needed
    collectionName: "sessions", // Optionally specify a collection name
  }),
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
      scope: ['user:email'], // Request email scope
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the GitHub profile contains an id (githubId)
        if (!profile.id) {
          return done(new Error("GitHub profile ID is missing"), null);
        }

        // Retrieve or set fallback values for name
        const name = profile.displayName || profile.username || "Anonymous"; // Fallback for name
        
        // Get email from the profile; if it's null, fetch from GitHub API
        let email = profile.emails?.[0]?.value || null;

        if (!email) {
          email = await fetchGithubEmail(accessToken); // Fetch email if not present
        }

        // Check if the user already exists in your database
        let user = await User.findOne({ githubId: profile.id });

        if (user) {
          // User exists, return the existing user
          return done(null, user);
        } else {
          // If user doesn't exist, create a new user
          user = new User({
            githubId: profile.id,
            email: email, // May still be null if not found
            name: name,   // Provide a fallback name
          });

          await user.save(); // Save the new user to the database
          return done(null, user); // Pass the new user to Passport
        }
      } catch (error) {
        console.error("Error in GitHub Strategy:", error);
        return done(error, null); // Handle the error gracefully
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

app.use(router);



app.use(errMiddleware);

app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));
