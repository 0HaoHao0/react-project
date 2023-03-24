import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { deleteImageSegmentationResultAPI, getImageSegmentationResultAPIs } from "../../services/technician/apiTechnician";



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
                else {
                    console.log(res);
                }

                if(showLoading) Swal.close();
                completeFn();
            }
        });

    }, [appointmentId, showLoading]);

    const removeImageSegmentationResult = (resultId) => {
        
        console.log(resultId);
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
                else {
                    console.log(res);
                }
                Swal.close();
            }
        });
    }

    return (
        <>
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
                                        <img src={result.inputImageURL} alt="input_image" className="img-fluid" />
                                    </div>
                                    {result.imageResultSet.map((image) => (
                                        <div key={image.id} className="col-md-6">
                                            <h6>{image.title}</h6>
                                            <img src={image.imageURL} alt={image.title} className="img-fluid" />
                                        </div>
                                    ))}
                                </div>
                                <button className="btn btn-danger w-100" onClick={(e) => removeImageSegmentationResult(result.id)}>Remove</button>
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