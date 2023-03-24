import { Route, Routes } from "react-router-dom";
import ReceptionistSidebar from "../components/receptionist/ReceptionistSidebar";
import ReceptionistContactDetail from "../view/receptionist/ReceptionContactDetail";
import ReceptionistContact from "../view/receptionist/ReceptionistContact";
import ReceptionistNews from "../view/receptionist/ReceptionistNews";
import ReceptionistPatient from "../view/receptionist/ReceptionistPatient";

function ReceptionistRouter() {
    return (
        <div className="row g-0 flex-nowrap p-5">
            <div className="col-auto" >
                <ReceptionistSidebar />
            </div>
            <div className="col ">
                <div className="vh-100 overflow-auto p-2 border-top border-end border-bottom ">
                    <Routes>
                        <Route path="/news" element={<ReceptionistNews />}></Route>
                        <Route path="/contact" element={<ReceptionistContact />}></Route>
                        <Route path="/contact/detail" element={<ReceptionistContactDetail />}></Route>
                        <Route path="/patient" element={<ReceptionistPatient />}></Route>


                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default ReceptionistRouter;