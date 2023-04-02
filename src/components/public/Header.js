import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/Logo-nbg.png";
import "./Header.scss";

// Redux
import { deleteUser } from "../../redux/features/userSlide";
import axios from "axios";
import Cookies from "universal-cookie/cjs/Cookies";
function Header() {
  const nagivate = useNavigate();

  const user = useSelector((state) => state.user) || {};

  const dispatch = useDispatch();

  const logOut = () => {
    axios.defaults.headers.common['Authorization'] = "";
    localStorage.clear();
    const cookie = new Cookies();
    cookie.remove('_to');
    dispatch(deleteUser())
    nagivate('/login');
  };
  return (
    <>
      <div className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <div className="container">
            <img src={logo} alt="logo" /> Shiny Teeth
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/services"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Services
                  </NavLink>
                </li>
                {user.userInfo && (user.userInfo.role === 'Patient')
                  ? <>
                    <li className="nav-item">
                      <NavLink
                        to="/user/appointment"
                        className={({ isActive }) =>
                          isActive ? "nav-link active" : "nav-link"
                        }
                      >
                        Appointment
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/user/chat"
                        className={({ isActive }) =>
                          isActive ? "nav-link active" : "nav-link"
                        }
                      >
                        Chat Box
                      </NavLink>
                    </li>
                  </>
                  : null}
                <li className="nav-item">
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Contact
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/aboutus"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    About Us
                  </NavLink>
                </li>

              </ul>
            </div>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              {!user.userInfo ? (
                <>
                  <ul className="navbar-nav ms-auto">
                    <Link
                      to="/login"
                      className="btn btn-primary mx-lg-2 my-lg-0 my-sm-2"
                    >
                      login
                    </Link>
                    <Link to="/register" className="btn btn-success ">
                      Register
                    </Link>
                  </ul>
                </>
              ) : (
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle  text-dark" href="..." data-bs-toggle="dropdown" role="button" aria-expanded="false">Hi, {user.userInfo.fullName}</a>
                    <ul className="dropdown-menu">
                      <li className="mx-2 mb-2">
                        <Link
                          to="/user/profile"
                          className="btn btn-primary w-100 "
                        >
                          <i className="fa-solid fa-user"></i> Profile
                        </Link>
                      </li>
                      <li className="mx-2 mb-2">
                        <button className="btn btn-danger btn  w-100" onClick={() => logOut()}>
                          <i className="fa-solid fa-right-to-bracket"></i> Log out
                        </button>
                      </li>

                    </ul>
                  </li>


                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
