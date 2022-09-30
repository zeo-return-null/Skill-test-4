import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { uniqueID } from "../../utils/uniqueID.js";
import {
  avatarRegex,
  dateRegex,
  phoneRegex,
  emailRegex,
} from "../../utils/regex.js";
import bcrypt from "bcrypt";
import User from "../../models/User.js";

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  const user = await User.getOneUser(id);
  done(null, user);
});

passport.use(
  "local-register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const {
          name,
          surname,
          avatar,
          birthdate,
          pronouns,
          nationality,
          residence,
          phone,
          description,
          actualJob,
          status,
          language_id,
          country_id,
          state_id,
          city_id,
          organization_id,
        } = req.body;

        if (!name || !surname) {
          return done(null, false, {
            message: "Name and surname are required fields",
          });
        }

        if (!email || !password) {
          return done(null, false, {
            message: "mail and password are required fields",
          });
        }

        // if (!phoneRegex.test(phone)) {
        //   return done(null, false, {
        //     message: "Please enter a valid phone number",
        //   });
        // }

        // if (!dateRegex.test(birthdate)) {
        //   return done(null, false, {
        //     message: "Please enter a valid birthdate",
        //   });
        // }

        if (!emailRegex.test(email)) {
          return done(null, false, {
            message: "Please enter a valid email",
          });
        }

        if (!avatarRegex.test(avatar)) {
          return done(null, false, {
            message: "Looks like this avatar is invalid",
          });
        }

        const user = await User.getOneUser(email);

        if (user) {
          return done(null, false, {
            message:
              "Email already exist in the database, did you forgot your password?",
          });
        }

        const newUser = {
          name,
          surname,
          avatar,
          birthdate,
          pronouns,
          nationality,
          residence,
          phone,
          description,
          actualJob,
          status,
          language_id,
          country_id,
          state_id,
          city_id,
          organization_id,
        };

        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, salt);

        newUser.id = uniqueID();
        newUser.password = hashedPassword;
        const createdNewUser = await User.createUser(newUser);

        done(null, createdNewUser);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        if (!email || !password) {
          return done(null, false, { message: "Email and password required" });
        }

        if (!emailRegex.test(email)) {
          return done(null, false, { message: "Invalid mail" });
        }

        const user = await User.getOneUser(email);

        if (!user) {
          return done(null, false, { message: "This user doesnt exist" });
        }

        const passwordChecker = await bcrypt.compare(password, user.password);

        if (!passwordChecker) {
          return done(null, false, { message: "Invalid password" });
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
