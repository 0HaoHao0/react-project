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
import { getUserInfo } from "../services/authorization/apILogin";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Pusher from 'pusher-js';


function DoctorRouter() {
    const navigate = useNavigate();

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
            label: 'Next',
            icon: 'pi pi-angle-double-right',
            className: 'my-2',
            command: () => {
                navigate(1)
            }
        },

    ];

    const [bindedPusher, setBindedPusher] = useState(false);

    useEffect(() => {

        // Hàm chạy ngầm ko cần thông báo.
        const fetchUserInfo = async () => {
            let res = await getUserInfo();
            if(res.status === 200) {
                return res.data;
            }
            toast.warning("Cannot enable realtime engine! Press F5 to refresh!");
            return null;
        }

        let pusherChanel = null;

        const bindGlobalHandler = (action, data) => {
            if (action === "AppointmentUpdate") {
                let message = data;
                toast.warning(message);
            }
        }

        const addPusherListener = async () => {
            let userInfo = await fetchUserInfo();
            if(userInfo) {
                
                pusherChanel = userInfo.pusherChannel ? (
                    new Pusher('a5612d1b04f944b457a3', 
                    {
                        cluster: 'ap1',
                        encrypted: true,
                    }).subscribe(userInfo.pusherChannel)) : null;
        
                if (pusherChanel) {
                    pusherChanel.bind_global(bindGlobalHandler);
                    setBindedPusher(true);
                }

            }
        }

        if(!bindedPusher) addPusherListener();

        return () => {
            if (pusherChanel && bindedPusher) {
                pusherChanel.unbind_global(bindGlobalHandler);
                setBindedPusher(false);
            }
        }
    }, [navigate, bindedPusher]);

    return (
        <div className="row g-0 flex-nowrap   px-2">
            <div style={{ position: 'absolute', top: '5px', right: '15px' }}>
                <SpeedDial model={items} direction="down" style={{ top: '0', right: '0', zIndex: '1' }} buttonClassName="p-button-danger" />
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