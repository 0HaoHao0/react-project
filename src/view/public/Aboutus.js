import "./Aboutus.scss";
function Aboutus() {
  return (
    <div className="aboutus">
      <div className="bg-light">
        <div className="container py-5">
          <div className="row h-100 align-items-center py-5">
            <div className="col-md-6">
              <h1 className="display-5 fw-bold">Introduce About Project</h1>
              <p className="lead text-muted mb-0">
                The project that we do is Shinny Teeth managing the dental
                clinic.
              </p>
              <p className="lead text-muted">
                Using high technology and quality service
              </p>
            </div>
            <div className="col-md-6 d-none d-lg-block">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="https://www.capturelifedentalcare.com/wp-content/uploads/2022/02/Best-Dental-Care-Clinic-Hyderabad-Has-With-Great-Services.jpg"
                      className="d-block w-100 img-fluid img-bg"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://www.dentistrytoday.com/wp-content/uploads/2017/08/0030753daf42cd1252bf6eec34cd6272.jpg"
                      className="d-block w-100 img-fluid img-bg"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://portmanpdc.imgix.net/_panelImage/Consult-dentist-patient_200930_090048.jpg?mtime=20200930090048&auto=compress,format"
                      className="d-block w-100 img-fluid img-bg"
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
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
            <div className="col-md-6 order-2 order-lg-1">
              <i className="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
              <h1 className="fw-bold">The Technologies That Use</h1>
              <p className="font-italic text-muted mb-4">
                The projects that we include the technologies we use are:
                Reactjs, ASP.Net Core Api, MicroServices Automatpter.
              </p>
              <a href="." className="btn btn-light px-5 rounded-pill shadow-sm">
                Learn More
              </a>
            </div>
            <div className="col-md-6 px-5 mx-auto order-1 order-lg-2">
              <img
                src="https://1.bp.blogspot.com/-k68ROu0k5Zg/Xkn3uYkZwFI/AAAAAAAAWZY/ctqLficKkGwWjVBwLhHbWxRlqoC5RcCjACLcBGAsYHQ/w1200-h630-p-k-no-nu/abc.jpg"
                alt=""
                className="img-fluid mb-4 mb-lg-0 img-middle"
              />
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-6 px-5 mx-auto">
              <img
                src="https://jacksonfamilydentalonline.com/wp-content/uploads/2020/05/jackson-team-jackson-family-dental.jpg"
                alt=""
                className="img-fluid mb-4 mb-lg-0 img-middle"
              />
            </div>
            <div className="col-md-6">
              <i className="fa fa-leaf fa-2x mb-3 text-primary"></i>
              <h1 className="fw-bold">The Services</h1>
              <p className="font-italic text-muted mb-4">
                Including services such as: Procedures to remove tartar. Scrape
                tartar. Teeth polishing. Deep tooth treatment. Deep tooth
                filling. Dental pulp treatment. Treatment of wisdom teeth.
                Wisdom tooth pain. Wisdom teeth are misaligned. Brace. Sparse
                braces. Teeth braces. Braces.
              </p>
              <a href="." className="btn btn-light px-5 rounded-pill shadow-sm">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="aboutus">
        <div className="bg-light py-5">
          <div className="container py-5">
            <div className="row mb-4">
              <div className="col-lg-5">
                <h2 className="display-4 font-weight-bold">Our Teams</h2>
                <p className="font-italic text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
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
                    <div className="col-md-12">
                      <div className="team-slider d-flex flex-row" id="bars">
                        <div className="single-box text-center mx-2 w-100">
                          <div className="img-area">
                            <img
                              alt=""
                              className="img-fluid move-animation img-member"
                              src="https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-6/283948474_2913668802266320_491078146547266123_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=174925&_nc_ohc=FpN1ahiGJl4AX86Jgh_&_nc_ht=scontent.fsgn5-13.fna&oh=00_AfDHO4tddZy721MpI_NEYXX-yJYyH-nEwVuNA_MF7kmk8w&oe=63EB84E3"
                            />
                          </div>
                          <div className="info-area">
                            <h4>BackEnd</h4>
                            <p>Huỳnh Tấn Phúc</p>
                            <a href=".">Learn More</a>
                          </div>
                        </div>
                        <div className="single-box text-center mx-2 w-100">
                          <div className="img-area">
                            <img
                              alt=""
                              className="img-fluid move-animation img-member"
                              src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.6435-9/95793805_2317530408551811_2212027853883572224_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=174925&_nc_ohc=zqc03ojZcv0AX_gMXNG&_nc_ht=scontent.fsgn5-6.fna&oh=00_AfAI8KHY7Q-Cy-ZmHwrvUP7gR0wJMhuT0Yx1ePuht_ga1Q&oe=640EDE12"
                            />
                            <h4>BackEnd</h4>
                            <p>Đặng Đỗ Hữu Bằng</p>
                          </div>
                          <div className="info-area">
                            <a href=".">Learn More</a>
                          </div>
                        </div>
                        <div className="single-box text-center mx-2 w-100">
                          <div className="img-area">
                            <img
                              alt=""
                              className="img-fluid move-animation img-member"
                              src="https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/292090471_748534723130923_7716904725897867278_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=174925&_nc_ohc=WUNvuuG_9vMAX9Qw1-4&_nc_ht=scontent.fsgn5-14.fna&oh=00_AfCI5fLlI_vPUaLxeM4UzgDYT6zM-44e4-OtpCVu1is-Ug&oe=63EBEC04"
                            />
                          </div>
                          <div className="info-area">
                            <h4>FrontEnd</h4>
                            <p>Trần Văn Hảo</p>
                            <a href=".">Learn More</a>
                          </div>
                        </div>
                        <div className="single-box  text-center mx-2 w-100">
                          <div className="img-area">
                            <img
                              alt=""
                              className="img-fluid move-animation img-member"
                              src="https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.6435-9/148181759_2853916518184952_4370270346601138128_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=NGs7RIoo7_gAX-NvAE7&_nc_ht=scontent.fsgn5-2.fna&oh=00_AfBnZcgeTTIvDD9HCwtwbNBJctq1UrCrqkYdYa6rkWhWQA&oe=640ED0E4"
                            />
                          </div>
                          <div className="info-area">
                            <h4>FrontEnd</h4>
                            <p>Lý Tuấn Đạt</p>
                            <a href=".">Learn More</a>
                          </div>
                        </div>
                        <div className="single-box text-center mx-2 w-100">
                          <div className="img-area">
                            <img
                              alt=""
                              className="img-fluid move-animation img-member"
                              src="https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.6435-9/75279155_2608386596112944_73059678627561472_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=o_DXdCdg77EAX8fvqNg&_nc_ht=scontent.fsgn5-2.fna&oh=00_AfDFa8rsJQIBydNALe30j47r5BLeTZyB7nyiBzx_D2xm9w&oe=640EE4D9"
                            />
                            <h4>Tester</h4>
                            <p>Nguyễn Khánh Duy</p>
                          </div>
                          <div className="info-area">
                            <a href=".">Learn More</a>
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
    </div>
  );
}

export default Aboutus;
