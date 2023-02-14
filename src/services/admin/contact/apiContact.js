import axios from "axios";

export const getAllContact = async (page) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/Contact/GetAll',
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


export const updateContact = async (contactUpdate) => {
    let data;
    await axios({
        method: 'put',
        url: '/api/Contact/ChangeState',
        data: {
            id: contactUpdate.id,
            stateIndex: contactUpdate.stateIndex
        },
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        console.log(error);
    })

    return data;
}


export const deleleContact = async (id) => {
    let data;
    await axios({
        method: 'delete',
        url: `/api/Contact/Delete/${id}`,

    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        console.log(error);
    })

    return data;
}