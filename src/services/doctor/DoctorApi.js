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
            startDate: filter.startDate
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