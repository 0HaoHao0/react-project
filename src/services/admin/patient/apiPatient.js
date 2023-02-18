import axios from "axios";

export const getAllPatient = async (page) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/Patient/GetAll',
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

export const updateMedicalRecord = async (formData) => {
    let data;
    await axios({
        method: 'Post',
        url: '/api/Patient/UpdateMedicalRecord',
        data: formData,
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        console.log(error);
    })

    return data;
}