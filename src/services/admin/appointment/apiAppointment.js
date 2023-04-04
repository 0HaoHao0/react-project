import axios from "axios";

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

// export const deleteAppointment = async (id) => {
//     let data;
//     await axios({
//         method: 'delete',
//         url: `/api/Appointment/Delete/${id}`,
//     }).then((response) => {
//         data = response;
//     }).catch((error) => {
//         // handle error
//         data = error.response;
//     })

//     return data;
// }

export const updateAppointment = async (fromData) => {
    let data;
    await axios({
        method: 'put',
        url: '/api/Appointment/Update',
        data: fromData,
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;

    })

    return data;
}


