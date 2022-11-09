import axios from "axios"
import Swal from "sweetalert2"

export const ChatGetUsers = async (callback) => {
    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()
            axios({
                method: 'get',
                url: `https://localhost:44373/api/Messages/ListUsersHasMessage`,
            })
                .then((res) => {
                    callback(res)
                    Swal.close();
                })
                .catch((error) => {
                    let res = error.response;
                    callback(res)
                    Swal.close();
                })
        }
    }).then((res) => {

    })
}

export const ChatGetMessage = async (patientId, page, callback) => {
    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()
            axios({
                method: 'get',
                url: `https://localhost:44373/api/Messages/ListMessagesInConversationOfReception/${patientId}`,
                params: {
                    page: page
                }
            })
                .then((res) => {
                    callback(res)
                    Swal.close();
                })
                .catch((error) => {
                    let res = error.response;
                    callback(res)
                    Swal.close();
                })
        }
    }).then((res) => {

    })
}

export const ChatRectoPat = async (patientId, content, callback) => {

    axios({
        method: 'post',
        url: `https://localhost:44373/api/Messages/RecToPat`,
        data: {
            patientId: patientId,
            content: content
        }
    })
        .then((res) => {
            callback(res)
            Swal.close();
        })
        .catch((error) => {
            let res = error.response;
            callback(res)
            Swal.close();
        })

}


export const ChatGetUserProfile = async (id, callback) => {
    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()
            axios({
                method: 'get',
                url: `https://localhost:44355/api/Patient/GetPatientById`,
                params: {
                    id: id
                }
            })
                .then((res) => {
                    callback(res)
                    Swal.close();
                })
                .catch((error) => {
                    let res = error.response;
                    callback(res)
                    Swal.close();
                })
        }
    }).then((res) => {

    })
}