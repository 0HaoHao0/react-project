import { Route, Routes } from "react-router-dom";
import Header from "../components/public/Header";
import Footer from "../components/public/Footer";
import Profile from "../view/authentication/Profile";
import Appointment from "../view/user/Appointment";
import Booking from "../view/user/Booking";
import Chat from "../view/user/Chat";
import AppointmentDetail from "../view/user/AppointmentDetail";

function UserRouter() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/booking" element={<Booking />}></Route>
                <Route path="/appointment" element={<Appointment />}></Route>
                <Route path="/appointmentdetail" element={<AppointmentDetail />}></Route>
                <Route path="/chat" element={<Chat />}></Route>
            </Routes>
            <Footer />
        </div>
    );
}

export default UserRouter;