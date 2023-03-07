import axios from "axios";

export const getAllService = async (page) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/Service/GetAll',
        params: {
            page: page
        },
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}

export const getService = async () => {
    let data;
    await axios({
        method: 'get',
        url: '/api/SelectBoxItems/GetServices',

    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;

    })

    return data;
}


export const createService = async (fromData) => {
    let data;
    await axios({
        method: 'post',
        url: '/api/Service/Create',
        data: fromData,
        headers: {
            'content-type': 'multipart/form-data'
        },
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}



export const deleteService = async (id) => {
    let data;
    await axios({
        method: 'delete',
        url: `/api/Service/Delete/${id}`,
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}

export const updateService = async (fromData) => {
    let data;
    await axios({
        method: 'put',
        url: '/api/Service/Update',
        data: fromData,
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;

    })

    return data;
}