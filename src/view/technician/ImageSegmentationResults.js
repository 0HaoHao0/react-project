import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteImageSegmentationResultAPI, getImageSegmentationResultAPIs } from "../../services/technician/apiTechnician";
import { ImageViewer } from "../../components/public/ImageViewer";

export function ImageSegmentationResults({ appointmentId, showLoading, canDelete = true }) {

    const [segmentResults, setSegmentResults] = useState([]);

    useEffect(() => {

        console.log("loading results...");
        if (showLoading) {
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
                if (res.status === 200) {
                    console.log(res.data);
                    setSegmentResults(res.data);
                }
                else if (res.status < 500) {
                    toast.error(res.data);
                }
                else {
                    toast.error("Something wrong!");
                }
                if (showLoading) Swal.close();
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

        if (!isConfirmed) return;

        Swal.fire({
            icon: "info",
            title: "Waiting for response..."
        });
        Swal.showLoading();
        deleteImageSegmentationResultAPI({
            resultId: resultId,
            callback: (res) => {
                if (res.status === 200) {

                    let removedList = segmentResults.filter(x => x.id !== resultId);
                    console.log(removedList);
                    setSegmentResults(removedList);
                }
                else if (res.status < 500) {
                    toast.error(res.data);
                }
                else {
                    toast.error("Something wrong!");
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

    const showImageViewer = (result, idx = 0) => {

        let originalImage = {
            url: result.inputImageURL,
            title: "original_image"
        }

        setImageViewer({
            isShow: true,
            data: [originalImage, ...result.imageResultSet.map(image => ({ url: image.imageURL, title: image.title }))],
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
                }} />
            }
            {
                (segmentResults.length > 0) &&
                <div className="card mb-3">
                    <div className="card-header bg-light">
                        <h2>Segmentation Results</h2>
                    </div>
                    <div className="card-body">
                        {segmentResults.map((result) => (
                            <div key={result.id} className="my-3">
                                <div className="row">
                                    <h5 className="col-md-6">Result ID: {result.id}</h5>
                                    <p className="col-md-6"><strong>Upload By:</strong> {result.technician}</p>
                                    <p className="col-md-6"><strong>Model Name:</strong> {result.modelName}</p>
                                    <p className="col-md-6"><strong>Teeth Count:</strong> {result.teethCount}</p>
                                    <p className="col-12 text-end py-2 border-bottom">
                                        {
                                            canDelete &&
                                            <button className="btn btn-danger w-100" onClick={(e) => removeImageSegmentationResult(result.id)}>
                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                            </button>
                                        }
                                    </p>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3 col-md-6">
                                        <div className="h-100 d-flex flex-column">
                                            <h6><strong>Type:</strong> original_image</h6>
                                            <div className="mt-auto">
                                                <img src={result.inputImageURL} alt="original_image" className="img-cover" onClick={() => showImageViewer(result, 0)} />
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        result.imageResultSet.map((image, idx) =>
                                            <div key={image.id} className="col-lg-3 col-md-6">
                                                <div className="h-100 d-flex flex-column">
                                                    <h6><strong>Type:</strong> {image.title}</h6>
                                                    <div className="mt-auto">
                                                        <img src={image.imageURL} alt={image.title} className="img-cover" onClick={() => showImageViewer(result, idx + 1)} />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                {
                                    segmentResults.length > 1 ?
                                        <hr />
                                        : null
                                }
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    );
}

export default ImageSegmentationResults;