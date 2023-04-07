import axios from "axios";

export const getAllContact = async (filter) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/Contact/GetAll',
        params: filter,
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        console.log(error);
        data = error.response;
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
