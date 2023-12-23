const express = require("express");
const router = express.Router();
const { getSessions, getSession, postSessionRecord, postSessionSets } = require("../controllers/c-sessions");

// Get all
router.get("/", getSessions);

router.get("/:record_id", getSession);

router.post("/record", postSessionRecord);

router.post("/", postSessionSets);

module.exports = router;
