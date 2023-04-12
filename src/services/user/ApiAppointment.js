import axios from "axios";

export const createAppointment = async (fromData) => {
    let data;
    await axios({
        method: 'post',
        url: '/api/Appointment/Create',
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

export const getAllAppointment = async ({ params }) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/Appointment/GetAll',
        params: params
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}

export const getServiceById = async (id) => {
    let data;
    await axios({
        method: 'get',
        url: `/api/Service/Get/${id}`,
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}

export const getSlots = async () => {
    let data;
    await axios({
        method: 'get',
        url: '/api/SelectBoxItems/GetSlots',
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}

export const getFreeDoctors = async (inData) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/Appointment/GetFreeDoctors',
        params: {
            Date: inData.Date,
            Slot: inData.Slot
        }
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}