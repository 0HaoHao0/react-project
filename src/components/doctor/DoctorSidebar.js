import {
    Sidebar, Menu, MenuItem, SubMenu, useProSidebar

} from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import './DoctorSidebar.scss'
import Cookies from "universal-cookie/cjs/Cookies";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/features/userSlide';

function DoctorSidebar() {
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
        <div className="doctor-sidebar vh-100">

            <Sidebar transitionDuration={0} className='style h-100 '
                rootStyles={{
                    backgroundColor:
                        '#C9EEFF',

                }}>
                {/* Header */}
                <Menu className='text-center' menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        return {

                            '&:hover': {
                                backgroundColor: '#335B8C',
                                fontWeight: 'bold'

                            },
                        }
                    }
                }}>
                    <MenuItem icon={<i className="fa-solid fa-user-doctor" />}> Doctor Management</MenuItem>
                    <div className='btn-collapse btn btn-dark btn-sm' onClick={() => collapseSidebar()}><i className='bx bx-left-arrow-alt bx-spin' ></i></div>
                </Menu>

                <Menu className='overflow-auto' style={{ height: '79vh' }} menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        return {
                            backgroundColor: active ?
                                '#335B8C'
                                :
                                '#C9EEFF',
                            fontWeight: active ? 'bold' : null,
                            '&:hover': {
                                backgroundColor: '#335B8C',
                                color: 'white',
                                fontWeight: 'bold'
                            },
                        }
                    },
                    icon: () => {
                        return {
                            color: '#0A2647',
                            backgroundColor: '#62CDFF',
                        }
                    }

                }}>
                    {!collapsed && <div className='w-100 text-center'>
                        <span>Main funtion</span>
                    </div>
                    }

                    <SubMenu active={window.location.pathname.includes("/doctor/appointment")} label="Appointment" icon={<i className="fa-solid fa-calendar-check"></i>} >
                        <MenuItem component={<Link to={'/doctor/appointment-queue'}></Link>}> Queue </MenuItem>
                        <MenuItem component={<Link to={'/doctor/appointment-history'}></Link>}> History </MenuItem>
                    </SubMenu>
                </Menu>
                {/* Footer */}
                <Menu menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        return {

                            backgroundColor:
                                '#C9EEFF',
                            '&:hover': {
                                backgroundColor: '#335B8C',
                                color: 'white',
                                fontWeight: 'bold'
                            },
                        }
                    },

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

export default DoctorSidebar;