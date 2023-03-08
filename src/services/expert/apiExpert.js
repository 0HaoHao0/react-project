import axios from "axios";


export const callAPI = ({method, endpoint, params, data, formData, callback}) => {
    axios({
        method: method,
        url: endpoint,
        params: params,
        data: data,
        headers: {
            'content-type': formData ? 'multipart/form-data' : 'application/json'
        }
    })
    .then(response => {
        callback(response.status);
    })
    .catch(error => {
        callback(error.response.status);
    });
}

