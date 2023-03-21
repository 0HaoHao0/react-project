import axios from "axios";

export const getContactStates = () => {
    let data = [
        { id: "0", name: "Pending" },
        { id: "1", name: "Done" },
        { id: "2", name: "Ignore" }
    ];

    return data;
}

export const getAllContact = async (filter) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/Contact/GetAll',
        params: {
            page: filter.page,
            state: filter.state,
            from: filter.from,
            to: filter.to,
            keyword: filter.keyword,
        },
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