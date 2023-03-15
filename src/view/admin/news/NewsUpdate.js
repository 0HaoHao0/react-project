import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getService } from "../../../services/admin/service/apiService";

// Editor
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { updateNews } from "../../../services/admin/news/apiNew";
import moment from "moment";
function NewsUpdate() {
    let { state } = useLocation();

    const navigate = useNavigate()

    const [newsData, setNewsData] = useState(state);

    const [service, setService] = useState([]);

    const [dataError, setDataError] = useState('');

    const [isTouched, setIsTouched] = useState(''); // biến cờ





    useEffect(() => {
        const load = async () => {
            const resDevice = await getService();
            setService(resDevice.data)

            //Set RoomId and SerIdList
            setNewsData((prevState) => ({
                ...prevState,
                ServiceId: state.services.map(service => service.id)
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

                    newsData.ServiceId.forEach(element => {
                        fromData.append("ServicesId", element)
                    });
                    // newsData.ServiceId && newsData.ServiceId.length ? newsData.ServiceId : [0]

                    Swal.fire({
                        title: "Loading...",
                        html: "Please wait a moment"
                    })
                    Swal.showLoading()
                    const res = await updateNews(fromData, state.id);
                    Swal.close()

                    if (res.status === 200) {
                        toast.success("Update Service Success")
                        navigate('/admin/news')
                    }
                    else {
                        toast.error("Update Service Fail !")
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

    const formartDate = (date) => {
        const dateFormarted = moment(date).format('YYYY-MM-DD');
        return dateFormarted;
    }
    return (<>
        <div className="news-update">
            <div className="row">
                <h1>News Update</h1>
            </div>
            <hr />
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

                    <label htmlFor="content" className="form-label">Content: </label>
                    <div className="ckeditor">
                        <CKEditor
                            editor={Editor}
                            config={{
                                cloudServices: {
                                    tokenUrl: 'https://96022.cke-cs.com/token/dev/4f421aeddafb7c431e79a6743fefd3a8fc56e68d043e13455ccf262b10c4?limit=10',
                                    uploadUrl: 'https://96022.cke-cs.com/easyimage/upload/'
                                }
                            }}
                            data={newsData.content}

                            onChange={(event, editor) => {
                                const data = editor.getData();
                                const e =
                                {
                                    target: {
                                        name: 'content',
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
                                        name: 'content',
                                        value: data,
                                    }
                                }
                                validate(e)
                            }}
                        />
                    </div>
                    <div>
                        {dataError.content
                            && <span className="text-danger">
                                {dataError.content}
                            </span>}
                    </div>
                </div>
            </div>
            <div className="row">
                <h4 className="alert alert-secondary">Service Select</h4>
                <div className="col-12 row mb-3">
                    {service.map((service) => (
                        <div className="col-4" key={service.id}>
                            <div
                                className={`card ${newsData.ServiceId && newsData.ServiceId.includes(service.id) ? 'bg-primary' : ''}`}
                                onClick={() => handleService(service.id)}
                            >
                                <div className="card-body">
                                    <h6 >{`Id: ${service.id}, ${service.code}`}</h6>
                                    <h6 className="card-subtitle">{`${service.name}`}</h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button className="btn btn-primary" onClick={handleUpdateNews}>Update</button>

        </div>
    </>);
}

export default NewsUpdate;