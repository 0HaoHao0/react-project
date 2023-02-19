import axios from "axios";

export const getAllRoom = async (page) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/Room/GetAll',
        params: {
            page: page
        },
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        console.log(error);
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
        console.log(error);
    })

    return data;
}

export const createRoom = async (Data) => {
    let data;
    await axios({
        method: 'post',
        url: '/api/Room/Create',
        data: {
            roomCode: Data.roomCode,
            description: Data.description,
            roomType: Data.roomType,
        },
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
        console.log(error);
    })

    return data;
}

export const updateRoom = async (Data) => {
    let data;
    await axios({
        method: 'put',
        url: '/api/Room/Update',
        data: {
            id: Data.id,
            roomCode: Data.roomCode,
            description: Data.description,
            roomType: Data.roomTypeId,
        }
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        console.log(error);
    })

    return data;
}