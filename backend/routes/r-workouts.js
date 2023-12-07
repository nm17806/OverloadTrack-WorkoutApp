const express = require("express");
const router = express.Router();
const {
  getWorkoutsandExercises,
  getWorkouts,
  disableWorkout,
  addWorkout,
  addExercisesToWorkout,
  removeExerciseFromWorkout,
} = require("../controllers/c-workouts");

router.get("/exercises", getWorkoutsandExercises);

router.get("/", getWorkouts);

router.patch("/:template_id", disableWorkout);

router.patch("/exercises/:id", removeExerciseFromWorkout);

router.post("/", addWorkout);

router.post("/add-exercise", addExercisesToWorkout);

module.exports = router;
