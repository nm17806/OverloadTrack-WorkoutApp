const express = require("express");
const router = express.Router();
const { getSessions, getSession } = require("../controllers/c-sessions");

// Get all
router.get("/", getSessions);

router.get("/:record_id", getSession);

module.exports = router;
