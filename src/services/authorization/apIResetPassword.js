import axios from "axios";
export const resetpassword = async (userName, newPassword, secret) => {
  console.log(userName, newPassword, secret);
  let data;
  await axios({
    method: "post",
    url: "/api/ForgotPassword/SubmitPassword",
    data: {
      userName: userName,
      newPassword: newPassword,
      secret: secret,
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
