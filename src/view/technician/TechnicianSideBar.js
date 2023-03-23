import { useState } from 'react';
import "./Technician.scss";

const formatedSearchText = (text) => {
    return text.trim();
}

export function TechnicianSideBar({ initialValue = {}, handleSubmitFilter = (formData) => { console.log(formData); } }) {

    const [formData, setFormData] = useState({
        searchText: "",
        state: null,
        startDate: initialValue.startDate,
        endDate: initialValue.endDate,
    });

    const handleSearchChange = (e) => {
        setFormData({
            ...formData,
            searchText: formatedSearchText(e.target.value),
        });
    }

    const handleStateChange = (e) => {
        e.preventDefault();
        let value = Number.parseInt(e.target.value);
        setFormData({
            ...formData,
            state: Number.isNaN(value) || value === formData.state ? null : value,
        });
    }

    const handleDateChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        handleSubmitFilter(formData);
    }

    const handleResetForm = (e) => {
        let resetData = {
            searchText: "",
            state: null,
            startDate: null,
            endDate: new Date().toISOString().slice(0, 10),
        };
        setFormData(resetData);
        handleSubmitFilter(resetData);
    }

    return (
        <div className="tech-sidebar">
            <form onSubmit={handleSubmitForm} onReset={handleResetForm} className="form d-flex flex-column">
                <div className="mb-3">
                    <input type="search" className="form-control" placeholder="Search phone or username..." onChange={handleSearchChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Choose state:</label>
                    <div className="d-flex flex-wrap gap-2">
                        <button value={4} onClick={handleStateChange} className={`btn btn-${formData.state !== 4 ? "outline-" : "" }primary flex-grow-1`}>Transfer</button>
                        <button value={6} onClick={handleStateChange} className={`btn btn-${formData.state !== 6 ? "outline-" : "" }warning flex-grow-1`}>Doing</button>
                        <button value={5} onClick={handleStateChange} className={`btn btn-${formData.state !== 5 ? "outline-" : "" }danger flex-grow-1`}>Cancel</button>
                        <button value={7} onClick={handleStateChange} className={`btn btn-${formData.state !== 7 ? "outline-" : "" }success flex-grow-1`}>Complete</button>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="filter-fromdate">Choose from date:</label>
                    <input type="date" defaultValue={formData.startDate} name="startDate" id="filter-fromdate" className="form-control" onChange={handleDateChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="filter-fromdate">Choose end date:</label>
                    <input type="date" defaultValue={formData.endDate} name="endDate" id="filter-fromdate" className="form-control" onChange={handleDateChange} />
                </div>

                <div className="mb-3">
                    <button type="submit" className="btn btn-primary w-100">
                        <i className="fa fa-filter" aria-hidden="true"></i>
                    </button>
                    <button className="mt-2 btn btn-danger w-100" type="reset">Reset</button>
                </div>
            </form>
        </div>
    );
}