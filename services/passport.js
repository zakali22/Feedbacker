const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Since we signup here
const mongoose = require("mongoose");

// Extract the users collection
const User = mongoose.model("users");
const keys = require("../config/keys");

// Serialize the User
passport.serializeUser((req, user, done) => {
  done(null, user._id); // The piece of identifying info to pass back
});

// Deserialize the User
passport.deserializeUser((req, id, done) => {
  User.findOne({ _id: id }).then(user => {
    // console.log(req);

    done(null, user); // This is the user returned once the user logins in again at a later time
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleId: profile.id });
      if (user) {
        // Don't create the user just pass it along to be serialised
        done(null, user);
      } else {
        // Create the user
        const user = await new User({ googleId: profile.id });
        user.save();
        done(null, user);
      }
    }
  )
);
