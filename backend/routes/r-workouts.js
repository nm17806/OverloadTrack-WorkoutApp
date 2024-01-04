const express = require("express");
const router = express.Router();
const {
  getWorkoutsandExercises,
  getWorkouts,
  disableWorkout,
  addWorkout,
  addExercisesToWorkout,
  removeExerciseFromWorkout,
  getWorkout,
} = require("../controllers/c-workouts");
const authenticateToken = require("../middleware/requireAuth");

router.use(authenticateToken);

router.get("/exercises", getWorkoutsandExercises);

router.get("/", getWorkouts);

router.get("/:template_id", getWorkout);

router.patch("/:template_id", disableWorkout);

router.patch("/exercises/:id", removeExerciseFromWorkout);

router.post("/", addWorkout);

router.post("/add-exercise", addExercisesToWorkout);

module.exports = router;
