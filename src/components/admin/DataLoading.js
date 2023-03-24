import './DataLoading.scss'

function DataLoading() {
    return (
        <>
            <div className="data-loading row g-0    my-5">
                <div className='col-12  d-flex align-items-center justify-content-center'>
                    <h2>We are creating datatable ...</h2><span className=" mx-2     loader "></span>
                </div>
            </div>
        </>
    );
}

export default DataLoading;