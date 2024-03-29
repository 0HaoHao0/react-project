import { useRef } from "react";
import { getContactStates } from "../../../services/admin/contact/apiContact";


function ContactFilter({ filter, setFilter }) {

    const contactStateOptions = getContactStates();

    const handleStateChange = (e) => {
        const selectValue = Number.parseInt(e.target.value);
        setFilter({
            ...filter,
            state: selectValue < 0 ? null : selectValue,
        });
    }

    const selectStates = useRef(null);
    const searchControl = useRef(null);

    return (
        <>
            <div className="row">
                <div className="col-12 form-group d-flex align-items-center gap-2">
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Search by id, name, phone..."
                        ref={searchControl}
                        onKeyDown={(e) => {
                            if(e.key === "Enter") {
                                setFilter({
                                    ...filter,
                                    keyword: searchControl.current.value,
                                });
                            }
                        }}
                    />
                    
                    <button className="btn btn-danger" onClick={(e) => {
                        searchControl.current.value = null;
                        setFilter({
                            ...filter,
                            keyword: null,
                        });
                    }}>
                        Clear
                    </button>
                </div>
                <div className="col-lg-2 form-group d-flex align-items-center justify-content-between gap-2 my-2">
                    <select className="form-select" id="filter-contact-state" onChange={handleStateChange} defaultValue={filter.state} ref={selectStates}>
                        <option value={-1}>- Select State -</option>
                        {
                            contactStateOptions.map((state, index) => (
                                <option
                                    key={index}
                                    value={state.id}
                                >
                                    {state.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-lg-5 form-group d-flex align-items-center justify-content-between gap-2">
                    <label htmlFor="filter-contact-from">From:</label>
                    <input
                        className="form-control"
                        type="date"
                        id="filter-contact-from"
                        defaultValue={filter.from}
                        onChange={(e) => {
                            setFilter({
                                ...filter,
                                from: e.target.value
                            });
                        }}
                    />
                </div>
                <div className="col-lg-5 form-group d-flex align-items-center justify-content-between gap-2">
                    <label htmlFor="filter-contact-to">To:</label>
                    <input
                        className="form-control"
                        type="date"
                        id="filter-contact-to"
                        defaultValue={filter.to}
                        onChange={(e) => {
                            setFilter({
                                ...filter,
                                to: e.target.value
                            });
                        }}
                    />
                </div>
            </div>
        </>
    );
}

export default ContactFilter;