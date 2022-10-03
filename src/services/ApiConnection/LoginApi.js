import axios from "axios"

export const loginApi = async (loginAccount) => {
    let data;
    await axios({
        method: 'post',
        url: 'https://localhost:44355/api/Login/LoginBasic',
        data: {
            username: loginAccount.username,
            password: loginAccount.password,
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