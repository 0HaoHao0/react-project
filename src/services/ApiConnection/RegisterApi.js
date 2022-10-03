import axios from "axios"

export const registerApi = async (registerData) => {
    let data;
    console.log(registerData);
    await axios({
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
            data = res;
        })
        .catch((error) => {
            data = error.response;
        })
    return data;
}   