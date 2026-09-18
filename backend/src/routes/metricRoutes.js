const express = require("express");

const {
  createMetric,
  getMetrics,
} = require("../controllers/metricController");

const router = express.Router();

router.post("/", createMetric);
router.get("/", getMetrics);

module.exports = router;