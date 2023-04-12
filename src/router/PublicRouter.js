import { Route, Routes } from "react-router-dom";

import Footer from "../components/public/Footer";
import Header from "../components/public/Header";
import Aboutus from "../view/public/Aboutus";
import Contact from "../view/public/Contact";

import Home from "../view/public/Home";
import News from "../view/public/News";
import Service from "../view/public/Service";
import ServiceInfo from "../view/public/ServiceInfo";

function PublicRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<Home />}></Route>
        <Route path="contact" element={<Contact />}></Route>
        <Route path="aboutus" element={<Aboutus />}></Route>
        <Route path="news" element={<News />}></Route>
        <Route path='services' element={<Service />}></Route>
        <Route path='services/info' element={<ServiceInfo />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default PublicRouter;
