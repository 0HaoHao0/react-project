import { Route, Routes } from "react-router-dom";

import Footer from "../components/public/Footer";
import Header from "../components/public/Header";
import Home from "../view/public/Home";


function PublicRouter() {
    return (<>
        <Header />
        <Routes>
            <Route path="*" element={<Home />}></Route>
        </Routes>
        <Footer />
    </>);
}

export default PublicRouter;