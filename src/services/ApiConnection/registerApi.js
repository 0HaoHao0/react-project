import axios from "axios"
import Swal from "sweetalert2";


export const registerApi = async (registerData, callback) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()

            axios({
                method: 'post',
                url: 'https://localhost:44355/api/Register/BasicSignUp',
                data: {
                    userName: registerData.userName,
                    fullName: registerData.fullName,
                    password: registerData.password,
                    email: registerData.email,
                    birthDate: registerData.birthDate,
                    phoneNumber: registerData.phoneNumber,
                    gender: registerData.gender,
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
    })

}   