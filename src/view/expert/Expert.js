import { useEffect, useState } from "react";
import { callAPI } from "../../services/expert/apiExpert";
import CreateModelForm from "./CreateModelForm";
import SegmentationRequestForm from "./SegmentationRequestForm";


function Expert() {

    const [isCreate, setIsCreate] = useState(false);
    const [modelList, setModelList] = useState([]);

    useEffect(() => {

        let endpoint = "http://127.0.0.1:8000/api/segmentation_modules/";
        let method = "GET";

        callAPI({
            method: method,
            endpoint: endpoint,
            callback: (response) => {
                
                console.log(response);
                if(response.status === 200) {
                    setModelList(response.data);
                }

            }
        })


    }, []);

    const getCurrentActiveModelInfo = () => {

        let endpoint = "http://127.0.0.1:8000/api/module_activation/current/";
        let method = "GET";

        callAPI({
            method: method,
            endpoint: endpoint,
            callback: (response) => {
                console.log(response);
                if(response.status === 200) {
                    setCurrentActiveModelInfo(response.data);
                }

            }
        })
    }

    const [currentActiveModelInfo, setCurrentActiveModelInfo] = useState(null);
    useEffect(getCurrentActiveModelInfo, []);

    const ButtonActiveModelClicked = (e) => {
        
        let model_id = e.target.value;
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
                if(response.status === 201) {
                    setCurrentActiveModelInfo(response.data);
                }
            }
        })

    }

    
    return (
        <>
            {isCreate && (
                <div className="pop-up-flat" id="a" onClick={(e) => {
                    if(e.currentTarget.id === e.target.id) setIsCreate(false);
                }}>
                    <CreateModelForm/>
                </div>
            )}
            <div className="container-fluid">
                <div className="py-4 border-bottom">
                    <h1 className="text-primary text-center">Mechine Learning Model Management</h1>
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
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.module_name}</td>
                                                <td>{item.accuracy}</td>
                                                <td>
                                                    <button className="mx-2 btn btn-danger" value={item.id}>
                                                        Remove
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
                        <div className="d-flex flex-column px-2 pt-4">
                            <h3 className="pb-2">Test and View Result</h3>
                            <hr />
                            <div className="row">
                                <div className="col-md-6">
                                    <SegmentationRequestForm/>
                                </div>
                                <div className="col-md-6">
                                    <div className="border rounded shadow p-4">
                                        <img className="img-fill" src="https://images.unsplash.com/photo-1677857387640-d26016fa8eb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8SnBnNktpZGwtSGt8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" 
                                        alt="example" />
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h3 className="pb-4">View Result</h3>
                                <hr />
                                <i>Teeth Count: 30</i>
                            </div>
                            <div className="col-md-6">
                                <div className="border rounded shadow p-4">
                                    <div className="d-flex flex-column gap-2">
                                    <img className="img-fill" src="https://images.unsplash.com/photo-1677946685419-97c0d55ec3f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8SnBnNktpZGwtSGt8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" 
                                    alt="example" />
                                    <img className="img-fill" src="https://images.unsplash.com/photo-1678028205711-6333094a89ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8SnBnNktpZGwtSGt8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" 
                                    alt="example" />
                                    <img className="img-fill" src="https://images.unsplash.com/photo-1677770248074-fada4811bd84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fEpwZzZLaWRsLUhrfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" 
                                    alt="example-" />
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