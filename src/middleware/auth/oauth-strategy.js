import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_REDIRECT,
} from "../../config.js";
import User from "./../../models/User.js";
import { uniqueID } from "../../utils/uniqueID.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.getOneUser(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CLIENT_REDIRECT,
      scope: ["email", "profile"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.getOneUser(profile.id);

        if (user) return done(null, user);

        const newUser = {
          name: profile.name.givenName,
          surname: profile.name.familyName,
          email: profile.email[0].value,
          avatar: profile.photos[0].value,
          google_d: profile.id,
        };

        newUser.id = uniqueID();

        const createdUserFromGoogle = await User.createUser(newUser);

        done(null, createdUserFromGoogle);
      } catch (error) {
        console.log(error);
        done(error, null);
      }
    }
  )
);
