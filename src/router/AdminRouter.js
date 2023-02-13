import { Route, Routes } from "react-router";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import PatientGetAll from "../view/admin/patient/PatientGetAll";
import PatientGetinfo from "../view/admin/patient/PatientGetinfo";

function AdminRouter() {
  return (
    <>
      <body className="hold-transition sidebar-mini layout-fixed">
        <div className="wrapper">
          <AdminHeader />

          <AdminSidebar />

          <div className="content-wrapper p-4">
            <Routes>
              <Route path="/patient" element={<PatientGetAll />}></Route>
              <Route path="/patient/info" element={<PatientGetinfo />}></Route>
            </Routes>
          </div>
        </div>
      </body>
    </>
  );
}

export default AdminRouter;
