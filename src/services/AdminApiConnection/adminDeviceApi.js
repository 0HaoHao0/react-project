import axios from "axios";
import Swal from "sweetalert2";

let response;

export const DeviceGetAll = async () => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'Get',
                url: `https://localhost:44355/api/Device/GetAll`
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

export const DeviceGetId = async (id) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'Get',
                url: `https://localhost:44355/api/Device/Get/${id}`,
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


export const DeviceUpdate = async (data) => {
    let data;

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()

            axios({
                method: 'post',
                url: `https://localhost:44355/api/Device/Update`,
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

export const DeviceDelete = async (id) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'Post',
                url: `https://localhost:44355/api/Device/Delete/${id}`,
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
