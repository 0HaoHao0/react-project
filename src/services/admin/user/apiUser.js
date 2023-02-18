import axios from "axios";

export const getAllUser = async (page) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/User/GetUsers',
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


export const updateRole = async (id, roleId) => {
    let data;
    await axios({
        method: 'put',
        url: '/api/User/ChangeRole',
        data: {
            userId: id,
            roleId: roleId
        },
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        console.log(error);
    })

    return data;
}

export const deleteUser = async (id) => {
    let data;
    await axios({
        method: 'delete',
        url: `/api/User/Delete/${id}`,
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        console.log(error);
    })

    return data;
}