import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser } from "../../redux/features/userSlide";

function AdminSidebar() {
  const nagivate = useNavigate()

  const userInfo = useSelector((state) => state.user.userInfo)

  const dispatch = useDispatch()
  const logOut = () => {
    axios.defaults.headers.common['Authorization'] = "";
    dispatch(deleteUser())
    nagivate('/login');
  }
  return (<>

    {/* Main Sidebar Container */}
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <div className="brand-link d-flex align-items-center justify-content-center">
        <i className="fa-solid fa-screwdriver-wrench"></i>
      </div>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-item menu">
              <div className="nav-link active">
                <i className="nav-icon fas fa-user" />
                <p>
                  Hi, {userInfo.fullName}
                  <i className="right fas fa-angle-left" />
                </p>
              </div>
              <ul className="nav nav-treeview ">
                <li className="nav-item">
                  <div className="nav-link text-white">
                    <i className="far fa-info nav-icon" />
                    <p>Profile</p>
                  </div>
                </li>
                <li className="nav-item bg-danger ">
                  <div className="nav-link text-white" onClick={() => { logOut() }}>
                    <i className="fa-solid fa-right-from-bracket nav-icon"></i>
                    <p>Log out</p>
                  </div>
                </li>
              </ul>
            </li>
            <li className="nav-header">API</li>
            <li className="nav-item">
              <div className="nav-link text-white ">
                <i className="nav-icon fas fa-chart-pie" />
                <p>
                  Patient
                  <i className="right fas fa-angle-left" />
                </p>
              </div>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to='/admin/patient' className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Get All</p>
                  </Link>
                </li>

              </ul>
            </li>
            <li className="nav-item">
              <div className="nav-link text-white ">
                <i className="nav-icon fas fa-chart-pie" />
                <p>
                  Contact
                  <i className="right fas fa-angle-left" />
                </p>
              </div>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to='/admin/contact' className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Get All</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="pages/widgets.html" className="nav-link">
                <i className="nav-icon fas fa-th" />
                <p>
                  Widgets
                  <span className="right badge badge-danger">New</span>
                </p>
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                <i className="nav-icon fas fa-copy" />
                <p>
                  Layout Options
                  <i className="fas fa-angle-left right" />
                  <span className="badge badge-info right">6</span>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="pages/layout/top-nav.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Top Navigation</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/layout/top-nav-sidebar.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Top Navigation + Sidebar</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/layout/boxed.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Boxed</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/layout/fixed-sidebar.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Fixed Sidebar</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/layout/fixed-sidebar-custom.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Fixed Sidebar <small>+ Custom Area</small></p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/layout/fixed-topnav.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Fixed Navbar</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/layout/fixed-footer.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Fixed Footer</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/layout/collapsed-sidebar.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Collapsed Sidebar</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                <i className="nav-icon fas fa-chart-pie" />
                <p>
                  Charts
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="pages/charts/chartjs.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>ChartJS</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/charts/flot.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Flot</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/charts/inline.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Inline</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/charts/uplot.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>uPlot</p>
                  </a>
                </li>
              </ul>
            </li>

            {/* <li className="nav-header">MULTI LEVEL EXAMPLE</li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="fas fa-circle nav-icon" />
                                <p>Level 1</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-circle" />
                                <p>
                                    Level 1
                                    <i className="right fas fa-angle-left" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Level 2</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>
                                            Level 2
                                            <i className="right fas fa-angle-left" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="far fa-dot-circle nav-icon" />
                                                <p>Level 3</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="far fa-dot-circle nav-icon" />
                                                <p>Level 3</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="far fa-dot-circle nav-icon" />
                                                <p>Level 3</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Level 2</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="fas fa-circle nav-icon" />
                                <p>Level 1</p>
                            </a>
                        </li>
                        <li className="nav-header">LABELS</li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon far fa-circle text-danger" />
                                <p className="text">Important</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon far fa-circle text-warning" />
                                <p>Warning</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon far fa-circle text-info" />
                                <p>Informational</p>
                            </a>
                        </li> */}
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  </>
  );
}

export default AdminSidebar;
