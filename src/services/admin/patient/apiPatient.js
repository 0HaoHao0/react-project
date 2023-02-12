export const getAllPatient = async () => {
    let data;
    await axios({
        method: 'get',
        url: '/api/user/getauthorize',
    }).then((response) => {
        data = response;
    }).catch((error) => {
        // handle error
        console.log(error);
    })

    return data;
}