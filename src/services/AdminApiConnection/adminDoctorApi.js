import axios from "axios";
import Swal from "sweetalert2";

export const DocterGetAll = async (page, callback) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'get',
                url: `https://localhost:44355/api/Doctor/GetAll`,
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

export const DocterGetMajors = async (callback) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'get',
                url: `https://localhost:44355/api/SelectBoxItems/GetMajors`,

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

let response;

export const DocterRequest = async (data) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'post',
                url: `https://localhost:44355/api/Doctor/RequestToBecomeDoctor`,

                data: data,

                headers: { "Content-Type": "multipart/form-data" },
            }).then((res) => {
                response = res
                Swal.close();
            }).catch((error) => {
                response = error.response;
                Swal.close();

            })

        },

    }).then((result) => {
        /* Read more about handling dismissals below */

    })

    return response;

}

export const DocterUpdate = async (data, callback) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'put',
                url: `https://localhost:44355/api/Doctor/Update`,
                data: data
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

export const DocterGetId = async (id, callback) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'get',
                url: `https://localhost:44355/api/Doctor/Get/${id}`,
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

