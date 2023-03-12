import { useState } from "react";
import Swal from "sweetalert2";
import { callAPI } from "../../services/expert/apiExpert";
import "./ExpertStyles.scss"


function CreateModelForm({ handleCreateSuccess = (result) => {} }) {

    const [moduleName, setModuleName] = useState("");
    const [file, setFile] = useState(null);
    const [acc, setAcc] = useState(0);

    const OnChangeModuleName = (e) => {
        setModuleName(e.target.value);
    }

    const OnChangeFile = (e) => {
        setFile(e.target.files[0]);
    }

    const OnChangeAcc = (e) => {
        setAcc(Number.parseFloat(e.target.value));
    }

    const OnCreateFormSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('module_name', moduleName);
        formData.append('h5_file', file);
        formData.append('accuracy', acc);

        console.log(formData);
        Swal.showLoading();
        callAPI({
            method: "POST",
            endpoint: "http://127.0.0.1:8000/api/segmentation_modules/",
            formData: true,
            data: formData,
            callback: (response) => {
                console.log(response);
                if(response.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success'
                    });
                    handleCreateSuccess(response.data);
                }
            }
        })
        
    }

    return (
        <>
            <form action="."
                method="post" 
                className="px-4 pt-5 pb-2 bg-white rounded rounded-3 border border-5 border-dark w-50 h-50"
                encType="multipart" 
                onSubmit={OnCreateFormSubmit}
            >
                <h2 className="text-success text-center">Upload AI Model</h2>
                <hr/>
                <div className="form-group">
                    <input type="text" required className="form-control" placeholder="Enter model name" onChange={OnChangeModuleName} />
                </div>

                <div className="form-group">
                    <input type="file" required className="form-control" placeholder="Choose file h5..." onChange={OnChangeFile} />
                </div>

                <div className="form-group">
                    <input type="number" required className="form-control" placeholder="Model accuracy" onChange={OnChangeAcc} />
                </div>

                <div className="form-group text-end">
                    <button type="reset" className="btn btn-danger mx-2">Clear Data</button>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
                
            </form>
        </>
    );
}

export default CreateModelForm;