import axios from "axios"
import Swal from "sweetalert2";

export const loginApi = async (loginAccount) => {
    let data;

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()

            axios({
                method: 'post',
                url: `https://localhost:44355/api/Login/LoginBasic`,
                data: {
                    username: loginAccount.username,
                    password: loginAccount.password,
                }
            })
                .then((res) => {
                    data = res;
                    // Set up author token
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
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

export const loginAuthorize = async (token) => {
    let data;

    await axios({
        method: 'get',
        url: `https://localhost:44355/api/User/GetAuthorize`,
    })
        .then((res) => {
            data = res;
        })
        .catch((error) => {
            data = error.response;
        })
    return data;
}

