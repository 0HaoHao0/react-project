import "./Aboutus.scss";
//image member
import phuc from "../../assets/images/user/phuc.jpg";
import bang from "../../assets/images/user/bang.jpg";
import hao from "../../assets/images/user/hao.jpg";
import dat from "../../assets/images/user/dat.jpg";
import duy from "../../assets/images/user/duy.jpg";
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
              <p className=" text-muted mb-4">
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
              <p className=" text-muted mb-4">
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
                <p className=" text-muted">
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
                              src={phuc}
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
                              src={bang}
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
                              src={hao}
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
                              src={dat}
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
                              src={duy}
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
