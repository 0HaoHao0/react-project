import axios from "axios"
import Swal from "sweetalert2"

export const ChatGetMessage = async (page, callback) => {
    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()
            axios({
                method: 'get',
                url: `https://localhost:44373/api/Messages/ListMessagesInConversationOfPatient`,
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

export const ChatPattoRec = async (content, callback) => {

    axios({
        method: 'post',
        url: `https://localhost:44373/api/Messages/PatToRec`,
        data: {
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
