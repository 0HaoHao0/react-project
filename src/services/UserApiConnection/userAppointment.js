import axios from "axios"
import Swal from "sweetalert2"


export const UserAppointmentGetAll = async (userId, state, callback) => {
    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()
            axios({
                method: 'get',
                url: 'https://localhost:44355/api/Appointment/GetAll',
                params: {
                    patientId: userId,
                    state: state,
                }
            })
                .then((res) => {
                    callback(res)
                    Swal.close();
                })
                .catch((error) => {
                    let res = error.response;
                    callback(res)
                    Swal.close();
                })
        }
    }).then((res) => {

    })
}




export const getSlots = async (callback) => {
    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()
            axios({
                method: 'get',
                url: 'https://localhost:44355/api/SelectBoxItems/GetSlots',
            })
                .then((res) => {
                    callback(res)
                    Swal.close();
                })
                .catch((error) => {
                    let res = error.response;
                    callback(res)
                    Swal.close();
                })
        }
    }).then((res) => {

    })
}

export const AppointmentCreate = async (data, callback) => {
    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()
            axios({
                method: 'post',
                url: 'https://localhost:44355/api/Appointment/Create',
                data: data,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((res) => {
                    callback(res)
                    Swal.close();
                })
                .catch((error) => {
                    let res = error.response;
                    callback(res)
                    Swal.close();
                })
        }
    }).then((res) => {

    })
}   