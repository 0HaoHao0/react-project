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
                    [`.ps-menu-button:hover`]: {
                        backgroundColor: "#8D7B68 ",
                        color: "white",
                        fontWeight: "bold "
                    },
                    [`.ps-menu-button.ps-active`]: {
                        backgroundColor: '#8D7B68',
                        color: "white !important",
                        fontWeight: "bold !important"
                    },
                }}>
                {/* Header */}
                {/* <Menu>
                    <MenuItem icon={<i className="fa-solid fa-user-doctor"></i>}
                        rootStyles={{
                            [`.ps-menu-button:hover`]: {
                                backgroundColor: "#8D7B68 !important ",
                                color: "white",
                                fontWeight: "bold ",
                                'border-top-left-radius': "50px"
                            },
                        }}>
                        Doctor Management
                    </MenuItem>
                    <div className='btn-collapse btn btn-dark btn-xs' onClick={() => collapseSidebar()}><i className='bx bx-left-arrow-alt bx-spin' ></i></div>
                </Menu> */}
                <div  >
                    <span className='text-center m-5'>
                        <h5><i className="fa-solid fa-users" /> {!collapsed && 'Management'}</h5>
                    </span>

                    <div className='btn-collapse btn btn-dark btn-xs' onClick={() => collapseSidebar()}><i className='bx bx-left-arrow-alt bx-spin' ></i></div>
                </div>
                <Menu className='overflow-auto h-75' menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        return {

                            color: disabled ? '#97DEFF' : '#000000',
                            backgroundColor:
                                '#e3d1c1',
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

                    <MenuItem icon={<i className="fa-solid fa-comments"></i>}> Chat Box </MenuItem>
                    <SubMenu label="Appointment" icon={<i className="fa-solid fa-calendar-check"></i>} >
                        <MenuItem> Queue </MenuItem>
                        <MenuItem> History </MenuItem>
                    </SubMenu>
                    <MenuItem component={<Link to={'/receptionist/patient'}></Link>} icon={<i className="fa-solid fa-hospital-user"></i>}> Patient </MenuItem>
                    <MenuItem component={<Link to={'/receptionist/contact'}></Link>} icon={<i className="fa-solid fa-address-card"></i>}> Contact </MenuItem>
                    <MenuItem component={<Link to={'/receptionist/news'}></Link>} icon={<i className="fa-solid fa-newspaper"></i>}> News </MenuItem>
                </Menu>
                {/* Footer */}
                <Menu >


                    <MenuItem icon={<i className='bx bx-info-circle' ></i>} >
                        Profile
                    </MenuItem>


                    <MenuItem icon={<i className='bx bxs-log-out'></i>} onClick={() => { handleLogout() }}
                        rootStyles={{
                            [`.ps-menu-button:hover`]: {
                                backgroundColor: "red !important ",
                                color: "white",
                                fontWeight: "bold ",
                                'borderBottomLeftRadius': "50px"


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