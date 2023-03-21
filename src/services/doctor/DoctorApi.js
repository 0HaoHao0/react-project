import axios from "axios";

export const getAllAppointment = async (filter) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/Appointment/GetAll',
        params: {
            DoctorId: filter.id,
            Page: filter.currentPage,
            PageSize: filter.pageSize,
            startDate: filter.startDate,
        }
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
export const getAppointmentState = async () => {
    let data;
    await axios({
        method: 'get',
        url: `/api/SelectBoxItems/GetAppointmentStates`,
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

export const addDocument = async (fromData) => {
    let data;
    await axios({
        method: 'post',
        url: `/api/Appointment/DoctorAddDocument`,
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
export const deleteDocument = async (id) => {
    let data;
    await axios({
        method: 'delete',
        url: `/api/Appointment/RemoveDocument/${id}`,
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