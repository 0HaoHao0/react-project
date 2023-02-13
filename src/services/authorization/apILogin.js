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
      console.log(error);
    });

  return data;
};
