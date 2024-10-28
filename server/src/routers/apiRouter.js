import express from "express";
import v1Router from "./v1/v1Router.js";
import passport from "passport";
const app = express();

app.use("/v1", v1Router);
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/", (req, res) => {
  res.send(`<h1>API</h1><br/><p>Hello ${req.user.name}</p>`);
});

export default app;
