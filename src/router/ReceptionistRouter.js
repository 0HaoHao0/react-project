import { Route, Routes, useNavigate } from "react-router-dom";
import ReceptionistSidebar from "../components/receptionist/ReceptionistSidebar";
import ReceptionistAppointmentDetail from "../view/receptionist/appointment/ReceptionistAppointmentDetail";
import ReceptionistAppointmentHistory from "../view/receptionist/appointment/ReceptionistApppointmentHistory";
import ReceptionistAppointmentQueue from "../view/receptionist/appointment/ReceptionistApppointmentQueue";
import ReceptionistContact from "../view/receptionist/contact/ReceptionistContact";
import ReceptionistContactDetail from "../view/receptionist/contact/ReceptionistContactDetail";
import ReceptionistNews from "../view/receptionist/news/ReceptionistNews";
import ReceptionistNewsCreate from "../view/receptionist/news/ReceptionistNewsCreate";
import ReceptionistNewsDetail from "../view/receptionist/news/ReceptionistNewsDetail";
import ReceptionistNewsUpdate from "../view/receptionist/news/ReceptionistNewsUpdate";
import ReceptionistPatient from "../view/receptionist/patient/ReceptionistPatient";
import ReceptionistChat from "../view/receptionist/chat/ReceptionistChat";
import { SpeedDial } from "primereact/speeddial";


//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";



function ReceptionistRouter() {
    const navigate = useNavigate()

    const items = [
        {
            label: 'Back',
            icon: 'pi pi-angle-double-left',
            className: 'my-2',
            command: () => {
                navigate(-1)
            }
        },

        {
            label: 'Reload',
            icon: 'pi pi-refresh',
            className: 'my-2',
            command: () => {
                navigate(0)
            }
        },
        {
            label: 'Next',
            icon: 'pi pi-angle-double-right',
            className: 'my-2',
            command: () => {
                navigate(1)
            }
        },

    ];

    return (


        <div className="row g-0 flex-nowrap px-2">
            <div style={{ position: 'absolute', bottom: '15px', right: '15px' }}>
                <SpeedDial model={items} direction="up" style={{ bottom: '0', right: '0' }} buttonClassName="p-button-danger" />
            </div>
            <div className="col-auto" >
                <ReceptionistSidebar />
            </div>
            <div className="col ">
                <div className="vh-100 overflow-auto p-2 border-top border-end border-bottom ">
                    <Routes>
                        {/* Chat */}
                        <Route path="/chat" element={<ReceptionistChat />}></Route>
                        {/* Appointment */}
                        <Route path="/appointment-history" element={<ReceptionistAppointmentHistory />}></Route>
                        <Route path="/appointment-detail/:id" element={<ReceptionistAppointmentDetail />}></Route>
                        <Route path="/appointment-queue" element={<ReceptionistAppointmentQueue />}></Route>
                        {/* News */}
                        <Route path="/news" element={<ReceptionistNews />}></Route>
                        <Route path="/news/create" element={<ReceptionistNewsCreate />}></Route>
                        <Route path="/news/detail" element={<ReceptionistNewsDetail />}></Route>
                        <Route path="/news/update" element={<ReceptionistNewsUpdate />}></Route>
                        {/* Contact */}
                        <Route path="/contact" element={<ReceptionistContact />}></Route>
                        <Route path="/contact/detail" element={<ReceptionistContactDetail />}></Route>
                        {/* Patient */}
                        <Route path="/patient" element={<ReceptionistPatient />}></Route>


                    </Routes>
                </div>
            </div>
        </div >
    );
}

export default ReceptionistRouter;