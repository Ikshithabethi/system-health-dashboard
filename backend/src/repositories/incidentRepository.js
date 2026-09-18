const { pool } = require("../config/database");

const createIncident = async (incident) => {
  const sql = `
    INSERT INTO incidents
    (
      service,
      title,
      description,
      severity
    )
    VALUES (?, ?, ?, ?)
  `;

  const [result] = await pool.execute(sql, [
    incident.service,
    incident.title,
    incident.description,
    incident.severity,
  ]);

  return result.insertId;
};
const updateIncidentStatus = async (id, status) => {
  const sql = `
    UPDATE incidents
    SET
      status = ?,
      resolved_at = CASE
        WHEN ? = 'RESOLVED' THEN CURRENT_TIMESTAMP
        ELSE NULL
      END
    WHERE id = ?
  `;

  const [result] = await pool.execute(sql, [
    status,
    status,
    id,
  ]);

  return result.affectedRows;
};
const getIncidents = async () => {
  const sql = `
    SELECT *
    FROM incidents
    ORDER BY created_at DESC
    LIMIT 100
  `;

  const [rows] = await pool.execute(sql);

  return rows;
};

module.exports = {
  createIncident,
  getIncidents,
};