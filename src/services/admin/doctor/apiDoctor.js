import axios from "axios";

export const getAllDoctor = async (page) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/Doctor/GetAll',
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
