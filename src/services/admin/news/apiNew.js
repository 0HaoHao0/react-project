import axios from "axios";

export const getAllNews = async (page) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/News/GetAll',
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



export const createNews = async (fromData) => {
    let data;
    await axios({
        method: 'post',
        url: '/api/News/Create',
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



export const deleteNews = async (id) => {
    let data;
    await axios({
        method: 'delete',
        url: `/api/News/Delete`,
        params: {
            id: id
        }
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}

export const updateNews = async (fromData, id) => {
    let data;
    await axios({
        method: 'put',
        url: `/api/News/Update/${id}`,
        data: fromData,
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;

    })

    return data;
}