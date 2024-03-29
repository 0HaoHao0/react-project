import { useEffect, useState } from "react";
import { callAPI } from "../../services/expert/apiExpert";
import CreateModelForm from "./CreateModelForm";
import SegmentationRequestForm from "./SegmentationRequestForm";
import ListRequestResult from "./ListRequestResult";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import ImageViewer from "../../components/public/ImageViewer";
import "../../components/public/ImageViewer.scss";
import axios from "axios";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteUser } from "../../redux/features/userSlide";

function Expert() {

    const [isCreate, setIsCreate] = useState(false);
    const [modelList, setModelList] = useState([]);

    const [previewURL, setPreviewUrl] = useState(null);

    const getModelList = () => {

        let endpoint = "http://127.0.0.1:8000/api/segmentation_modules/";
        let method = "GET";

        callAPI({
            method: method,
            endpoint: endpoint,
            callback: (response) => {

                console.log(response);
                if (response.status === 200) {
                    setModelList(response.data);
                }

            }
        })
    }

    useEffect(getModelList, []);

    const getCurrentActiveModelInfo = () => {

        let endpoint = "http://127.0.0.1:8000/api/module_activation/current/";
        let method = "GET";

        callAPI({
            method: method,
            endpoint: endpoint,
            callback: (response) => {
                console.log(response);
                if (response.status === 200) {
                    setCurrentActiveModelInfo(response.data);
                }
                else {
                    setCurrentActiveModelInfo(null);
                }
            }
        })
    }

    const [currentActiveModelInfo, setCurrentActiveModelInfo] = useState(null);
    useEffect(getCurrentActiveModelInfo, [modelList]);

    const ButtonActiveModelClicked = (e) => {

        let model_id = e.currentTarget.value;
        let endpoint = "http://127.0.0.1:8000/api/module_activation/";
        let method = "POST";
        callAPI({
            method: method,
            endpoint: endpoint,
            data: JSON.stringify({
                module_selected: model_id
            }),
            callback: (response) => {
                console.log(response);
                if (response.status === 201) {
                    setCurrentActiveModelInfo(response.data);
                }
            }
        })
    }

    const ButtonRemoveModelClicked = (e) => {
        let model_id = e.currentTarget.value;
        let endpoint = "http://127.0.0.1:8000/api/segmentation_modules/" + model_id;
        let method = "DELETE";

        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: `This action will delete the model with id=${model_id}!`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {

            if (result.isConfirmed) {
                // handle accept button click
                callAPI({
                    method: method,
                    endpoint: endpoint,
                    callback: (response) => {
                        console.log(response);
                        if (response.status === 204) {
                            getModelList();
                            Swal.fire({
                                title: 'Success!',
                                icon: 'success'
                            });
                        }

                        else {
                            Swal.fire(
                                'Failed!',
                                'Something went wrong!',
                                'error'
                            );
                        }
                    }
                })
            }
        });
    }

    const [listResult, setListResult] = useState([]);
    const [currentSelectedId, setCurrentSelectedId] = useState(null);
    const [itemResultText, setItemResultText] = useState({
        teethCount: 0,
        Note: null
    });
    const [imageResultSet, setImageResultSet] = useState(null);

    useEffect(() => {
        callAPI({
            method: "GET",
            endpoint: "http://127.0.0.1:8000/api/predict/private/",
            callback: (response) => {
                setListResult(response.data);
            }
        })
    }, []);

    const handleRemoveItemResult = (item) => {

        callAPI({
            method: "DELETE",
            endpoint: "http://127.0.0.1:8000/api/predict/" + item.id,
            callback: (response) => {
                console.log(response);

                if (response.status === 204) {
                    setListResult(listResult.filter(i => i !== item));
                    if (currentSelectedId === item.instance_id) {
                        // Can reset UI if needed 
                    }
                }
                else {
                    toast.error("Something wrong!");
                }
            }
        });
    }

    const [imageViewer, setImageViewer] = useState({
        isShow: false,
        data: [],
        selected: null
    });

    const showImageViewer = (result, idx = 0) => {
        setImageViewer({
            isShow: true,
            data: [...result.map(item => ({ url: item.image, title: item.title }))],
            selected: idx
        });
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        axios.defaults.headers.common['Authorization'] = "";
        localStorage.clear();
        const cookie = new Cookies();
        cookie.remove('_to');
        dispatch(deleteUser())
        navigate('/login');
    }

    return (
        <>
            {
                imageViewer.isShow &&
                <ImageViewer images={imageViewer.data} initSelected={imageViewer.selected} onBlur={() => {
                    setImageViewer({
                        ...imageViewer,
                        isShow: false
                    });
                }} />
            }
            <div className="expert">

                {isCreate && (
                    <div className="pop-up-flat" id="a" onClick={(e) => {
                        if (e.currentTarget.id === e.target.id) setIsCreate(false);
                    }}>
                        <CreateModelForm handleCreateSuccess={(data) => {
                            setModelList([data, ...modelList]);
                            setIsCreate(false);
                        }} />
                    </div>
                )}
                <div className="container-fluid">
                    <div className="py-4 border-bottom">
                        <h1 className="text-primary text-center">Mechine Learning Model Management</h1>
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="d-flex flex-column px-2 pt-4">
                                <div className="d-flex justify-content-between">
                                    <h3 className="pb-2">List of models uploaded</h3>
                                    <div className="my-4 text-end">
                                        <button className="btn btn-primary"
                                            onClick={(e) => setIsCreate(true)}
                                        >
                                            Create New
                                        </button>
                                    </div>
                                </div>


                                <table className="text-center table rounded rounded-3 overflow-hidden">
                                    <thead className="bg-primary">
                                        <tr>
                                            <th>ID</th>
                                            <th>Model Name</th>
                                            <th>Acc</th>
                                            <th>Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            modelList.map(item => (
                                                <tr key={item.id} className={item.id === currentActiveModelInfo?.module_selected ? "bg-light" : null}>
                                                    <td>{item.id}</td>
                                                    <td>{item.module_name}</td>
                                                    <td>{item.accuracy}</td>
                                                    <td>
                                                        <button className="mx-2 btn btn-danger" value={item.id} onClick={ButtonRemoveModelClicked}>
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                        <button className="mx-2 btn btn-primary" value={item.id} onClick={ButtonActiveModelClicked}>
                                                            Active
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <hr />
                                <h3 className="pb-2">Current model selected information</h3>
                                {
                                    currentActiveModelInfo && (
                                        <div className="card card-info">
                                            <div className="card-header">
                                                <h4 className="text-center">{currentActiveModelInfo.module_selected_name}</h4>
                                            </div>
                                            <div className="card-body">
                                                <p>
                                                    <b>Module Id:</b>
                                                    <span className="mx-2">{currentActiveModelInfo.module_selected}</span>
                                                </p>
                                                <p>
                                                    <b>Module Name:</b>
                                                    <span className="mx-2">{currentActiveModelInfo.module_selected_name}</span>
                                                </p>
                                                <p>
                                                    <b>Module Accuracy:</b>
                                                    <span className="mx-2">{currentActiveModelInfo.segmentation_module.accuracy}%</span>
                                                </p>
                                                <p>
                                                    <b>Last Active At:</b>
                                                    <span className="mx-2">{new Date(currentActiveModelInfo.created).toLocaleString()}</span>
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="d-flex flex-column pt-4">
                                <h3 className="pb-2">Test and View Result</h3>
                                <hr />
                                <div className="row">
                                    <div className="col-md-6">
                                        <SegmentationRequestForm
                                            setPreviewUrl={setPreviewUrl}
                                            setResultSuccess={(item) => {
                                                setCurrentSelectedId(item.instance_id);
                                                setListResult([item, ...listResult]);
                                                setImageResultSet(item.prediction_result_set[0].image_result_set);
                                                setItemResultText({
                                                    teethCount: item.prediction_result_set[0].teeth_count,
                                                    Note: item.purpose
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="border rounded shadow p-2">
                                            <img className="img-fill" src={previewURL || "https://fakeimg.pl/350x200/?text=Put X-Ray Image&font=lobster"}
                                                alt="preview" />
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div className="row pt-4">
                                <div className="col-md-6">
                                    <h3 className="pb-4">View Result</h3>
                                    <hr />
                                    <i>Teeth Count: {itemResultText.teethCount}</i>
                                    {
                                        itemResultText.Note &&
                                        <p>Note: {itemResultText.Note}</p>
                                    }
                                    <hr />
                                    <ListRequestResult
                                        setShowResult={(item) => {
                                            setImageResultSet(item.prediction_result_set[0]?.image_result_set);
                                            setItemResultText({
                                                teethCount: item.prediction_result_set[0]?.teeth_count,
                                                Note: item.purpose
                                            });
                                            setCurrentSelectedId(item.instance_id);
                                        }}
                                        listResult={listResult}
                                        currentSelectedId={currentSelectedId}
                                        handleRemoveItem={handleRemoveItemResult}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <div className="border rounded shadow p-2">
                                        <div className="d-flex flex-column gap-2">
                                            {
                                                imageResultSet ?
                                                    imageResultSet.map((item, index) => (
                                                        <img key={index} className="img-fill" src={item.image.startsWith("http") ? item.image : "http://127.0.0.1:8000" + item.image}
                                                            alt={item.title} onClick={() => showImageViewer(imageResultSet, index)} />
                                                    )) :
                                                    <img className="img-fill" src="https://fakeimg.pl/350x200/?text=Result&font=lobster" alt="example" />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Expert;