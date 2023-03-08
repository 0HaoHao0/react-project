import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import Footer from "../components/public/Footer";
import Header from "../components/public/Header";
import Emailconfirm from "../view/authentication/Emailconfirm";
import Aboutus from "../view/public/Aboutus";
import Contact from "../view/public/Contact";



import Home from "../view/public/Home";
import Service from "../view/user/Service";

function PublicRouter() {

  const user = useSelector((state) => state.user);
  const canConfirmed = user.userInfo && !user.userInfo.emailConfirmed;
  console.log("Can confirmed: ", canConfirmed);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(window.location.href);
    if (canConfirmed && !window.location.href.endsWith("emailconfirm") && user.userInfo.role === "Patient") {
      navigate("/emailconfirm");
    }
  }, [canConfirmed, navigate, user]);


  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<Home />}></Route>
        <Route path="contact" element={<Contact />}></Route>
        <Route path="aboutus" element={<Aboutus />}></Route>
        {
          canConfirmed && (
            <>
              <Route path="emailconfirm" element={<Emailconfirm />}></Route>
            </>
          )
        }
        <Route path='services' element={<Service />}></Route>

      </Routes>
      <Footer />
    </>
  );
}

export default PublicRouter;
