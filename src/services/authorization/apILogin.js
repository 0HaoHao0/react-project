import axios from "axios";
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
      data = error.response;
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
      data = error.response;
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
      data = error.response;
      console.log(error);
    });

  return data;
};
