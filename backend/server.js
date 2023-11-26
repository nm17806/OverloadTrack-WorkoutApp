require("dotenv").config();
const express = require("express");
const app = express();

// require Routes

const exerciseRoutes = require("./routes/r-exercises");
const workoutRoutes = require("./routes/r-workouts");
const sessionRoutes = require("./routes/r-sessions");

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  // cl the route and request type - e.g /api/exercises/ GET
  console.log(req.path, req.method);
  // Middleware will stop once it gets a success, unless you use next()
  next();
});

// Routes
app.use("/api/exercises", exerciseRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/sessions", sessionRoutes);

// Connect to db
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
