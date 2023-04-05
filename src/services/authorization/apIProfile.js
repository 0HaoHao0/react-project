import axios from "axios";
export const updatePassword = async (password, userInfo) => {
  let data;
  await axios({
    method: "post",
    url: "/api/User/UpdatePassword",
    data: {
      userId: userInfo.id,
      oldPassword: password.oldPassword,
      newPassword: password.newPassword,
    },
  })
    .then((response) => {
      data = response;
    })
    .catch((error) => {
      // handle error
      console.log(error);
      data = error.response;
    });

  return data;
};

export const updateProfile = async (userData) => {

  let data;
  await axios({
    method: "put",
    url: "/api/User/Update",
    data: {
      userId: userData.id,
      ...userData
    },
  })
    .then((response) => {
      data = response;
    })
    .catch((error) => {
      // handle error
      console.log(error);
      data = error.response;
    });

  return data;

}

export const updateMedicalRecord = async (formData) => {

  let data;
  await axios({
    method: "post",
    url: "/api/Patient/UpdateMedicalRecord",
    data: formData,
    headers: {
      'content-type': 'multipart/form-data'
    },
  })
    .then((response) => {
      data = response;
    })
    .catch((error) => {
      // handle error
      console.log(error);
      data = error.response;
    });

  return data;

}

export const updateCertificate = async (formData) => {

  let data;
  await axios({
    method: "put",
    url: "/api/Doctor/Update",
    data: formData,
    headers: {
      'content-type': 'multipart/form-data'
    },
  })
    .then((response) => {
      data = response;
    })
    .catch((error) => {
      // handle error
      console.log(error);
      data = error.response;
    });

  return data;

}

export const getAllAppointment = async (filter) => {
  let data;
  await axios({
    method: 'get',
    url: '/api/Appointment/GetAll',
    params: {
      PatientId: filter.id,
      State: filter.state,
      Page: -1,
    }
  }).then((response) => {
    data = response;
  }).catch((error) => {
    // handle error
    data = error.response;
  })

  return data;
}

export const getPatientById = async (id) => {
  let data;
  await axios({
    method: 'get',
    url: '/api/Patient/GetPatientById',
    params: {
      id: id
    }
  }).then((response) => {
    data = response;
  }).catch((error) => {
    // handle error
    data = error.response;
  })

  return data;
}

export const getDoctorById = async (id) => {
  let data;
  await axios({
    method: 'get',
    url: `/api/Doctor/Get/${id}`,

  }).then((response) => {
    data = response;
  }).catch((error) => {
    // handle error
    data = error.response;
  })

  return data;
}