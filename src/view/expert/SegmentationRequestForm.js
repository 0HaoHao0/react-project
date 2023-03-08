


function SegmentationRequestForm() {

    return (
        <>
            <form method="post" encType="mutipart/formdata" className="d-flex flex-column gap-1 p-4 border rounded shadow mx-auto">
                <h5 className="mb-2">Choose an image to test system</h5>
                <div className="form-group">
                    <input type="file" className="form-control" placeholder="Choose a x-ray image"/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </form>
        </>
    )
}

export default SegmentationRequestForm;