import { useEffect, useState } from "react";
import { getImageSegmentationResultAPIs } from "../../services/technician/apiTechnician";



export function ImageSegmentationResults({ appointmentId }) {

    const [segmentResults, setSegmentResults] = useState([]);

    useEffect(() => {

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
            }
        });

    }, [appointmentId]);

    const removeImageSegmentationResult = (resultId) => {
        
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
                                <button className="btn btn-danger" onClick={() => removeImageSegmentationResult(result.id)}>Remove</button>
                                <div className="row">
                                    {result.imageResultSet.map((image) => (
                                        <div key={image.id} className="col-md-4">
                                            <h6>{image.title}</h6>
                                            <img src={image.imageURL} alt={image.title} className="img-fluid" />
                                        </div>
                                    ))}
                                </div>
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