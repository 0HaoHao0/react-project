import axios from "axios";


export const callAPI = ({method, endpoint, params=null, data=null, formData=false, callback=null}) => {
    axios({
        method: method,
        url: endpoint,
        params: params,
        data: data,
        headers: {
            'Content-Type': formData ? 'multipart/form-data' : 'application/json'
        }
    })
    .then(response => {
        if(callback) callback(response);
        console.log(endpoint, response);
    })
    .catch(error => {
        if(callback) callback(error.response);
    });
}

