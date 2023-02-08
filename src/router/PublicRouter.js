import { Route, Routes } from "react-router-dom";

import Footer from "../components/public/Footer";
import Header from "../components/public/Header";
import Contact from "../view/public/Contact";

import Home from "../view/public/Home";


function PublicRouter() {
    return (<>
        <Header />
        <Routes>
            <Route path="*" element={<Home />}></Route>
            <Route path="contact" element={<Contact />}></Route>
        </Routes>
        <Footer />
    </>);
}

export default PublicRouter;