import {
    Sidebar, Menu, MenuItem, SubMenu, useProSidebar

} from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import './ReceptionistSidebar.scss'
import Cookies from "universal-cookie/cjs/Cookies";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/features/userSlide';

function ReceptionistSidebar() {
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
        <div className="receptionist-sidebar vh-100">

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
                                backgroundColor: '#8D7B68',
                                fontWeight: 'bold'

                            },
                        }
                    }
                }}>
                    <MenuItem icon={<i className="fa-solid fa-users" />}> Management</MenuItem>
                    <div className='btn-collapse btn btn-dark btn-sm' onClick={() => collapseSidebar()}><i className='bx bx-left-arrow-alt bx-spin' ></i></div>
                </Menu>


                <Menu className='overflow-auto  styleScroll' style={{ height: '79vh' }} menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        return {
                            backgroundColor: active ?
                                '#8D7B68'
                                :
                                '#e3d1c1',
                            fontWeight: active ? 'bold' : null,
                            '&:hover': {
                                backgroundColor: '#8D7B68',
                                fontWeight: 'bold'
                            },
                        }
                    },
                    icon: () => {
                        return {
                            color: '#0A2647',
                            backgroundColor: '#A4907C',
                        }
                    }

                }}>
                    {!collapsed && <div className='w-100 text-center'>
                        <span>Main funtion</span>
                    </div>
                    }

                    <MenuItem active={window.location.pathname.includes("/receptionist/chat")} icon={<i className="fa-solid fa-comments"></i>}> Chat Box </MenuItem>
                    <SubMenu active={window.location.pathname.includes("/receptionist/appointment")} label="Appointment" icon={<i className="fa-solid fa-calendar-check"></i>} >
                        <MenuItem component={<Link to={'/receptionist/appointment-queue'}></Link>}> Queue </MenuItem>
                        <MenuItem component={<Link to={'/receptionist/appointment-history'}></Link>}> History </MenuItem>
                    </SubMenu>
                    <MenuItem
                        active={window.location.pathname.includes("/receptionist/patient")}
                        component={<Link to={'/receptionist/patient'}></Link>} icon={<i className="fa-solid fa-hospital-user"></i>}> Patient </MenuItem>
                    <MenuItem
                        active={window.location.pathname.includes("/receptionist/contact")}
                        component={<Link to={'/receptionist/contact'}></Link>} icon={<i className="fa-solid fa-address-card"></i>}> Contact </MenuItem>
                    <MenuItem
                        active={window.location.pathname.includes("/receptionist/news")}
                        component={<Link to={'/receptionist/news'}></Link>} icon={<i className="fa-solid fa-newspaper"></i>}> News </MenuItem>
                </Menu>
                {/* Footer */}
                <Menu menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        return {
                            backgroundColor:
                                '#e3d1c1',
                            '&:hover': {
                                backgroundColor: '#8D7B68',
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

export default ReceptionistSidebar;