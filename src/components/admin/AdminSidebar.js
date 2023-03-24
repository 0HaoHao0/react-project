import {
  Sidebar, Menu, MenuItem, SubMenu, useProSidebar

} from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import './AdminSidebar.scss'
import Cookies from "universal-cookie/cjs/Cookies";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/features/userSlide';

function AdminSidebar() {
  const nagivate = useNavigate();

  const { collapseSidebar, collapsed } = useProSidebar();

  const dispatch = useDispatch();

  const handleLogout = () => {
    axios.defaults.headers.common['Authorization'] = "";
    localStorage.clear();
    const cookie = new Cookies();
    cookie.remove('_to');
    dispatch(deleteUser())
    nagivate('/login');
  }

  return (<>


    <div className="admin-sidebar vh-100" >

      <Sidebar transitionDuration={0} className='style h-100 text-white'
        rootStyles={{
          backgroundColor:
            '#EAE7B1',
        }}>
        <Menu menuItemStyles={{
          button: ({ level, active, disabled }) => {
            return {


              '&:hover': {
                backgroundColor: '#1C6758',
                fontWeight: 'bold'

              },
            }
          }
        }}>
          <MenuItem icon={<i className="fa-solid fa-gear" />}>Admin Management</MenuItem>
          <div className='btn-collapse btn btn-dark btn-sm' onClick={() => collapseSidebar()}><i className='bx bx-left-arrow-alt bx-spin' ></i></div>
        </Menu>

        <Menu style={{ height: '79vh' }} className='overflow-auto styleScroll' menuItemStyles={{
          button: ({ level, active, disabled }) => {

            return {
              backgroundColor: active ?
                '#1C6758'
                :
                '#7AA874',

              fontWeight: active ? 'bold' : null,
              '&:hover': {
                backgroundColor: '#1C6758',
                fontWeight: 'bold'
              },
            }
          },
          icon: () => {
            return {
              backgroundColor: '#40513B',
            }
          }

        }}>
          {!collapsed && <div className='w-100 text-center'>
            <span>Main funtion</span>
          </div>
          }

          <SubMenu active={window.location.pathname.includes("/admin/user")} label="User" icon={<i className="fa-solid fa-user"></i>} >
            <MenuItem component={<Link to={'/admin/user'}></Link>}> Get All </MenuItem>
          </SubMenu>

          <SubMenu active={window.location.pathname.includes("/admin/patient")} label="Patient" icon={<i className="fa-solid fa-hospital-user"></i>} >
            <MenuItem component={<Link to={'/admin/patient'}></Link>}> Get All </MenuItem>
          </SubMenu>
          <SubMenu active={window.location.pathname.includes("/admin/doctor")} label="Doctor" icon={<i className="fa-solid fa-user-doctor"></i>} >
            <MenuItem component={<Link to={'/admin/doctor'}></Link>}> Get All </MenuItem>
            <MenuItem component={<Link to={'/admin/doctor/create'}></Link>}>Create </MenuItem>
          </SubMenu>
          {!collapsed && <div className='w-100 text-center'>
            <span>Extra funtion</span>
          </div>
          }
          <SubMenu active={window.location.pathname.includes("/admin/appointment")} label="Appointment" icon={<i className="fa-solid fa-calendar-check"></i>} >
            <MenuItem component={<Link to={'/admin/appointment'}></Link>}> Get All </MenuItem>
          </SubMenu>
          <SubMenu active={window.location.pathname.includes("/admin/service")} label="Service" icon={<i className="fa-solid fa-syringe"></i>} >
            <MenuItem component={<Link to={'/admin/service'}></Link>}> Get All </MenuItem>
            <MenuItem component={<Link to={'/admin/service/create'}></Link>}>Create </MenuItem>
          </SubMenu>
          <SubMenu active={window.location.pathname.includes("/admin/device")} label="Device" icon={<i className="fa-solid fa-toolbox"></i>} >
            <MenuItem component={<Link to={'/admin/device'}></Link>}> Get All </MenuItem>
            <MenuItem component={<Link to={'/admin/device/create'}></Link>}>Create </MenuItem>
          </SubMenu>
          <SubMenu active={window.location.pathname.includes("/admin/room")} label="Room" icon={<i className="fa-solid fa-door-open"></i>} >
            <MenuItem component={<Link to={'/admin/room'}></Link>}> Get All </MenuItem>
            <MenuItem component={<Link to={'/admin/room/create'}></Link>}>Create </MenuItem>
          </SubMenu>
          <SubMenu active={window.location.pathname.includes("/admin/news")} label="News" icon={<i className="fa-solid fa-newspaper"></i>} >
            <MenuItem component={<Link to={'/admin/news'}></Link>}> Get All </MenuItem>
            <MenuItem component={<Link to={'/admin/news/create'}></Link>}>Create </MenuItem>
          </SubMenu>
          <SubMenu active={window.location.pathname.includes("/admin/contact")} label="Contact" icon={<i className="fa-solid fa-comment"></i>} >
            <MenuItem component={<Link to={'/admin/contact'}></Link>}> Get All </MenuItem>
          </SubMenu>
        </Menu>



        {/* Footer */}
        <Menu menuItemStyles={{
          button: ({ level, active, disabled }) => {
            return {
              '&:hover': {
                backgroundColor: '#1C6758',
                fontWeight: 'bold'
              },
            }
          }


        }}>

          <MenuItem icon={<i className='bx bx-info-circle' ></i>} component={<Link to={'/profile'}></Link>}>
            Profile
          </MenuItem>


          <MenuItem icon={<i className='bx bxs-log-out'></i>} onClick={() => { handleLogout() }}
            rootStyles={{
              [`.ps-menu-button:hover`]: {
                backgroundColor: "red !important ",
                color: "white",
                fontWeight: "bold ",


              },
            }}>
            Log Out
          </MenuItem>
        </Menu>
      </Sidebar >
    </div >
  </>);
}

export default AdminSidebar;