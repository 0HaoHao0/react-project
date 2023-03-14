import { Route, Routes } from "react-router-dom";
import Appointment from "../view/user/Appointment";
import Booking from "../view/user/Booking";

function UserRouter() {
    return (
        <div>
            <Routes>
                <Route path="/booking" element={<Booking />}></Route>
                <Route path="/appointment" element={<Appointment />}></Route>

            </Routes>
        </div>
    );
}

export default UserRouter;