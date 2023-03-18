import { useRef } from "react";
import { getContactStates } from "../../../services/admin/contact/apiContact";


function ContactFilter({ filterData, setFilterData }) {

    const contactStateOptions = getContactStates();
    
    const handleStateChange = (e) => {
        const selectValue = Number.parseInt(e.target.value);
        setFilterData({
            ...filterData,
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
                    />
                    <button className="btn btn-primary" onClick={(e) => {
                        console.log(searchControl.current.value);
                        setFilterData({
                            ...filterData,
                            keyword: searchControl.current.value,
                        });
                    }}>
                        Search
                    </button>
                    <button className="btn btn-danger" onClick={(e) => {
                        searchControl.current.value = null;
                        setFilterData({
                            ...filterData,
                            keyword: null,
                        });
                    }}>
                        Clear
                    </button>
                </div>
                <div className="col-lg-2 form-group d-flex align-items-center justify-content-between gap-2">
                    <select className="form-select" id="filter-contact-state" onChange={handleStateChange} defaultValue={filterData.state} ref={selectStates}>
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
                    <button className="btn btn-success" onClick={(e) => {
                        selectStates.current.value = -1;
                        setFilterData({
                            ...filterData,
                            state: null,
                        });
                    }}>All</button>
                </div>
                <div className="col-lg-5 form-group d-flex align-items-center justify-content-between gap-2">
                <label htmlFor="filter-contact-from">From:</label>
                    <input 
                        className="form-control"
                        type="date" 
                        id="filter-contact-from" 
                        defaultValue={filterData.from} 
                        onChange={(e) => {
                            setFilterData({
                                ...filterData,
                                from: e.target.value
                            });
                        }}
                    />
                    <button className="btn btn-success" onClick={(e) => {
                        setFilterData({
                            ...filterData,
                            from: new Date().toISOString().slice(0, 10)
                        });
                    }}>Today</button>
                </div>
                <div className="col-lg-5 form-group d-flex align-items-center justify-content-between gap-2">
                <label htmlFor="filter-contact-to">To:</label>
                    <input 
                        className="form-control"
                        type="date" 
                        id="filter-contact-to" 
                        defaultValue={filterData.to}
                        onChange={(e) => {
                            setFilterData({
                                ...filterData,
                                to: e.target.value
                            });
                        }}
                    />
                    
                    <button className="btn btn-success" onClick={(e) => {
                        setFilterData({
                            ...filterData,
                            to: new Date().toISOString().slice(0, 10)
                        });
                    }}>Today</button>
                </div>
            </div>
        </>
    );
}

export default ContactFilter;