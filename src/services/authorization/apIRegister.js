import axios from "axios";
import { toast } from "react-toastify";
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
      Swal.fire({
        icon: "success",
        title: "Registered successfully",
      });
    })
    .catch((error) => {
      // handle error
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: "Error, Please try again",
      });
      console.log(error);
    });
  await Swal.hideLoading();
  return data;
};
export const VerifyUserByCode = async (userId, code) => {
  let data;
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
      toast.error("Code error, Please try again!!!");
      console.log(error);
    });

  return data;
};

export const SendCodeToEmail = async (email) => {
  let data;
  await axios({
    method: "post",
    url: "/api/Verify/RequiredConfirmAccount",
    data: {
      emailRequired: email,
    },
  })
    .then((response) => {
      data = response;
    })
    .catch((error) => {
      // handle error
      toast.error("Code error, Please try again!!!");
      console.log(error);
    });

  return data;
};
