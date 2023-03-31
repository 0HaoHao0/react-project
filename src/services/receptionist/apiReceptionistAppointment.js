import axios from "axios";

export const getAllAppointment = async (filter) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/Appointment/GetAll',
        params: {
            Page: filter.page,
            PageSize: filter.pageSize,
            startDate: filter.startDate,
            endDate: filter.endDate,
            PhoneNumber: filter.phoneNumber,
            UserName: filter.userName
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