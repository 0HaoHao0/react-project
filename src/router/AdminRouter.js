import { Route, Routes } from "react-router";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import ContactDetail from "../view/admin/contact/ContactDetail";
import ContactGetAll from "../view/admin/contact/ContactGetAll";
import DeviceGetAll from "../view/admin/device/DeviceGetAll";
import DoctorGetAll from "../view/admin/doctor/DoctorGetAll";
import PatientGetAll from "../view/admin/patient/PatientGetAll";
import PatientGetInfo from "../view/admin/patient/PatientGetInfo";
import RoomCreate from "../view/admin/room/RoomCreate";
import RoomDetail from "../view/admin/room/RoomDetail";
import RoomGetAll from "../view/admin/room/RoomGetAll";
import RoomUpdate from "../view/admin/room/RoomUpdate";
import ServiceGetAll from "../view/admin/service/ServiceGetAll";
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

              {/* Doctor */}
              <Route path="/doctor" element={<DoctorGetAll />}></Route>

              {/* Service */}
              <Route path="/service" element={<ServiceGetAll />}></Route>
              {/* Device */}
              <Route path="/device" element={<DeviceGetAll />}></Route>
              {/* Room */}
              <Route path="/room" element={<RoomGetAll />}></Route>
              <Route path="/room/create" element={<RoomCreate />}></Route>
              <Route path="/room/detail" element={<RoomDetail />}></Route>
              <Route path="/room/update" element={<RoomUpdate />}></Route>

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
