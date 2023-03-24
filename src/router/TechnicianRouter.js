import { Routes, Route } from "react-router-dom";
import Technician from "../view/technician/Technician";
import TechnicianAppointmentDetails from "../view/technician/TechnicianAppointmentDetails";

function TechnicianRouter() {
    return (
        <div>
            <Routes>
                <Route path="/*" element={ <Technician/> }></Route>
                <Route path="/detail_views/:id" element={ <TechnicianAppointmentDetails/> }></Route>
            </Routes>
        </div>
    );
}

export default TechnicianRouter;