const express = require("express");
const router = express.Router();
const {
  getWorkoutsandExercises,
  getWorkouts,
  disableWorkout,
  addWorkout,
  addExercisesToWorkout,
} = require("../controllers/c-workouts");

router.get("/exercises", getWorkoutsandExercises);

router.get("/", getWorkouts);

router.patch("/:template_id", disableWorkout);

router.post("/", addWorkout);

router.post("/add-exercise", addExercisesToWorkout);

module.exports = router;
