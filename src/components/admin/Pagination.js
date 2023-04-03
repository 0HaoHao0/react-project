function Pagiation(props) {
    return (
        <>
            <nav aria-label="Page navigation ">
                <ul className="pagination justify-content-end">
                    <li
                        className={props.page === 1 ? "page-item disabled" : "page-item"}
                        onClick={props.page > 1 ? () => { props.previousPage() } : undefined}
                    >
                        <div className="page-link btn" tabIndex="-1" aria-disabled="true">Previous</div>
                    </li>
                    <input
                        onKeyDown={(e) => props.enterPage(e)}
                        style={{ width: "100px" }} min={props.page} max={props.total_pages} className="border text-center " placeholder={props.page + '/' + props.total_pages} />
                    <li
                        className={props.page >= props.total_pages ? "page-item disabled" : "page-item"}
                        onClick={props.page >= props.total_pages ? undefined : () => { props.nextPage() }}
                    >
                        <div className="page-link btn " >Next</div>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Pagiation;