import axios from "axios";
import Swal from "sweetalert2";

export const UserGetAll = async (page, callback) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'get',
                url: `https://localhost:44355/api/User/GetUsers`,
                params: {
                    page: page
                }
            }).then((res) => {
                callback(res)
                Swal.close();
            }).catch((error) => {
                let res = error.response;
                callback(res)
                Swal.close();

            })

        },

    }).then((result) => {
        /* Read more about handling dismissals below */

    })

}


export const UserGetId = async (id, callback) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'get',
                url: `https://localhost:44355/api/User/Get/${id}`,
            }).then((res) => {
                callback(res)
                Swal.close();
            }).catch((error) => {
                let res = error.response;
                callback(res)
                Swal.close();

            })

        },

    }).then((result) => {
        /* Read more about handling dismissals below */

    })

}

export const UserUpdate = async (data, callback) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'put',
                url: `https://localhost:44355/api/User/Update`,
                data: {
                    userId: data.userId,
                    fullName: data.fullName,
                    birthDate: data.birthDate,
                    gender: data.gender,
                    address: data.address,
                }
            }).then((res) => {
                callback(res)
                Swal.close();
            }).catch((error) => {
                let res = error.response;
                callback(res)
                Swal.close();

            })

        },

    }).then((result) => {
        /* Read more about handling dismissals below */

    })

}



export const UserDelete = async (id, callback) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'delete',
                url: `https://localhost:44355/api/User/Delete/${id}`,
            }).then((res) => {
                callback(res)
                Swal.close();
            }).catch((error) => {
                let res = error.response;
                callback(res)
                Swal.close();
            })

        },

    }).then((result) => {
        /* Read more about handling dismissals below */

    })

}