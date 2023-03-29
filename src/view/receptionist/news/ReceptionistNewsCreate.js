import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Editor
import { Editor } from 'primereact/editor';
import { MultiSelect } from 'primereact/multiselect';

import Swal from "sweetalert2";
import { createNews, getService } from "../../../services/receptionist/apiReceptionistNews";


function ReceptionistNewsCreate() {
    const navigate = useNavigate()

    const [newsData, setNewsData] = useState('');

    const [service, setService] = useState([]);

    const [dataError, setDataError] = useState('');

    const [isTouched, setIsTouched] = useState(''); // biến cờ



    const loadDevice = async () => {
        const res = await getService();
        setService(res.data)
    }

    useEffect(() => {
        loadDevice();
    }, [])

    //Hanlde

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
            service
        }))
    };

    const handleCreateNews = async () => {

        if (!newsData.Title || !newsData.PublishDate || !newsData.Content) {
            toast.error("Please fill in all Input !")
        }
        else {
            const fromData = new FormData();
            fromData.append("Title", newsData.Title)
            fromData.append("PublishDate", newsData.PublishDate)
            fromData.append("Content", newsData.Content)

            if (newsData.service) {
                newsData.service.forEach(element => {
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
            const res = await createNews(fromData);
            Swal.close()

            if (res.status === 200) {
                toast.success("Create Service Success")
                navigate('/receptionist/news')
            }
            else {
                toast.error("Create Service Fail !")
            }
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
    return (
        <>
            <div className="news-create">
                <h1>News Create</h1>
                <hr />
                <div className="container row">
                    <h4 className="alert alert-secondary">News Infomation</h4>
                    <div className="col-lg-6 col-sm-12 ">
                        <label htmlFor="Title" className="form-label">Title: </label>
                        <input type="text" className={`form-control  ${isTouched.Title && (dataError.Title ? "is-invalid" : "is-valid")}`}
                            id="Title" name="Title" placeholder="Nhổ Răng"
                            onBlur={validate} onChange={handleChange} />
                        {dataError.Title
                            ? <div className="invalid-feedback">
                                {dataError.Title}
                            </div>
                            : null}


                    </div>
                    <div className="col-lg-6 col-sm-12 ">

                        <label htmlFor="PublishDate" className="form-label">Publish Date: </label>
                        <input type="date" className={`form-control  ${isTouched.PublishDate && (dataError.PublishDate ? "is-invalid" : "is-valid")}`}
                            id="PublishDate" name="PublishDate" placeholder="NR001 - (Nhổ Răng 001)"
                            onBlur={validate} onChange={handleChange} />
                        {dataError.PublishDate
                            ? <div className="invalid-feedback">
                                {dataError.PublishDate}
                            </div>
                            : null}
                    </div>

                    <div className="col-12 mb-3">

                        <label htmlFor="Content" className="form-label">Content: </label>
                        <Editor value={'Please enter text here.'} type='editor' name='Content' style={{ minHeight: '250px' }}
                            onTextChange={(e) => { handleEditor('Content', e.htmlValue) }}
                        />
                        {dataError.Content
                            && <span className="invalid-feedback d-inline">
                                {dataError.Content}
                            </span>}

                    </div>
                    <h4 className="alert alert-secondary">Service Select</h4>
                    <div className="col-12">
                        <MultiSelect value={newsData.service} onChange={(e) => handleService(e.value)} options={service} optionLabel='name' filter
                            placeholder="Select Service" className="w-100 " />
                    </div>

                </div>

                <button className="btn btn-success my-2" onClick={handleCreateNews}>Create</button>

            </div>
        </>
    );
}

export default ReceptionistNewsCreate;