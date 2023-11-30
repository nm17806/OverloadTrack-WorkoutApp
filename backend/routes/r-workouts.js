const express = require("express");
const router = express.Router();
const { getWorkouts, getWorkout, disableWorkout, addWorkout } = require("../controllers/c-workouts");

router.get("/", getWorkouts);

router.get("/:template_id", getWorkout);

router.patch("/:template_id", disableWorkout);

router.post("/", addWorkout);

module.exports = router;
