import { Route, Routes, useNavigate } from "react-router-dom";
import DoctorSidebar from "../components/doctor/DoctorSidebar";
import DoctorAppointmentDetail from "../view/doctor/DoctorAppointmentDetail";
import DoctorAppointmentHistory from "../view/doctor/DoctorAppointmentHistory";
import DoctorAppointmentQueue from "../view/doctor/DoctorAppointmentQueue";
import { SpeedDial } from "primereact/speeddial";


//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";


function DoctorRouter() {
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
        <div className="row g-0 flex-nowrap   px-1">
            <div style={{ position: 'absolute', bottom: '15px', right: '15px' }}>
                <SpeedDial model={items} direction="up" style={{ bottom: '0', right: '0' }} buttonClassName="p-button-danger" />
            </div>
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