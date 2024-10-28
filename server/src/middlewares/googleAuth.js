import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "../configs/variables.js";
import {
  getUserByEmailService,
  createUserService,
  getUserByIdService,
} from "../services/User.js";
import { generateToken } from "../utils/JWT.js";

const randomPassword = () => {
  return Math.random().toString(36).slice(-8);
};
// Serialize user to save in the session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  const user = await getUserByIdService(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true, // Pass req object to the callback
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        let user = await getUserByEmailService(email);

        if (!user) {
          const password = randomPassword();
          user = await createUserService({ name, email, password });
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

export const verifyAndStoreCookie = async (req, res) => {
  try {
    const user = req.user;

    const tokenObject = { id: user._id, email: user.email, role: user.role };
    const token = await generateToken({ payload: tokenObject });

    // Use `req.res` to set the cookie directly
    req.res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    // console.log(req.cookies.token);

    res.redirect("/api");
  } catch (error) {
    console.error("Failed to authenticate user:", error);
    res.status(500).send("Internal Server Error");
  }
};
