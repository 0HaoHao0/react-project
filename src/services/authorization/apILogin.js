import axios from "axios";
import { toast } from "react-toastify";
export const login = async (userName, password) => {
  let data;
  await axios({
    method: "post",
    url: "/api/Login/LoginBasic",
    data: {
      userName: userName,
      password: password,
    },
  })
    .then((response) => {
      data = response;
    })
    .catch((error) => {
      toast.error("username or password is incorrect, Please try again");
      // handle error
      console.log(error);
    });

  return data;
};

export const getUserInfo = async () => {
  let data;
  await axios({
    method: "get",
    url: "/api/user/getauthorize",
  })
    .then((response) => {
      data = response;
    })
    .catch((error) => {
      // handle error
      toast.error("Please try again");
      console.log(error);
    });

  return data;
};

export const forgotpassword = async (userName) => {
  let data;
  await axios({
    method: "post",
    url: "/api/ForgotPassword/ResetPasswordByEmail",
    params: {
      prefixUrl: "http://localhost:3000/resetpassword",
    },
    data: {
      userName: userName,
    },
  })
    .then((response) => {
      data = response;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });

  return data;
};
