const { pool } = require("../config/database");

const createMetric = async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);
    const {
      service,
      cpu,
      memory,
      disk,
      latency,
      errorRate,
      requestRate,
    } = req.body;

    if (
      !service ||
      cpu === undefined ||
      memory === undefined ||
      disk === undefined ||
      latency === undefined ||
      errorRate === undefined ||
      requestRate === undefined
    ) {
      return res.status(400).json({
        message: "All metric fields are required",
      });
    }

    const sql = `
      INSERT INTO system_metrics
      (service, cpu, memory, disk, latency, error_rate, request_rate)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
      service,
      cpu,
      memory,
      disk,
      latency,
      errorRate,
      requestRate,
    ]);

    res.status(201).json({
      message: "Metric stored successfully",
      metricId: result.insertId,
    });
  } catch (error) {
    console.error("Metric creation error:", error.message);

    res.status(500).json({
      message: "Failed to store metric",
      error: error.message,
    });
  }
};

const getMetrics = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT *
      FROM system_metrics
      ORDER BY timestamp DESC
      LIMIT 100
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Metric retrieval error:", error.message);

    res.status(500).json({
      message: "Failed to retrieve metrics",
      error: error.message,
    });
  }
};

module.exports = {
  createMetric,
  getMetrics,
};