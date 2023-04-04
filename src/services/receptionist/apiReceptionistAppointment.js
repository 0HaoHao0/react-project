import axios from "axios";

export const getAllAppointment = async (params) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/Appointment/GetAll',
        params: params,
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}

export const getAppointmentStates = async () => {
    let data;
    await axios({
        method: 'get',
        url: '/api/SelectBoxItems/GetAppointmentStates',
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}


export const getAppointment = async (id) => {
    let data;
    await axios({
        method: 'get',
        url: `/api/Appointment/Get/${id}`,
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}


export const updateAppointmentState = async (id, state) => {
    let data;
    await axios({
        method: 'put',
        url: `/api/Appointment/UpdateState/${id}`,
        params: {
            id: id,
            state: state,

        }
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}

export const removeDocument = async (id) => {
    let data;
    await axios({
        method: 'delete',
        url: `/api/Appointment/RemoveDocument/${id}`
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}