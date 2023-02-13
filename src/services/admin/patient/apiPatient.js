import axios from "axios";

export const getAllPatient = async () => {
    let data;
    await axios({
        method: 'get',
        url: '/api/Patient/GetAll',
        data: {
            page: 1
        },
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        console.log(error);
    })

    return data;
}