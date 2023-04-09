import { Route, Routes, useNavigate } from "react-router";
import AdminSidebar from "../components/admin/AdminSidebar";
import AppointmentGetAll from "../view/admin/appointment/AppointmentGetAll";
import ContactDetail from "../view/admin/contact/ContactDetail";
import ContactGetAll from "../view/admin/contact/ContactGetAll";
import DeviceCreate from "../view/admin/device/DeviceCreate";
import DeviceDetail from "../view/admin/device/DeviceDetail";
import DeviceGetAll from "../view/admin/device/DeviceGetAll";
import DeviceUpdate from "../view/admin/device/DeviceUpdate";
import DoctorCreate from "../view/admin/doctor/DoctorCreate";
import DoctorDetail from "../view/admin/doctor/DoctorDetail";
import DoctorGetAll from "../view/admin/doctor/DoctorGetAll";
import NewsCreate from "../view/admin/news/NewsCreate";
import NewsDetail from "../view/admin/news/NewsDetail";
import NewsGetAll from "../view/admin/news/NewsGetAll";
import NewsUpdate from "../view/admin/news/NewsUpdate";
import PatientDetail from "../view/admin/patient/PatientDetail";
import PatientGetAll from "../view/admin/patient/PatientGetAll";
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

import { SpeedDial } from "primereact/speeddial";


//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
import AdminAppointmentDetail from "../view/admin/appointment/AdminAppointmentDetail";


function AdminRouter() {
  const navigate = useNavigate()

  const items = [
    {
      label: 'Back',
      icon: 'pi pi-angle-double-left',
      className: 'my-2',
      command: () => {
        navigate(-1)
      }
    },

    {
      label: 'Reload',
      icon: 'pi pi-refresh',
      className: 'my-2',
      command: () => {
        navigate(0)
      }
    },
    {
      label: 'Next',
      icon: 'pi pi-angle-double-right',
      className: 'my-2',
      command: () => {
        navigate(1)
      }
    },

  ];

  return (
    <>
      <div className="row g-0 flex-nowrap px-1">
        <div style={{ position: 'absolute', top: '5px', right: '15px' }}>
          <SpeedDial model={items} direction="down" style={{ top: '0', right: '0' }} buttonClassName="p-button-danger" />
        </div>
        <div className="col-auto" >
          <AdminSidebar />
        </div>
        <div className="col ">
          <div style={{ height: '100vh' }} className=" overflow-auto p-2 border-top border-end border-bottom ">
            <Routes>
              {/* User */}
              <Route path="/user" element={<UserGetAll />}></Route>
              <Route path="/user/detail" element={<UserDetail />}></Route>

              {/* Patient */}
              <Route path="/patient" element={<PatientGetAll />}></Route>
              <Route path="/patient/info" element={<PatientDetail />}></Route>

              {/* Doctor */}
              <Route path="/doctor" element={<DoctorGetAll />}></Route>
              <Route path="/doctor/create" element={<DoctorCreate />}></Route>
              <Route path="/doctor/detail" element={<DoctorDetail />}></Route>
              {/* Appointment */}
              <Route path="/appointment" element={<AppointmentGetAll />}></Route>
              <Route path="/appointment/:id/detail" element={<AdminAppointmentDetail />}></Route>

              {/* Service */}
              <Route path="/service" element={<ServiceGetAll />}></Route>
              <Route path="/service/create" element={<ServiceCreate />}></Route>
              <Route path="/service/detail/:id" element={<ServiceDetail />}></Route>
              <Route path="/service/update" element={<ServiceUpdate />}></Route>
              {/* Device */}
              <Route path="/device" element={<DeviceGetAll />}></Route>
              <Route path="/device/create" element={<DeviceCreate />}></Route>
              <Route path="/device/detail" element={<DeviceDetail />}></Route>
              <Route path="/device/update" element={<DeviceUpdate />}></Route>
              {/* Room */}
              <Route path="/room" element={<RoomGetAll />}></Route>
              <Route path="/room/create" element={<RoomCreate />}></Route>
              <Route path="/room/detail/:id" element={<RoomDetail />}></Route>
              <Route path="/room/update/:id" element={<RoomUpdate />}></Route>
              {/* News */}
              <Route path="/news" element={<NewsGetAll />}></Route>
              <Route path="/news/create" element={<NewsCreate />}></Route>
              <Route path="/news/detail" element={<NewsDetail />}></Route>
              <Route path="/news/update" element={<NewsUpdate />}></Route>
              {/* Contact */}
              <Route path="/contact" element={<ContactGetAll />}></Route>
              <Route path="/contact/detail" element={<ContactDetail />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminRouter;
