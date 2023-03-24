import { Route, Routes } from "react-router-dom";
import DoctorSidebar from "../components/doctor/DoctorSidebar";
import DoctorAppointmentDetail from "../view/doctor/DoctorAppointmentDetail";
import DoctorAppointmentHistory from "../view/doctor/DoctorAppointmentHistory";
import DoctorAppointmentQueue from "../view/doctor/DoctorAppointmentQueue";

function DoctorRouter() {
    return (
        <div className="row g-0 flex-nowrap   px-1">
            <div className="col-auto" >
                <DoctorSidebar />
            </div>
            <div className="col ">
                <div className="vh-100 overflow-auto p-2 border-top border-end border-bottom ">
                    <Routes>
                        <Route path="/appointment-queue" element={<DoctorAppointmentQueue />}></Route>
                        <Route path="/appointment-history" element={<DoctorAppointmentHistory />}></Route>
                        <Route path="/appointment-detail/:id" element={<DoctorAppointmentDetail />}></Route>

                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default DoctorRouter;