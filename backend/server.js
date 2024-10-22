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

const { PORT, MONGO_URI, SESSION_SECRET } = process.env;

mongoose
  .connect(MONGO_URI, { dbName: "eventHive" })
  .then(() => console.log("Connected to MONGO DB"))
  .catch(() => console.log("Failed to connect to MONGO database"));

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      dbName: "eventHive",
      collectionName: "sessions",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile.id) {
          return done(new Error("GitHub profile ID is missing"), null);
        }

        const name = profile.displayName || profile.username || "Anonymous";

        let email = profile.emails?.[0]?.value || null;

        if (!email) {
          email = await fetchGithubEmail(accessToken);
        }

        let user = await User.findOne({ githubId: profile.id });

        if (user) {
          return done(null, user);
        } else {
          user = new User({
            githubId: profile.id,
            email: email,
            name: name,
          });

          await user.save();
          return done(null, user);
        }
      } catch (error) {
        console.error("Error in GitHub Strategy:", error);
        return done(error, null);
      }
    }
  )
);

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
