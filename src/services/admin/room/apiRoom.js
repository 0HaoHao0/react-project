import axios from "axios";

export const getAllRoom = async ({ params }) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/Room/GetAll',
        params: params
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}

export const getRoomTypes = async () => {
    let data;
    await axios({
        method: 'get',
        url: '/api/SelectBoxItems/GetRoomTypes',
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })
    return data;
}

export const getDevices = async () => {
    let data;
    await axios({
        method: 'get',
        url: '/api/SelectBoxItems/GetDevices',
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}


export const getRoom = async () => {
    let data;
    await axios({
        method: 'get',
        url: '/api/SelectBoxItems/GetRooms',
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}


export const createRoom = async (roomData) => {
    let data;
    await axios({
        method: 'post',
        url: '/api/Room/Create',
        data: roomData,
        headers: {
            "Content-Type" : "application/json"
        }
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}


export const deleteRoom = async (id) => {
    let data;
    await axios({
        method: 'delete',
        url: `/api/Room/Delete/${id}`,
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}

export const updateRoom = async ({ id, newData }) => {
    let data;
    await axios({
        method: 'put',
        url: '/api/Room/Update',
        data: {
            id: id,
            ...newData
        }
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}

export const getRoomCategories = (callback) => {
    axios({
        method: "GET",
        url: "/api/RoomCategories",
    })
    .then(res => {
        if(callback) callback(res);
    })
    .catch(err => {
        if(callback) callback(err.response);
    });
}

export const deleteRoomCategory = async (id) => {
    let data;
    await axios({
        method: 'delete',
        url: `/api/RoomCategories/${id}`,
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}

export const getRoomDetail = ({ id, callback }) => {
    axios({
        method: "GET",
        url: `/api/Room/Get/${id}`
    })
    .then(res => callback && callback(res))
    .catch(err => callback && callback(err.res));
}