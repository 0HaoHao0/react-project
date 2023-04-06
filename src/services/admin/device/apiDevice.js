import axios from "axios";

export const getAllDevice = async ({ params }) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/Device/GetAll',
        params: params,
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        console.log(error);
        data = error.response;
    });

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
        data = error.response;
    });

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

export const getDeviceDetail = async ({ id }) => {
    let data;
    await axios({
        method: 'GET',
        url: `/api/Device/Get/${id}`,
    })
    .then(res => {
        data = res;
    })
    .catch(err => {
        data = err.response;
    });

    return data;
}