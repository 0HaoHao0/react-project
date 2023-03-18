import { Routes } from "react-router-dom";
import DoctorSidebar from "../components/doctor/DoctorSidebar";

function DoctorRouter() {
    return (
        <div className="row g-0 p-2">
            <div className="col-auto" >
                <DoctorSidebar />
            </div>
            <div className="col">
                <div className="h-100 overflow-auto p-2 border-top border-end border-bottom ">

                </div>
            </div>
        </div>
    );
}

export default DoctorRouter;