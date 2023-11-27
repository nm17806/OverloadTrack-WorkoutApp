const express = require("express");
const router = express.Router();
const { getExercises, getExercise, createExercise, disableExercise } = require("../controllers/c-exercises");

// Get all
router.get("/", getExercises);

// Get One
router.get("/:exercise_id", getExercise);

// Post One
router.post("/", createExercise);

// Delete One
router.patch("/:exercise_id", disableExercise);

module.exports = router;
