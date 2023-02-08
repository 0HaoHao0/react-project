import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo/Logo-nbg.png'
import './Header.scss'
function Header() {
    return (<>
        <div className="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                                <NavLink to='/contact' className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Contact</NavLink>

                            </li>
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto">
                            <button className="btn btn-primary mx-lg-2 my-lg-0 my-sm-2">login</button>
                            <button className="btn btn-success ">Register</button>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </>);
}

export default Header;