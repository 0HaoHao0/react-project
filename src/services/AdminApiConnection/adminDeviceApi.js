import axios from "axios";
import Swal from "sweetalert2";

let response;

export const DeviceGetAll = async (page) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'Get',
                url: `https://localhost:44355/api/Device/GetAll`
            }).then((res) => {
                response = res;
                Swal.close();
            }).catch((error) => {
                response = error.response;
                Swal.close();

            })

        },

    }).then((result) => {
        /* Read more about handling dismissals below */

    })

    return response;

}

export const DeviceGetId = async (id) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'Get',
                url: `https://localhost:44355/api/Device/Get/${id}`,
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
        /* Read more about handling dismissals below */

    })

    return response;
}

export const DeviceCreate = async (data) => {
    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()

            axios({
                method: 'post',
                url: `https://localhost:44355/api/Device/Create`,
                data: {
                    deviceValue: data.deviceValue,
                    deviceName: data.deviceName,
                    description: data.description,
                    date: new Date(),
                    status: data.status,
                    roomId: data.roomId,
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

let resDeviceUpdate;

export const DeviceUpdate = async (data) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {

            Swal.showLoading()

            axios({
                method: 'put',
                url: `https://localhost:44355/api/Device/Update`,
                data: {
                    id: data.id,
                    deviceValue: data.deviceValue,
                    deviceName: data.deviceName,
                    description: data.description,
                    status: data.status,
                    roomId: data.roomId,
                    serviceDeviceId: 0,
                }

            })
                .then((res) => {
                    resDeviceUpdate = res;
                    Swal.close();
                })
                .catch((error) => {
                    resDeviceUpdate = error.response;
                    Swal.close();
                })
        }
    }).then((result) => {
        /* Read more about handling dismissals below */

    })

    return resDeviceUpdate;
}

export const DeviceDelete = async (id) => {

    await Swal.fire({
        title: 'Waiting...',
        icon: 'warning',
        html: 'This pop-up will close when server response.',
        didOpen: () => {
            Swal.showLoading();

            axios({
                method: 'Delete',
                url: `https://localhost:44355/api/Device/Delete/${id}`,
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
        /* Read more about handling dismissals below */

    })

    return response;
}
