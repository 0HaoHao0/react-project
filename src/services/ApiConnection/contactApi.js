import axios from "axios";
import Swal from "sweetalert2";

let response;

export const ContactCreate = async (data) => {
    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'Post',
                url: `https://localhost:44355/api/Contact/Create`,
                data: {
                    name: data.contactName,
                    phoneNumber: data.contactPhone,
                    email: data.contactEmail,
                    content: data.contactContent,
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
        if (result.isDismissed) {
            console.log('I was closed by server response')
        }
    })

    return response;

}