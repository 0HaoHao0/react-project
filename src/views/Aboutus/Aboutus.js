import React, { Component } from 'react'
import '../../styles/views/Aboutus/Aboutus.scss'
class Aboutus extends Component {
  state = {}



  render() {
    return (
      <>
        <div className='aboutus'>
          <div className="bg-light">
            <div className="container py-5">
              <div className="row h-100 align-items-center py-5">
                <div className="col-lg-6">
                  <h1 className="display-4">Always Smile</h1>
                  <p className="lead text-muted mb-0">Experience Implant that is strong as your own teeth</p>
                  <p className="lead text-muted">In any case, we give you the amazing the results
                  </p>
                </div>
                <div className="col-lg-6 d-none d-lg-block">
                  <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img src="https://www.capturelifedentalcare.com/wp-content/uploads/2022/02/Best-Dental-Care-Clinic-Hyderabad-Has-With-Great-Services.jpg" className="d-block w-100 img-fluid img-bg" alt="..." />
                      </div>
                      <div className="carousel-item">
                        <img src="https://www.dentistrytoday.com/wp-content/uploads/2017/08/0030753daf42cd1252bf6eec34cd6272.jpg" className="d-block w-100 img-fluid img-bg" alt="..." />
                      </div>
                      <div className="carousel-item">
                        <img src="https://portmanpdc.imgix.net/_panelImage/Consult-dentist-patient_200930_090048.jpg?mtime=20200930090048&auto=compress,format" className="d-block w-100 img-fluid img-bg" alt="..." />
                      </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white py-5">
            <div className="container py-5">
              <div className="row align-items-center mb-5">
                <div className="col-lg-6 order-2 order-lg-1"><i className="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
                  <h3 className="font-weight-light">We Provide Best Dental Care Solution For You</h3>
                  <p className="font-italic text-muted mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><a href="." className="btn btn-light px-5 rounded-pill shadow-sm">Learn More</a>
                </div>
                <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src="https://www.dentistrytoday.com/wp-content/uploads/2020/04/194df8014cc7359d17897937cd25ec68.jpg" alt="" className="img-fluid mb-4 mb-lg-0 img-middle" /></div>
              </div>
              <div className="row align-items-center">
                <div className="col-lg-5 px-5 mx-auto"><img src="https://jacksonfamilydentalonline.com/wp-content/uploads/2020/05/jackson-team-jackson-family-dental.jpg" alt="" className="img-fluid mb-4 mb-lg-0 img-middle" /></div>
                <div className="col-lg-6"><i className="fa fa-leaf fa-2x mb-3 text-primary"></i>
                  <h2 className="font-weight-light">Schedule your first visit</h2>
                  <p className="font-italic text-muted mb-4">As a fee-for-service practice, we offer easy payment plans and financing options to fit your family’s budget. We’re also happy to submit insurance claims on your behalf.</p><a href="." className="btn btn-light px-5 rounded-pill shadow-sm">Learn More</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-light py-5">
            <div className="container py-5">
              <div className="row mb-4">
                <div className="col-lg-5">
                  <h2 className="display-4 font-weight-bold">Our Teams</h2>
                  <p className="font-italic text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </div>

              <section id="team">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                      <div className="sec-heading text-center">
                        <h6>Team Members</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="testimonial-box">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="team-slider owl-carousel d-flex flex-row" id='bars'>
                          <div className="single-box  text-center mx-2 w-100">
                            <div className="img-area"><img alt="" className="img-fluid move-animation img-member" src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/283948474_2913668802266320_491078146547266123_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=174925&_nc_ohc=nhfRlAnkZHwAX8lXHGJ&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfA4gZnT8V-foyvpr8K-qQVOMknJoqfpAEV9etBVF1sPbw&oe=63650BE3" /></div>
                            <div className="info-area">
                              <h4>BackEnd</h4>
                              <p>Huỳnh Tấn Phúc</p><a href=".">Learn More</a>
                            </div>
                          </div>
                          <div className="single-box  text-center mx-2 w-100">
                            <div className="img-area"><img alt="" className="img-fluid move-animation img-member" src="https://scontent.fvca1-3.fna.fbcdn.net/v/t1.6435-9/74805412_2184839981820855_5244884723230048256_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=174925&_nc_ohc=mN1yzQtHE4wAX_Ghph3&_nc_ht=scontent.fvca1-3.fna&oh=00_AfB-Ji8GIjyfPBWcstvNRi10xb0IEidh_C2OfRFAr_1xaQ&oe=63846BFD" /></div>
                            <div className="info-area">
                              <h4>BackEnd</h4>
                              <p>Đặng Đỗ Hữu Bằng</p><a href=".">Learn More</a>
                            </div>
                          </div>
                          <div className="single-box  text-center mx-2 w-100">
                            <div className="img-area"><img alt="" className="img-fluid move-animation img-member" src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/95328056_242935007024233_1165719098399653888_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=174925&_nc_ohc=N3HgAodGKeAAX-qVuAX&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfDxQy71_3NJIWNfu34GRpQDHlWCsvkKbih6WZ8MPmFVXQ&oe=63859279" /></div>
                            <div className="info-area">
                              <h4>FontEnd</h4>
                              <p>Trần Văn Hảo</p><a href=".">Learn More</a>
                            </div>
                          </div>
                          <div className="single-box  text-center mx-2 w-100">
                            <div className="img-area"><img alt="" className="img-fluid move-animation img-member" src="https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.6435-9/148181759_2853916518184952_4370270346601138128_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=JJAvHQB-7TAAX_-THmZ&tn=F4iAoeE4qrClRkh6&_nc_ht=scontent.fsgn5-2.fna&oh=00_AfBJJCSrT_dT3u29QFBxCTYTJVs0il24UkCd5Jv0r0cSXQ&oe=63842B24" /></div>
                            <div className="info-area">
                              <h4>FontEnd</h4>
                              <p>Lý Tuấn Đạt</p><a href=".">Learn More</a>
                            </div>
                          </div>
                          <div className="single-box  text-center mx-2 w-100">
                            <div className="img-area"><img alt="" className="img-fluid move-animation img-member" src="https://scontent.fvca1-2.fna.fbcdn.net/v/t1.6435-9/149345811_3031792170439049_7787673039645675524_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=174925&_nc_ohc=N0pfp89FqEkAX-UYzQ4&_nc_ht=scontent.fvca1-2.fna&oh=00_AfC4wL5T-qMcsi-daKZV5Xqp12ct7ixKl1eCoXXOsoKDLQ&oe=6384F9E3" /></div>
                            <div className="info-area">
                              <h4>Tester</h4>
                              <p>Nguyễn Khánh Duy</p><a href=".">Learn More</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

      </>
    );
  }
}

export default Aboutus;