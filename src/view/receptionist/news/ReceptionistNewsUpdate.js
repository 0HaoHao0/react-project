import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

// Editor
import { Editor } from 'primereact/editor';

import { MultiSelect } from 'primereact/multiselect';
import moment from "moment";
import { getService, updateNews } from "../../../services/receptionist/apiReceptionistNews";

function ReceptionistNewsUpdate() {
    let { state } = useLocation();

    const navigate = useNavigate()

    const [newsData, setNewsData] = useState(state);

    const [service, setService] = useState([]);

    const [dataError, setDataError] = useState('');

    const [isTouched, setIsTouched] = useState(''); // biến cờ





    useEffect(() => {
        const load = async () => {
            const resService = await getService();
            setService(resService.data)

            //Set RoomId and SerIdList
            setNewsData((prevState) => ({
                ...prevState,
                ServiceId: state.services.map((service) => {
                    const matchingService = resService.data.find((element) => element.id === service.id);
                    return matchingService
                })
            }))

        }
        load();
    }, [state])

    //Handle

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewsData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditor = (name, value) => {
        setNewsData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        validateEditor(name, value);
    }



    const handleService = (service) => {
        setNewsData((prevState) => ({
            ...prevState,
            ServiceId: service
        }))
    };

    const handleUpdateNews = async () => {

        if (!newsData.title || !newsData.publishDate || !newsData.content) {
            toast.error("Please fill in all Input !")
        }
        else {
            Swal.fire({
                title: 'Are You Sure ?',
                showCancelButton: true,
                confirmButtonColor: '#007bff',
                cancelButtonColor: '#aaa',
                confirmButtonText: 'OK',
                focusCancel: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // Xử lý khi người dùng bấm OK
                    const fromData = new FormData();
                    fromData.append("Title", newsData.title)
                    fromData.append("PublishDate", newsData.publishDate)
                    fromData.append("Content", newsData.content)

                    if (newsData.ServiceId) {
                        newsData.ServiceId.forEach(element => {
                            fromData.append("ServicesId", element.id)
                        });
                    }
                    else {
                        fromData.append("ServicesId", 0)
                    }

                    Swal.fire({
                        title: "Loading...",
                        html: "Please wait a moment"
                    })
                    Swal.showLoading()
                    const res = await updateNews(fromData, state.id);
                    Swal.close()

                    if (res.status === 200) {
                        toast.success("Update News Success")
                        navigate('/receptionist/news')
                    }
                    else {
                        toast.error("Update News Fail !")
                    }
                } else {
                    // Xử lý khi người dùng bấm Cancel
                    toast.info("Update cancelled");
                }
            });
        }
    }

    const validate = (e) => {
        const { name, value } = e.target;
        setIsTouched((prevState) => ({
            ...prevState,
            [name]: "Touch"
        }));
        if (value === '') {
            setDataError((prevState) => ({
                ...prevState,
                [name]: "Input Empty !"
            }));

        }
        else {
            setDataError((prevState) => ({
                ...prevState,
                [name]: ''
            }));

        }
    }

    const validateEditor = (name, value) => {
        setIsTouched((prevState) => ({
            ...prevState,
            [name]: "Touch"
        }));
        console.log(value);
        if (!value) {
            setDataError((prevState) => ({
                ...prevState,
                [name]: "Input Empty !"
            }));
        }
        else {


            setDataError((prevState) => ({
                ...prevState,
                [name]: ''
            }));
        }
    }

    const formartDate = (date) => {
        const dateFormarted = moment(date).format('YYYY-MM-DD');
        return dateFormarted;
    }
    return (<>
        <div className="news-update p-5">
            <h1>News Update</h1>
            <hr />
            <div className="container-fluid">

                <div className="row">
                    <h4 className="alert alert-secondary">News Infomation</h4>
                    <div className="col-lg-6 col-sm-12 ">
                        <label htmlFor="title" className="form-label">Title: </label>
                        <input type="text" className={`form-control  ${isTouched.title && (dataError.title ? "is-invalid" : "is-valid")}`}
                            id="title" name="title" placeholder={newsData.title} defaultValue={newsData.title}
                            onBlur={validate} onChange={handleChange} />
                        {dataError.title
                            ? <div className="invalid-feedback">
                                {dataError.title}
                            </div>
                            : null}



                    </div>
                    <div className="col-lg-6 col-sm-12 ">

                        <label htmlFor="publishDate" className="form-label">Publish Date: </label>
                        <input type="date" className={`form-control  ${isTouched.publishDate && (dataError.publishDate ? "is-invalid" : "is-valid")}`}
                            id="publishDate" name="publishDate" defaultValue={formartDate(newsData.publishDate)}
                            onBlur={validate} onChange={handleChange} />
                        {dataError.publishDate
                            ? <div className="invalid-feedback">
                                {dataError.publishDate}
                            </div>
                            : null}
                    </div>

                    <div className="col-12 mb-3">

                        <label htmlFor="Content" className="form-label">Content: </label>
                        <Editor value={newsData.content} type='editor' name='Content' style={{ minHeight: '250px' }}
                            onTextChange={(e) => { handleEditor('content', e.htmlValue) }}
                        />
                        {dataError.Content
                            && <span className="invalid-feedback d-inline">
                                {dataError.Content}
                            </span>}

                    </div>
                </div>
                <div className="col-12">
                    <MultiSelect value={newsData.ServiceId} onChange={(e) => handleService(e.value)} options={service} optionLabel='name' filter
                        placeholder="Select Service" className="w-100 " />
                </div>

            </div>
            <button className="btn btn-primary my-2" onClick={handleUpdateNews}>Update</button>


        </div>
    </>);
}

export default ReceptionistNewsUpdate;