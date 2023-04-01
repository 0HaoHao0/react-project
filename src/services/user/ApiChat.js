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

export const fetchUserMessages = ({ params, callback }) => {
    callAPI({
        method: "GET",
        endpoint: "/api/Messages/ListMessagesInConversationOfPatient",
        params: params,
        callback: callback
    });
}

export const postUserMessage = ({ content, callback }) => {
    callAPI({
        method: "POST",
        endpoint: "/api/Messages/PatToRec",
        data: {
            content: content
        },
        callback: callback
    });
}