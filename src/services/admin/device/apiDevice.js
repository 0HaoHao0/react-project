import axios from "axios";

export const getAllDevice = async (page) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/Device/GetAll',
        params: {
            page: page
        },
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        console.log(error);
    })

    return data;
}
