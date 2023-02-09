import logo from '../../assets/images/logo/Logo-nbg.png'

function Footer() {
    return (<>
        <div className="footer">
            <footer className="w-100 py-4 border-top">
                <div className="container py-4">
                    <div className="row gy-4 gx-5">
                        <div className="col-lg-4 col-md-6">
                            <img className='w-25' src={logo} alt="logo" />
                            <p className="small text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
                            <p className="small text-muted mb-0">&copy; Copyrights. All rights reserved</p>
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <h5 className=" mb-3">Quick links</h5>
                            <ul className="list-unstyled text-muted">
                                <li><a href="/">Home</a></li>
                                <li><a href="/">About</a></li>
                                <li><a href="/">Contact</a></li>
                                <li><a href="/">Get started</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <h5 className=" mb-3">Resources</h5>
                            <ul className="list-unstyled text-muted">
                                <li><a href="/">Blog</a></li>
                                <li><a href="/">FAQ</a></li>
                                <li><a href="/">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <h5 className=" mb-3">Newsletter</h5>
                            <p className="small text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
                            <form action="#">
                                <div className="input-group mb-3">
                                    <input className="form-control" type="text" placeholder="Enter email address" aria-label="Enter email address" aria-describedby="button-addon2" />
                                    <button className="btn btn-primary" id="button-addon2" type="button"><i className="fas fa-paper-plane"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </>);
}

export default Footer;