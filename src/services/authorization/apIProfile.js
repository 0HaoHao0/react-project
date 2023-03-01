import axios from "axios";
import { toast } from "react-toastify";
export const profile = async (userId, oldPassword, newPassword) => {
  let data;
  await axios({
    method: "post",
    url: "/api/User/UpdatePassword",
    data: {
      userId: userId,
      oldPassword: oldPassword,
      newPassword: newPassword,
    },
  })
    .then((response) => {
      data = response;
    })
    .catch((error) => {
      toast.error("password error, Please try again!!!");
      // handle error
      console.log(error);
    });

  return data;
};
