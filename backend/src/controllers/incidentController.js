const {

  createIncident: saveIncident,

  getIncidents: fetchIncidents,

  updateIncidentStatus: changeIncidentStatus,

} = require("../services/incidentService");
const createIncident = async (req, res) => {
  try {
    const {
      service,
      title,
      description,
      severity,
    } = req.body;

    if (!service || !title || !severity) {
      return res.status(400).json({
        message: "Service, title, and severity are required",
      });
    }
    const incident = await saveIncident({

      service,

      title,

      description,

      severity,

    });

    // Temporary response for testing the controller
    res.status(201).json({
      message: "Incident data received",
      incident: {
        service,
        title,
        description,
        severity,
      },
    });
  } catch (error) {
    console.error("Incident creation error:", error.message);

    res.status(500).json({
      message: "Failed to create incident",
    });
  }
};
const updateIncidentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "OPEN",
      "INVESTIGATING",
      "RESOLVED",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid incident status",
      });
    }

    const affectedRows = await changeIncidentStatus(id, status);

    if (affectedRows === 0) {
      return res.status(404).json({
        message: "Incident not found",
      });
    }

    res.status(200).json({
      message: "Incident status updated successfully",
    });
  } catch (error) {
    console.error("Incident status update error:", error.message);

    res.status(500).json({
      message: "Failed to update incident status",
    });
  }
};

const getIncidents = async (req, res) => {

  try {

    const incidents = await fetchIncidents();

    res.status(200).json(incidents);

  } catch (error) {

    console.error("Incident retrieval error:", error.message);

    res.status(500).json({

      message: "Failed to retrieve incidents",

    });

  }

};

module.exports = {
  createIncident,
  getIncidents,
};