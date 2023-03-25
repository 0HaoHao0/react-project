import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteImageSegmentationResultAPI, getImageSegmentationResultAPIs } from "../../services/technician/apiTechnician";
import { ImageViewer } from "../extensions/ImageViewer";

export function ImageSegmentationResults({ appointmentId, showLoading, completeFn = () => { }}) {

    const [segmentResults, setSegmentResults] = useState([]);

    useEffect(() => {

        console.log("loading results...");
        if(showLoading) {
            Swal.fire({
                icon: "info",
                title: "Waiting for response..."
            });
            Swal.showLoading();
        }

        getImageSegmentationResultAPIs({
            params: {
                appointmentId: appointmentId
            },
            callback: (res) => {

                if(res.status === 200) {
                    setSegmentResults(res.data);
                }
                else if(res.status < 500) {
                    toast.error(res.data);
                }
                else {
                    toast.error("The system is busy!");
                }

                if(showLoading) Swal.close();
                completeFn();
            }
        });

    }, [appointmentId, showLoading]);

    const removeImageSegmentationResult = async (resultId) => {
        
        console.log(resultId);
        let isConfirmed = true;
        await Swal.fire({
            icon: "warning",
            title: "This action will delete this result!",
            showCancelButton: true,
            showConfirmButton: true
        })
        .then(res => {
            isConfirmed = res.isConfirmed;
        });
        
        if(!isConfirmed) return;

        Swal.fire({
            icon: "info",
            title: "Waiting for response..."
        });
        Swal.showLoading();
        deleteImageSegmentationResultAPI({
            resultId: resultId,
            callback: (res) => {
                if(res.status === 200) {

                    let removedList = segmentResults.filter(x => x.id !== resultId);
                    console.log(removedList);
                    setSegmentResults(removedList);
                }
                else if(res.status < 500) {
                    toast.error(res.data);
                }
                else {
                    toast.error("The system is busy!");
                }
                Swal.close();
            }
        });
    }

    const [imageViewer, setImageViewer] = useState({
        isShow: false,
        data: [],
        selected: null
    });

    const showImageViewer = (result, idx=0) => {
        setImageViewer({
            isShow: true,
            data: [({ url: result.inputImageURL, title: "input_image"}), ...result.imageResultSet.map(image => ({ url: image.imageURL, title: image.title }))],
            selected: idx
        });
    }

    return (
        <>
            {
                imageViewer.isShow && <ImageViewer images={imageViewer.data} initSelected={imageViewer.selected} onBlur={() => {
                    setImageViewer({
                        ...imageViewer,
                        isShow: false,
                    });
                }}/>
            }
            {
                (segmentResults.length > 0) && 
                <div className="card my-3">
                    <div className="card-header bg-light">
                        <h4>Segmentation Results</h4>
                    </div>
                    <div className="card-body">
                        {segmentResults.map((result) => (
                            <div key={result.id} className="my-3">
                                <h5>Image {result.id}</h5>
                                <p><strong>Model Name:</strong> {result.modelName}</p>
                                <p><strong>Teeth Count:</strong> {result.teethCount}</p>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <h6>Input_image</h6>
                                        <img src={result.inputImageURL} alt="input_image" className="img-fluid" onClick={() => showImageViewer(result, 0)} />
                                    </div>
                                    {result.imageResultSet.map((image, idx) => (
                                        <div key={image.id} className="col-md-6">
                                            <h6>{image.title}</h6>
                                            <img src={image.imageURL} alt={image.title} className="img-fluid" onClick={() => showImageViewer(result, idx + 1)} />
                                        </div>
                                    ))}
                                </div>
                                <button className="btn btn-danger w-100" onClick={(e) => removeImageSegmentationResult(result.id)}>
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                </button>
                                <hr />
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    );
}

export default ImageSegmentationResults;