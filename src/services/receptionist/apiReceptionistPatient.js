import axios from "axios";

export const createPatient = async (Data) => {
    let data;
    await axios({
        method: 'post',
        url: '/api/Register/BasicSignUp',
        data: {
            userName: Data.userName,
            fullName: Data.fullName,
            password: Data.password,
            email: Data.email,
            phoneNumber: Data.phoneNumber,
            gender: Data.gender,
        },
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}
