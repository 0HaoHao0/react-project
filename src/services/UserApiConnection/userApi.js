import axios from "axios"

export const updateAvatar = async (userId, image) => {
    let data;
    await axios({
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
        })
        .catch((error) => {
            data = error.response;
        })
    return data;
}   