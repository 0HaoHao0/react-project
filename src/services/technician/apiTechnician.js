import axios from "axios";


const callAPI = ({method, endpoint, params=null, data=null, formData=false, callback=null}) => {
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
        if(callback) callback(response);
    })
    .catch(error => {
        if(callback) callback(error.response);
    });
}

export const getAppointmentQueueAPI = (params = {}, callback = (res) => { console.log(res); }) => {
    
    callAPI({
        method: "GET",
        endpoint: "/api/Technician/GetAppointmentQueue",
        params: params,
        callback: callback
    });
}
