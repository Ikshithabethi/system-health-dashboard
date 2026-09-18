const {
  createIncident: insertIncident,
  getIncidents: findIncidents,
  updateIncidentStatus: changeIncidentStatus,
} = require("../repositories/incidentRepository");

const updateIncidentStatus = async (id, status) => {
  const affectedRows = await changeIncidentStatus(id, status);

  return affectedRows;
};
const createIncident = async (incident) => {
  const incidentId = await insertIncident(incident);

  return {
    id: incidentId,
    ...incident,
  };
};

const getIncidents = async () => {
  const incidents = await findIncidents();

  return incidents;
};

module.exports = {
  createIncident,
  getIncidents,
};