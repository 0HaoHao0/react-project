import axios from "axios";

export const getServiceById = async (id) => {
    let data;
    await axios({
        method: 'get',
        url: `/api/Service/Get/${id}`,
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
    })

    return data;
}
