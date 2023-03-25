import { useState } from "react";
import Swal from "sweetalert2";
import { callAPI } from "../../services/expert/apiExpert";

function SegmentationRequestForm({setPreviewUrl, setResultSuccess = (item) => {}}) {

    const [image, setImage] = useState(null);
    const [note, setNote] = useState("");

    const handleFileSelected = (e) => {

        let file = e.target.files[0];

        if (file && file.type.startsWith('image/')) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        } 
        else {
            setImage(null);
            setPreviewUrl(null);
        }

    }

    const handleSubmitForm = (e) => {

        e.preventDefault();
        let formData = new FormData();
        formData.append("input_image", image);
        formData.append("purpose", note);
        formData.append("is_private", true);

        Swal.showLoading();
        callAPI({
            method: "POST",
            endpoint: "http://127.0.0.1:8000/api/predict/",
            formData: true,
            data: formData,
            callback: (response) => {
                console.log(response);
                if(response.status === 201) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!"
                    })
                    .then(() => {
                        setResultSuccess(response.data);
                    });
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Failed!",
                        text: response.data.message || "Something went wrong"
                    });
                }
            }
        })
    }

    return (
        <>
            <form method="post" encType="mutipart/formdata" onSubmit={handleSubmitForm} className="d-flex flex-column gap-1 p-4 border rounded shadow mx-auto">
                <h5 className="mb-2">Choose an image to test system</h5>
                <div className="mb-2">
                    <input type="file" className="form-control" placeholder="Choose a x-ray image" onChange={handleFileSelected}/>
                </div>
                <div className="mb-2">
                    <input type="text" className="form-control" placeholder="Note..." onChange={(e) => setNote(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </form>
        </>
    )
}

export default SegmentationRequestForm;