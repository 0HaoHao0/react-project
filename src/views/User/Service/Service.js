import '../../../styles/views/User/Service/Service.scss'

function Service() {
    return (
        <>
            <div className="service">
                <button className='btn  btn-take-appointment'><i class="fa fa-calendar-check"></i> Take Appointment</button>
                <div className="m-5">
                    <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner ">
                            <div className="carousel-item active" data-bs-interval="10000">
                                <div className='d-flex justify-content-center'>
                                    <img src='https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg' height='75%' className="d-block w-75" alt="..." />
                                </div>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>First slide label</h5>
                                    <p className='text-limit'>Some representative placeholder content for the first slide.</p>
                                </div>
                            </div>
                            <div className="carousel-item  " data-bs-interval="2000">
                                <div className='d-flex justify-content-center'>
                                    <img src='https://vietnamitx.com/attachments/top-hinh-nen-dong-wallpaper-engine-desktop-tuyet-dep-download-chon-loc-2021-jpg.2215/' height='75%' className="d-block w-75" alt="..." />
                                </div>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Second slide label</h5>
                                    <p className='text-limit'>Some representative placeholder content for the second slide.</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className='d-flex justify-content-center'>
                                    <img src='https://1.bigdata-vn.com/wp-content/uploads/2021/12/1639350718_181_Kham-Pha-Bo-Hinh-Nen-Anime-Cuc-Dep-Va-Cuc.jpg' height='75%' className="d-block w-75" alt="..." />
                                </div>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Third slide label</h5>
                                    <p className='text-limit'>Some representative placeholder content for the third slide.</p>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className='bg-light'>
                    <div className='container my-5 p-5 '>
                        <h2>Best Services</h2>
                        <hr />
                        <div className="row">
                            <div className="col-lg-4">
                                <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>

                                <h2>Heading</h2>
                                <p>Some representative placeholder content for the three columns of text below the carousel. This is the first column.</p>
                                <p><a className="btn btn-secondary" href=".">View details »</a></p>
                            </div>
                            <div className="col-lg-4">
                                <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>

                                <h2>Heading</h2>
                                <p>Another exciting bit of representative placeholder content. This time, we've moved on to the second column.</p>
                                <p><a className="btn btn-secondary" href=".">View details »</a></p>
                            </div>
                            <div className="col-lg-4">
                                <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>

                                <h2>Heading</h2>
                                <p>And lastly this, the third column of representative placeholder content.</p>
                                <p><a className="btn btn-secondary" href=".">View details »</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='bg-light'>
                        <h2 className='p-5'>Our Services</h2>
                    </div>
                    <div className="container  p-5">

                        <div className="row service-odd p-5 featurette">
                            <div className="col-md-7">
                                <h2 className="featurette-heading">First featurette heading.</h2>
                                <p >Some great placeholder content for the first featurette here. Imagine some exciting prose here.</p>
                            </div>
                            <div className="col-md-5">
                                <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="400" height="400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"></rect><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>

                            </div>
                        </div>
                        <hr />

                        <div className="row service-even p-5 featurette">
                            <div className="col-md-7 order-md-2">
                                <h2 className="featurette-heading">Oh yeah, it’s that good.</h2>
                                <p >Another featurette? Of course. More placeholder content here to give you an idea of how this layout would work with some actual real-world content in place.</p>
                            </div>
                            <div className="col-md-5 order-md-1">
                                <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="400" height="400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"></rect><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>

                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </>
    );
}

export default Service;