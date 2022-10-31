import axios from "axios";
import Swal from "sweetalert2";

let response;

export const ServiceGetAll = async (page) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'Get',
                url: `https://localhost:44355/api/Service/GetAll`,
                data: {
                    page: page
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
                data: {
                    serviceCode: data.serviceCode,
                    description: data.description,
                    price: data.price
                }

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
                data: {
                    id: data.id,
                    serviceCode: data.serviceCode,
                    description: data.description,
                    price: data.price,
                }

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
