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
      // handle error
      console.log(error);
      data = error.response;
    });

  return data;
};

export const updateProfile = async ({userId, newInfo}) => {

  let data;
  await axios({
    method: "put",
    url: "/api/User/Update",
    data: {
      userId: userId,
      ...newInfo
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