import axios from "axios";
import Swal from "sweetalert2";

let response;

export const ContactGetAll = async () => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'Get',
                url: `https://localhost:44355/api/Contact/GetAll`
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

export const ContactGetId = async (id) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'Get',
                url: `https://localhost:44355/api/Contact/Get/${id}`,
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


export const ContactChangeState = async (id, stateIndex) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()

            axios({
                method: 'put',
                url: `https://localhost:44355/api/Contact/ChangeState`,
                data: {
                    id: id,
                    stateIndex: stateIndex
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

export const ContactDelete = async (id) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'Delete',
                url: `https://localhost:44355/api/Contact/Delete/${id}`,
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
