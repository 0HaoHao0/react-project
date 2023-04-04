import axios from "axios";
import Swal from "sweetalert2";

export const register = async (userData) => {
  let data;
  await Swal.showLoading();
  await axios({
    method: "post",
    url: "/api/Register/BasicSignUp",
    data: {
      userName: userData.userName,
      fullName: userData.fullName,
      password: userData.password,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      gender: userData.gender,
    },
  })
    .then((response) => {
      data = response;
    })
    .catch((error) => {
      data = error.response;
    });

    Swal.close();
  return data;
};
export const VerifyUserByCode = async (userId, code) => {
  let data;
  Swal.fire({
    title: "Waiting for response...",
  });
  await Swal.showLoading();
  await axios({
    method: "get",
    url: "/api/Verify/EmailVerifyUser",
    params: { userId: userId, code: code },
  })
    .then((response) => {
      data = response;
    })
    .catch((error) => {
      // handle error
      data = error.response;
      console.log(error);
    });
    Swal.close();
  return data;
};

export const SendCodeToEmail = async (email) => {
  let data;
  Swal.fire({
    title: "Waiting for response...",
  });
  await Swal.showLoading();
  await axios({
    method: "post",
    url: "/api/Verify/RequiredConfirmAccount",
    data: {
      Email: email,
    },
  })
    .then((response) => {
      data = response;
      Swal.fire({
        icon: "success",
        title: "Successful",
        text: data.data,
      });
    })
    .catch((error) => {
      // handle error
      data = error.response;
      console.log(error);
    });
    Swal.close();
  return data;
};
