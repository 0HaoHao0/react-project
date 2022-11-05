import axios from "axios"
import Swal from "sweetalert2"

export const getServices = async (callback) => {
    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()
            axios({
                method: 'get',
                url: 'https://localhost:44355/api/Service/GetAll',
                params: {
                    page: -1,
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