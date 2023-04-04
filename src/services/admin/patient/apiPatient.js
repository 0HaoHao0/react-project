import axios from "axios";

export const getAllPatient = async ({ params }) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/Patient/GetAll',
        params: params,
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
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
        data = error.response;
    })

    return data;
}

export const getPatientInfo = async (id) => {
    let data;
    await axios({
        method: 'get',
        url: '/api/Patient/GetPatientById',
        params: {
            id: id
        },
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        data = error.response;
        console.log(error);
    })

    return data;
}
