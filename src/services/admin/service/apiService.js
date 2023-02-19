import axios from "axios";

export const getAllService = async (page) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/Service/GetAll',
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
