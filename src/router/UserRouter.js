import { Route, Routes, useNavigate } from "react-router-dom";
import Profile from "../view/authentication/Profile";
import Appointment from "../view/user/Appointment";
import Booking from "../view/user/Booking";
import Chat from "../view/user/Chat";
import AppointmentDetail from "../view/user/AppointmentDetail";
import './RouterStyle.scss'

function UserRouter() {
    const navigate = useNavigate()
    return (
        <div>
            <button className="btn btn-danger btn-back" onClick={() => { navigate(-1) }}><i className="fa-solid fa-arrow-left"></i> Back</button>
            <Routes>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/booking" element={<Booking />}></Route>
                <Route path="/appointment" element={<Appointment />}></Route>
                <Route path="/appointmentdetail/:id" element={<AppointmentDetail />}></Route>
                <Route path="/chat" element={<Chat />}></Route>
            </Routes>
        </div>
    );
}

export default UserRouter;