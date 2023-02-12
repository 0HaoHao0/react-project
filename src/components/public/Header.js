import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo/Logo-nbg.png'
import './Header.scss'

// Redux
import { deleteUser } from '../../redux/features/userSlide';
function Header() {
    const user = useSelector((state) => state.user) || {}


    const dispatch = useDispatch();



    const logOut = () => {
        dispatch(deleteUser());
    }
    return (<>
        <div className="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                <div className="container">
                    <img src={logo} alt="logo" /> Shiny Teeth
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink to='/' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/about' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>About</NavLink>

                            </li>
                            <li className="nav-item">
                                <NavLink to='/services' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Services</NavLink>

                            </li>
                            <li className="nav-item">
                                <NavLink to='/contact' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Contact Us</NavLink>

                            </li>
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        {!user.userInfo
                            ?
                            <>
                                <ul className="navbar-nav ms-auto">
                                    <Link to='/login' className="btn btn-primary mx-lg-2 my-lg-0 my-sm-2">login</Link>
                                    <Link to='/register' className="btn btn-success ">Register</Link>
                                </ul>
                            </>
                            :
                            <ul className="navbar-nav ms-auto">
                                <div className='d-flex align-items-center justify-content-center'>
                                    Hi, {user.userInfo.fullName}
                                </div>
                                <Link to='/' className="btn btn-primary mx-lg-2 my-lg-0 my-sm-2">Profile</Link>
                                <button className="btn btn-success " onClick={() => logOut()}>Log out</button>
                            </ul>
                        }

                    </div>
                </div>
            </nav>
        </div>
    </>);
}

export default Header;