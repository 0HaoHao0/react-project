import axios from "axios";

export const getAllDevice = async (page) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/Device/GetAll',
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
export const getDevice = async () => {
    let data;
    await axios({
        method: 'get',
        url: '/api/SelectBoxItems/GetDevices',
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        console.log(error);
    })

    return data;
}
export const createDevice = async (fromData) => {
    let data;
    await axios({
        method: 'post',
        url: '/api/Device/Create',
        data: fromData,
        headers: {
            'content-type': 'multipart/form-data'
        },
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        console.log(error);
    })

    return data;
}


export const deleteDevice = async (id) => {
    let data;
    await axios({
        method: 'delete',
        url: `/api/Device/Delete/${id}`,
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        console.log(error);
    })

    return data;
}


export const updateDevice = async (fromData) => {
    let data;
    await axios({
        method: 'put',
        url: '/api/Device/Update',
        data: fromData,
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        console.log(error);
    })

    return data;
}
