import { Route, Routes } from "react-router";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import ContactDetail from "../view/admin/contact/ContactDetail";
import ContactGetAll from "../view/admin/contact/ContactGetAll";
import DeviceCreate from "../view/admin/device/DeviceCreate";
import DeviceDetail from "../view/admin/device/DeviceDetail";
import DeviceGetAll from "../view/admin/device/DeviceGetAll";
import DeviceUpdate from "../view/admin/device/DeviceUpdate";
import DoctorCreate from "../view/admin/doctor/DoctorCreate";
import DoctorDetail from "../view/admin/doctor/DoctorDetail";
import DoctorGetAll from "../view/admin/doctor/DoctorGetAll";
import PatientGetAll from "../view/admin/patient/PatientGetAll";
import PatientGetInfo from "../view/admin/patient/PatientGetInfo";
import RoomCreate from "../view/admin/room/RoomCreate";
import RoomDetail from "../view/admin/room/RoomDetail";
import RoomGetAll from "../view/admin/room/RoomGetAll";
import RoomUpdate from "../view/admin/room/RoomUpdate";
import ServiceCreate from "../view/admin/service/ServiceCreate";
import ServiceDetail from "../view/admin/service/ServiceDetail";
import ServiceGetAll from "../view/admin/service/ServiceGetAll";
import ServiceUpdate from "../view/admin/service/ServiceUpdate";
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
              <Route path="/doctor/create" element={<DoctorCreate />}></Route>
              <Route path="/doctor/detail" element={<DoctorDetail />}></Route>

              {/* Service */}
              <Route path="/service" element={<ServiceGetAll />}></Route>
              <Route path="/service/create" element={<ServiceCreate />}></Route>
              <Route path="/service/detail" element={<ServiceDetail />}></Route>
              <Route path="/service/update" element={<ServiceUpdate />}></Route>
              {/* Device */}
              <Route path="/device" element={<DeviceGetAll />}></Route>
              <Route path="/device/create" element={<DeviceCreate />}></Route>
              <Route path="/device/detail" element={<DeviceDetail />}></Route>
              <Route path="/device/update" element={<DeviceUpdate />}></Route>
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
