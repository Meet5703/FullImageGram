import express from "express";
import { connectDB } from "./configs/dbConfig.js";
import apiRouter from "./routers/apiRouter.js";
// import swaggerSpec from "./utils/swaggerOptions.js";
// import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import { SESSION_SECRET } from "./configs/variables.js";
import "./middlewares/googleAuth.js";
import { generateToken } from "./utils/JWT.js";
import { verifyAndStoreCookie } from "./middlewares/googleAuth.js";

const app = express();
connectDB();

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
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  verifyAndStoreCookie
);
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
