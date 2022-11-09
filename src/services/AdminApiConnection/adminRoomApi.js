import axios from "axios";
import Swal from "sweetalert2";

let response;

export const RoomGetAll = async (page) => {
    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: async () => {
            Swal.showLoading();

            await axios({
                method: 'Get',
                url: `https://localhost:44355/api/Room/GetAll`,
                params: {
                    page: page
                }
            }).then((res) => {
                response = res;
                Swal.close();
            }).catch((error) => {
                response = error.response;
                Swal.close();

            })

        },

    }).then((result) => {

    })
    return response;

}

export const RoomGetSelect = async (callback) => {
    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: async () => {
            Swal.showLoading();

            await axios({
                method: 'Get',
                url: `https://localhost:44355/api/SelectBoxItems/GetRooms`
            }).then((res) => {
                response = res;
                callback(response)
                Swal.close();
            }).catch((error) => {
                response = error.response;
                callback(response)
                Swal.close();

            })

        },

    }).then((result) => {

    })
}
export const RoomGetSelectRoomTypes = async (callback) => {
    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: async () => {
            Swal.showLoading();

            await axios({
                method: 'Get',
                url: `https://localhost:44355/api/SelectBoxItems/GetRoomTypes`
            }).then((res) => {
                response = res;
                callback(response)
                Swal.close();
            }).catch((error) => {
                response = error.response;
                callback(response)
                Swal.close();

            })

        },

    }).then((result) => {

    })
}

export const RoomGetId = async (id) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'Get',
                url: `https://localhost:44355/api/Room/Get/${id}`,
            })
                .then((res) => {
                    response = res;
                    Swal.close();

                })
                .catch((error) => {
                    response = error.response;
                    Swal.close();
                });

        },

    }).then((result) => {

    })

    return response;

}



export const RoomCreate = async (data) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()

            axios({
                method: 'post',
                url: `https://localhost:44355/api/Room/Create`,
                data: {
                    roomCode: data.roomCode,
                    description: data.description
                }

            })
                .then((res) => {
                    response = res;
                    Swal.close();
                })
                .catch((error) => {
                    response = error.response;
                    Swal.close();
                })
        }
    })

    return response;
}

export const RoomUpdate = async (data) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()

            axios({
                method: 'put',
                url: `https://localhost:44355/api/Room/Update`,
                data: {
                    id: data.id,
                    roomCode: data.roomCode,
                    description: data.description,
                    roomType: data.roomType
                }

            })
                .then((res) => {
                    response = res;
                    Swal.close();
                })
                .catch((error) => {
                    response = error.response;
                    Swal.close();
                })
        }
    })

    return response;
}

export const RoomDelete = async (id) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'Delete',
                url: `https://localhost:44355/api/Room/Delete/${id}`,
            })
                .then((res) => {
                    response = res;
                    Swal.close();

                })
                .catch((error) => {
                    response = error.response;
                    Swal.close();
                });

        },

    }).then((result) => {

    })

    return response;
}
