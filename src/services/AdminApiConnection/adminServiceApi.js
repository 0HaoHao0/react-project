import axios from "axios";
import Swal from "sweetalert2";

let response;

export const ServiceGetAll = async (currentPage) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'Get',
                url: `https://localhost:44355/api/Service/GetAll`,
                params: {
                    page: currentPage
                }
            }).then((res) => {
                response = res;
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

export const ServiceGetSelect = async (callback) => {
    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()

            axios({
                method: 'get',
                url: `https://localhost:44355/api/SelectBoxItems/GetServices`,

            })
                .then((res) => {
                    response = res;
                    callback(response);
                    Swal.close();

                })
                .catch((error) => {
                    response = error.response;
                    callback(response);
                    Swal.close();

                })
        }
    })
}


export const ServiceGetId = async (id) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'Get',
                url: `https://localhost:44355/api/Service/Get/${id}`,
            })
                .then((res) => {
                    response = res;
                    Swal.close();

                })
                .catch((error) => {
                    response = error.response;
                    Swal.close();
                });

        },

    }).then((result) => {
        /* Read more about handling dismissals below */

    })

    return response;
}

export const ServiceCreate = async (data) => {
    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()

            axios({
                method: 'post',
                url: `https://localhost:44355/api/Service/Create`,
                data: data,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((res) => {
                    response = res;
                    Swal.close();
                })
                .catch((error) => {
                    response = error.response;
                    Swal.close();
                })
        }
    })

    return response;
}


export const ServiceUpdate = async (data) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()

            axios({
                method: 'put',
                url: `https://localhost:44355/api/Service/Update`,
                data: data,
                headers: { "Content-Type": "multipart/form-data" },

            })
                .then((res) => {
                    response = res;
                    Swal.close();
                })
                .catch((error) => {
                    response = error.response;
                    Swal.close();
                })
        }
    }).then((result) => {
        /* Read more about handling dismissals below */

    })

    return response;
}

export const ServiceDelete = async (id) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'Delete',
                url: `https://localhost:44355/api/Service/Delete/${id}`,
            })
                .then((res) => {
                    response = res;
                    Swal.close();

                })
                .catch((error) => {
                    response = error.response;
                    Swal.close();
                });

        },

    }).then((result) => {
        /* Read more about handling dismissals below */

    })

    return response;
}
