import express from "express";
import { connectDB } from "./configs/dbConfig.js";
import apiRouter from "./routers/apiRouter.js";
// import swaggerSpec from "./utils/swaggerOptions.js";
// import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import { PORT, SESSION_SECRET } from "./configs/variables.js";
import "./middlewares/googleAuth.js";
import { generateToken } from "./utils/JWT.js";
import { verifyAndStoreCookie } from "./middlewares/googleAuth.js";
import cors from "cors";

const app = express();
connectDB();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", apiRouter);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send(`<a href="/api/auth/google">Sign in with Google</a>`);
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173" }),

  verifyAndStoreCookie
);
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
