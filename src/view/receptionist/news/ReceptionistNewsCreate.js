import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Editor
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'
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

    const handleService = (serviceId) => {
        const id = parseInt(serviceId);
        const name = "ServiceId"
        setNewsData((prevState) => {
            const list = prevState[name] || [];
            if (list.includes(id)) {
                return {
                    ...prevState,
                    [name]: list.filter((serviceId) => serviceId !== id)
                };
            } else {
                return {
                    ...prevState,
                    [name]: [...list, id]
                };
            }
        })
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

            if (newsData.ServiceId) {
                newsData.ServiceId.forEach(element => {
                    fromData.append("ServicesId", element)
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
                        <div className="ckeditor">
                            <CKEditor
                                editor={Editor}
                                config={{
                                    cloudServices: {
                                        tokenUrl: 'https://96022.cke-cs.com/token/dev/4f421aeddafb7c431e79a6743fefd3a8fc56e68d043e13455ccf262b10c4?limit=10',
                                        uploadUrl: 'https://96022.cke-cs.com/easyimage/upload/'
                                    }
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    const e =
                                    {
                                        target: {
                                            name: 'Content',
                                            value: data,
                                        }
                                    }
                                    handleChange(e);
                                }}
                                onBlur={(event, editor) => {
                                    const data = editor.getData();
                                    const e =
                                    {
                                        target: {
                                            name: 'Content',
                                            value: data,
                                        }
                                    }
                                    validate(e)
                                }}
                            />
                        </div>
                        <div>
                            {dataError.Content
                                && <span className="text-danger">
                                    {dataError.Content}
                                </span>}
                        </div>
                    </div>
                    <h4 className="alert alert-secondary">Service Select</h4>
                    <div className=" row g-2 ">
                        {service.map((service) => (
                            <div className="col-4 mb-2" key={service.id}>
                                <div
                                    className={`card h-100 ${newsData.ServiceId && newsData.ServiceId.includes(service.id) ? 'bg-primary text-white' : ''}`}
                                    onClick={() => handleService(service.id)}
                                >
                                    <div className="card-body">
                                        <h6 className="card-title">{`Id: ${service.id}`}</h6>
                                        <h6 className="card-title">{`${service.name}`}</h6>
                                        <p className="card-text">{`Service Code: ${service.code}`}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="btn btn-success" onClick={handleCreateNews}>Create</button>

            </div>
        </>
    );
}

export default ReceptionistNewsCreate;