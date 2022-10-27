import axios from "axios"
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

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
                    // Set token to session
                    const cookies = new Cookies()
                    cookies.set('JWT', `Bearer ${res.data.token}`, {
                        path: '/',
                        maxAge: 10800,
                    })
                    // Set up author token
                    axios.defaults.headers.common['Authorization'] = cookies.get('JWT');
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

export const loginAuthorize = async () => {
    let data;

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()

            axios({
                method: 'get',
                url: `https://localhost:44355/api/User/GetAuthorize`,
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

