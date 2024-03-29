import axios from "axios"


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

export const fetchUserList = ({ params, callback }) => {
    callAPI({
        method: "GET",
        endpoint: "/api/Messages/ListUsersChatBox",
        params: params,
        callback: callback
    });
}

export const fetchUserMessages = ({patientId, params, callback}) => {
    callAPI({
        method: "GET",
        endpoint: "/api/Messages/ListMessagesInConversationOfReception/" + patientId,
        params: params,
        callback: callback
    })
}

export const postMessage = ({ patientId, content, callback }) => {
    callAPI({
        method: "POST",
        endpoint: "/api/Messages/RecToPat",
        data: {
            patientId,
            content
        },
        callback: callback
    });
}

export const markSeenChatBox = ({chatboxId, callback}) => {
    callAPI({
        method: "PUT",
        endpoint: "/api/Messages/MarkAsSeenChatBox/" + chatboxId,
        callback: callback
    });
}