import { Route, Routes } from "react-router-dom";
import Appointment from "../view/user/Appointment";
import Booking from "../view/user/Booking";
import Chat from "../view/user/Chat";

function UserRouter() {
    return (
        <div>
            <Routes>
                <Route path="/booking" element={<Booking />}></Route>
                <Route path="/appointment" element={<Appointment />}></Route>
                <Route path="/chat" element={<Chat />}></Route>
            </Routes>
        </div>
    );
}

export default UserRouter;