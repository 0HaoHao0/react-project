import {
    Sidebar, Menu, MenuItem, SubMenu, useProSidebar

} from 'react-pro-sidebar';
import './DoctorSidebar.scss'
function DoctorSidebar() {

    const { collapseSidebar, collapsed } = useProSidebar();

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
                    [`.ps-menu-button:active`]: {
                        backgroundColor: '#335B8C',
                        color: "white !important",
                        fontWeight: "bold !important"
                    },
                }}>
                {/* Header */}
                {/* <Menu>
                    <MenuItem icon={<i className="fa-solid fa-user-doctor"></i>}
                        rootStyles={{
                            [`.ps-menu-button:hover`]: {
                                backgroundColor: "#335B8C !important ",
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
                    }

                }}>
                    {!collapsed && <div className='w-100 text-center'>
                        <span>Api</span>
                    </div>
                    }

                    <SubMenu label="Appointment" icon={<i className="fa-solid fa-calendar-check"></i>} >
                        <MenuItem > Pie charts </MenuItem>
                        <MenuItem> Line charts </MenuItem>
                    </SubMenu>
                    <MenuItem icon={<i className='bx bxl-postgresql'></i>}> Documentation </MenuItem>

                </Menu>
                {/* Footer */}
                <Menu>
                    <MenuItem icon={<i className='bx bx-info-circle' ></i>} >
                        Profile
                    </MenuItem>
                    <MenuItem icon={<i className='bx bxs-log-out'></i>} onClick={() => { console.log('text'); }}
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