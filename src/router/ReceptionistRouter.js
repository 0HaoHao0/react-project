import { Route, Routes } from "react-router-dom";
import ReceptionistSidebar from "../components/receptionist/ReceptionistSidebar";
import ReceptionistContact from "../view/receptionist/contact/ReceptionistContact";
import ReceptionistContactDetail from "../view/receptionist/contact/ReceptionistContactDetail";
import ReceptionistNews from "../view/receptionist/news/ReceptionistNews";
import ReceptionistNewsCreate from "../view/receptionist/news/ReceptionistNewsCreate";
import ReceptionistNewsDetail from "../view/receptionist/news/ReceptionistNewsDetail";
import ReceptionistNewsUpdate from "../view/receptionist/news/ReceptionistNewsUpdate";
import ReceptionistPatient from "../view/receptionist/patient/ReceptionistPatient";

function ReceptionistRouter() {
    return (
        <div className="row g-0 flex-nowrap px-2">
            <div className="col-auto" >
                <ReceptionistSidebar />
            </div>
            <div className="col ">
                <div className="vh-100 overflow-auto p-2 border-top border-end border-bottom ">
                    <Routes>
                        {/* News */}
                        <Route path="/news" element={<ReceptionistNews />}></Route>
                        <Route path="/news/create" element={<ReceptionistNewsCreate />}></Route>
                        <Route path="/news/detail" element={<ReceptionistNewsDetail />}></Route>
                        <Route path="/news/update" element={<ReceptionistNewsUpdate />}></Route>
                        {/* Contact */}
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