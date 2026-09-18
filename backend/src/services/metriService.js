const {
  createMetric: insertMetric,
  getMetrics: findMetrics,
} = require("../repositories/metricRepository");

const createMetric = async (metric) => {
  const metricId = await insertMetric(metric);

  return metricId;
};

const getMetrics = async () => {
  const metrics = await findMetrics();

  return metrics;
};

module.exports = {
  createMetric,
  getMetrics,
};