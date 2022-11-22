import doctors from "../../api/doctor";

const state = {
  doctorsData: [],
  patientsData: [],
  singlePatientData: [],
  singleDeviceData: [],
  loading: false,
};

const getters = {
  loadingStatus(state) {
    return state.loading;
  },
  getPatients(state) {
    return state.doctorsData;
  },
  getAllPatientsOnly(state) {
    return state?.patientsData?.filter(
      (patient) => patient.role === "Customer"
    );
  },
  getSinglePatientData(state) {
    return state?.singlePatientData;
  },
  getSingleDeviceData(state) {
    console.log("state--", state);
    return state?.singleDeviceData;
  },
  getMacAddress(state) {
    return state?.singleDeviceData?.map((data) => {
      return data?.macAddressFramed;
    });
  },
};

const mutations = {
  SET_LOADING_STATUS(state, loadingStatus) {
    state.loading = loadingStatus;
  },
  SET_PATIENTS_FOR_DOCTOR(state, doctorsData) {
    state.doctorsData = doctorsData.map((data) => {
      return {
        id: data._id,
        firstName:
          data.customerfirstName?.charAt(0).toUpperCase() +
          data.customerfirstName?.slice(1),
        lastName:
          data.customerlastName?.charAt(0).toUpperCase() +
          data.customerlastName?.slice(1),
        fullName:
          data.customerfirstName?.charAt(0).toUpperCase() +
          data.customerfirstName?.slice(1) +
          " " +
          data.customerlastName?.charAt(0).toUpperCase() +
          data.customerlastName?.slice(1),
        doctorFirstName: data.doctorfirstName,
        doctorLastName: data.doctorlastName,
        macAddress: data.mac_address,
        macAddressFramed: data.mac_address_framed.toUpperCase(),
        name: data.name,
      };
    });
  },
  SET_ALL_PATIENT(state, patients) {
    state.patientsData = patients.map((patient) => {
      return {
        id: patient.userId,
        firstName: patient.first_Name,
        licenseNo: patient.licenseno,
        lastName: patient.last_Name,
        email: patient.email,
        address: patient.Address,
        aadharcard: patient.adharcard,
        gender: patient.gender,
        dob: patient.DOB,
        mobileNo: patient.mobile_no,
        gstNo: patient.GSTNO,
        roleId: patient.roleId,
        role: patient.role,
      };
    });
  },
  SET_SINGLE_PATIENT(state, patientData) {
    state.singlePatientData = patientData.map((patient) => {
      return {
        id: patient.userId,
        firstName: patient.first_Name,
        licenseNo: patient.licenseno,
        lastName: patient.last_Name,
        email: patient.email,
        address: patient.Address,
        aadharcard: patient.adharcard,
        gender: patient.gender,
        dob: patient.DOB,
        mobileNo: patient.mobile_no,
        gstNo: patient.GSTNO,
        roleId: patient.roleId,
        role: patient.role,
      };
    });
  },
  SET_SINGLE_DEVICE(state, deviceData) {
    state.singleDeviceData = deviceData.map((device) => {
      return {
        id: device._id,
        name: device.name,
        macAddress: device.mac_address,
        manufactureMonth: device.manufacture_month_year,
        macAddressFramed: device.mac_address_framed,
        doctorFirstName: device.doctorfirstName,
        doctorLastName: device.doctorlastName,
        customerFirstName: device.customerfirstName,
        customerLastName: device.customerlastName,
        adminId: device.adminId,
        doctorId: device.doctorId,
        customeId: device.customerId,
      };
    });
  },
};

const actions = {
  async getPatientsForDoctor({ commit }, id) {
    commit("SET_LOADING_STATUS", true);
    const res = await doctors.getAllDevicesOfDoctor(id);
    commit("SET_PATIENTS_FOR_DOCTOR", res.data.data);
    commit("SET_LOADING_STATUS", false);
  },
  async getAllPatientsData({ commit }, id) {
    commit("SET_LOADING_STATUS", true);
    const res = await doctors.getAllPatientsData(id);
    commit("SET_ALL_PATIENT", res.data.data);
    commit("SET_LOADING_STATUS", false);
  },
  async getSinglePatient({ commit }, id) {
    commit("SET_LOADING_STATUS", true);
    const res = await doctors.getSinglePatientData(id);
    commit("SET_SINGLE_PATIENT", res.data.data);
    commit("SET_LOADING_STATUS", false);
  },
  async getSingleDevice({ commit }, id) {
    commit("SET_LOADING_STATUS", true);
    const res = await doctors.getSingleDeviceData(id);
    commit("SET_SINGLE_DEVICE", res.data.data);
    commit("SET_LOADING_STATUS", false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
