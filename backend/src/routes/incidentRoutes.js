const express = require("express");

const {
  createIncident,
  getIncidents,
  updateIncidentStatus,
} = require("../controllers/incidentController");

const router = express.Router();

router.post("/", createIncident);
router.get("/", getIncidents);
router.patch("/:id/status", updateIncidentStatus);

module.exports = router;