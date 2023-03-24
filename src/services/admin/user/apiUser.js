import axios from "axios";

export const getAllUser = async (page) => {
  let data;
  await axios({
    method: "get",
    url: "/api/User/GetUsers",
    params: {
      page: page,
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

export const updateRole = async (id, roleId) => {
  let data;
  await axios({
    method: "put",
    url: "/api/User/ChangeRole",
    data: {
      userId: id,
      roleId: roleId,
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

export const deleteUser = async (id) => {
  let data;
  await axios({
    method: "delete",
    url: `/api/User/Delete/${id}`,
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

export const lock = async (reason, expired, id) => {
  let data;
  await axios({
    method: "post",
    url: `/api/UserLock/Lock`,
    data: {
      userId: id,
      reason: reason,
      expired: expired,
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

export const unlock = async (id) => {
  let data;
  await axios({
    method: "post",
    url: `/api/UserLock/UnLock`,
    data: {
      userId: id,
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

export const updateAvatar = async (fromData) => {
  let data;
  await axios({
    method: "post",
    url: `/api/User/UpdateAvatar`,
    headers: { "Content-type": "multipart/form-data" },
    data: fromData,
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
