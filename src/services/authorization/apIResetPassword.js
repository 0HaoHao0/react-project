import axios from "axios";
import { toast } from "react-toastify";
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
      // handle error
      toast.error("Password error, Please try again?");
      console.log(error);
    });

  return data;
};
