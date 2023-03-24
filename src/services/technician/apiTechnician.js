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

export const getAppointmentDetailAPIs = ({id, params = {}, callback = (res) => console.log(res)}) => {
    callAPI({
        method: "GET",
        endpoint: `/api/Appointment/Get/${id}`,
        params: params,
        callback: callback
    });
}

export const getImageSegmentationResultAPIs = ({params = {}, callback = (res) => console.log(res)}) => {
    callAPI({
        method: "GET",
        endpoint: `/api/Technician/GetSegmentationResults`,
        params: params,
        callback: callback
    });
}

export const deleteImageSegmentationResultAPI = ({ resultId, callback }) => {
    callAPI({
        method: "DELETE",
        endpoint: "/api/Technician/RemoveSegmentationResult",
        params: {
            id: resultId
        },
        callback: callback
    });
}

export const updateStateForAppointmentAPI = ({ appointmentId, stateIndex, callback = (res) => console.log(res) }) => {
    callAPI({
      method: "PUT",
      endpoint: `/api/Appointment/UpdateState/${appointmentId}`,
      params: {
        state: stateIndex
      },
      callback: callback
    });
}

export const uploadXRayImageAPI = ({ formData, callback }) => {
    callAPI({
        method: "POST",
        endpoint: "/api/Technician/UploadXRayImage",
        formData: true,
        data: formData,
        callback: callback
    });
}