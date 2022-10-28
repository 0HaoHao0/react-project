import axios from "axios";
import Swal from "sweetalert2";

let response;

export const ServiceGetAll = async () => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'Get',
                url: `https://localhost:44355/api/Service/GetAll`
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
        if (result.isDismissed) {
            console.log('I was closed by server response')
        }
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
        if (result.isDismissed) {
            console.log('I was closed by server response')
        }
    })

    return response;

}


export const ServiceUpdate = async (data) => {
    let data;

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()

            axios({
                method: 'post',
                url: `https://localhost:44355/api/Service/Update`,
                data: {
                    id: id,
                    stateIndex: stateIndex
                }

            })
                .then((res) => {
                    data = res;
                    Swal.close();
                })
                .catch((error) => {
                    data = error.response;
                    Swal.close();
                })
        }
    })

    return data;
}

export const ServiceDelete = async (id) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'Post',
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
        if (result.isDismissed) {
            console.log('I was closed by server response')
        }
    })

    return response;
}
