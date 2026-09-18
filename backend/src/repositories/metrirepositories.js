const { pool } = require("../config/database");

const createMetric = async (metric) => {
  const sql = `
    INSERT INTO system_metrics
    (
      service,
      cpu,
      memory,
      disk,
      latency,
      error_rate,
      request_rate
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await pool.execute(sql, [
    metric.service,
    metric.cpu,
    metric.memory,
    metric.disk,
    metric.latency,
    metric.errorRate,
    metric.requestRate,
  ]);

  return result.insertId;
};

const getMetrics = async () => {
  const sql = `
    SELECT *
    FROM system_metrics
    ORDER BY timestamp DESC
    LIMIT 100
  `;

  const [rows] = await pool.execute(sql);

  return rows;
};

module.exports = {
  createMetric,
  getMetrics,
};