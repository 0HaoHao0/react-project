import axios from "axios";

export const getAllDoctor = async (page) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/Doctor/GetAll',
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

export const createDoctor = async (fromData) => {
    let data;
    await axios({
        method: 'post',
        url: '/api/Doctor/CreateDoctor',
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

export const updateDoctor = async (fromData) => {
    let data;
    await axios({
        method: 'Put',
        url: '/api/Doctor/Update',
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



export const acceptDoctor = async (id) => {
    let data;
    await axios({
        method: 'post',
        url: `/api/Doctor/AcceptRequest/${id}`,
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        console.log(error);
    })

    return data;
}

export const getDoctorInfo = async (id) => {
    let data;
    await axios({
        method: 'get',
        url: `/api/Doctor/Get/${id}`,
        params: {
            id: id
        },
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
        console.log(error);
    })

    return data;
}
