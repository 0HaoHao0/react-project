function Pagiation(props) {
    return (
        <>
            <nav aria-label="Page navigation ">
                <ul className="pagination justify-content-end">
                    <li className="page-item ">
                        <div className="page-link" tabIndex="-1" aria-disabled="true">Previous</div>
                    </li>
                    <input style={{ width: "100px" }} min={props.page} max={props.total_pages} className="border text-center " placeholder={props.page + '/' + props.total_pages} />
                    <li className="page-item">
                        <div className="page-link" >Next</div>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Pagiation;