import axios from "axios"
import Swal from "sweetalert2"


export const AppointmentGetAll = async (state, callback) => {
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

export const AppointmentGetId = async (id, callback) => {
    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()
            axios({
                method: 'get',
                url: `https://localhost:44355/api/Appointment/Get/${id}`,
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
export const AppointmentAccept = async (id, callback) => {
    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()
            axios({
                method: 'put',
                url: `https://localhost:44355/api/Appointment/Accept/${id}`,
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
export const AppointmentCancel = async (id, callback) => {
    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()
            axios({
                method: 'put',
                url: `https://localhost:44355/api/Appointment/Cancel/${id}`,

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

export const AppointmentDoing = async (id, callback) => {
    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()
            axios({
                method: 'put',
                url: `https://localhost:44355/api/Appointment/Doing/${id}`,

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

export const AppointmentComplete = async (id, callback) => {
    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()
            axios({
                method: 'put',
                url: `https://localhost:44355/api/Appointment/Complete/${id}`,

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

