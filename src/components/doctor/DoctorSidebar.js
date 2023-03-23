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
                    [`.ps-menu-button:hover`]: {
                        backgroundColor: "#335B8C ",
                        color: "white",
                        fontWeight: "bold "
                    },
                    [`.ps-menu-button.ps-active`]: {
                        backgroundColor: '#335B8C',
                        color: "white !important",
                        fontWeight: "bold !important"
                    },
                }}>

                <div  >
                    <span className='text-center m-5'>
                        <h5><i className="fa-solid fa-user-doctor" /> {!collapsed && 'Doctor Management'}</h5>
                    </span>

                    <div className='btn-collapse btn btn-dark btn-xs' onClick={() => collapseSidebar()}><i className='bx bx-left-arrow-alt bx-spin' ></i></div>
                </div>
                <Menu className='overflow-auto h-75' menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        return {

                            color: disabled ? '#97DEFF' : '#146C94',
                            backgroundColor:
                                '#C9EEFF',
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

                    <SubMenu label="Appointment" icon={<i className="fa-solid fa-calendar-check"></i>} >
                        <MenuItem component={<Link to={'/doctor/appointment-queue'}></Link>}> Queue </MenuItem>
                        <MenuItem component={<Link to={'/doctor/appointment-history'}></Link>}> History </MenuItem>
                    </SubMenu>
                </Menu>
                {/* Footer */}
                <Menu >


                    <MenuItem icon={<i className='bx bx-info-circle' ></i>} component={<Link to={'/profile'}></Link>}>
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

export default DoctorSidebar;