import client from "./index";

export default {
  getPatientAlgoData: (params) =>
    client.post(
      `devices/getalgodata?speedometerId=${params.speedometerId}&startDate=${params.startDate}&endDate=${params.endDate}`
    ),
  getStepGraph: (params) =>
    client.post(
      `devices/getstepdata?speedometerId=${params.speedometerId}&agrFunction=${params.agrFunction}&timePeriod=${params.timePeriod}&startDate=${params.startDate}&endDate=${params.endDate}`
    ),
  getBloodOxygenGraph: (params) =>
    client.post(
      `devices/getspo2data?speedometerId=${params.speedometerId}&agrFunction=${params.agrFunction}&timePeriod=${params.timePeriod}&startDate=${params.startDate}&endDate=${params.endDate}`
    ),
  getBodyTempGraph: (params) =>
    client.post(
      `devices/gettempdata?speedometerId=${params.speedometerId}&agrFunction=${params.agrFunction}&timePeriod=${params.timePeriod}&startDate=${params.startDate}&endDate=${params.endDate}`
    ),
};