import { Routes, Route } from "react-router-dom";
import Technician from "../view/technician/Technician";

function TechnicianRouter() {
    return (
        <div>
            <Routes>
                <Route path="/*" element={ <Technician/> }></Route>
            </Routes>
        </div>
    );
}

export default TechnicianRouter;