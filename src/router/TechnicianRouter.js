import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Technician from "../view/technician/Technician";
import TechnicianAppointmentDetails from "../view/technician/TechnicianAppointmentDetails";

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

function TechnicianRouter() {

    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 200) {
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            <Routes>
                <Route path="/*" element={ <Technician/> }></Route>
                <Route path="/detail_views/:id" element={ <TechnicianAppointmentDetails/> }></Route>
            </Routes>
            {showScroll && (
                <button className="btn btn-danger scroll-to-top" onClick={scrollToTop}>
                    <i className="fa-solid fa-arrow-up"></i>
                </button>
            )}
        </div>
    );
}

export default TechnicianRouter;