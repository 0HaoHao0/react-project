import { Route, Routes } from "react-router";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import ContactDetail from "../view/admin/contact/ContactDetail";
import ContactGetAll from "../view/admin/contact/ContactGetAll";
import PatientGetAll from "../view/admin/patient/PatientGetAll";
import PatientGetInfo from "../view/admin/patient/PatientGetInfo";
import UserDetail from "../view/admin/user/UserDetail";
import UserGetAll from "../view/admin/user/UserGetAll";

function AdminRouter() {
  return (
    <>
      <body className="hold-transition sidebar-mini">
        <div className="wrapper">
          <AdminHeader />

          <AdminSidebar />

          <div className="content-wrapper p-4">
            <Routes>
              {/* User */}
              <Route path="/user" element={<UserGetAll />}></Route>
              <Route path="/user/detail" element={<UserDetail />}></Route>

              {/* Patient */}
              <Route path="/patient" element={<PatientGetAll />}></Route>
              <Route path="/patient/info" element={<PatientGetInfo />}></Route>

              {/* Contact */}
              <Route path="/contact" element={<ContactGetAll />}></Route>
              <Route path="/contact/detail" element={<ContactDetail />}></Route>
            </Routes>
          </div>
        </div>
      </body>
    </>
  );
}

export default AdminRouter;
