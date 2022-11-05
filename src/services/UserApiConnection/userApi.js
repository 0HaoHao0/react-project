import axios from "axios"
import Swal from "sweetalert2";

export const updateAvatar = async (userId, image) => {
    let data;


    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()
            axios({
                method: 'post',
                url: 'https://localhost:44355/api/User/UpdateAvatar',
                headers: { "Content-type": "multipart/form-data" },
                params: {
                    userId: userId
                }
                ,
                data: image

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


export const updatePassword = async (data, callback) => {
    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()
            axios({
                method: 'post',
                url: 'https://localhost:44355/api/User/UpdatePassword',
                data: data

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
    })
}   