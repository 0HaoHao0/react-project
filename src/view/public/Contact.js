import { useState } from "react";
import "./Contact.scss";
import { useNavigate } from "react-router-dom";
import { ContactCreate } from "../../services/public/apiContact";
function Contact() {
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactContent, setContactContent] = useState("");

  const [dataError, setDataError] = useState("");

  const navigate = useNavigate();

  //Validate contactName
  const validateContactName = () => {
    if (contactName.trim() === "") {
      setDataError((prevState) => ({
        ...prevState,
        contactName: "Name cannot be empty!",
      }));
    } else if (contactName.length <= 6) {
      setDataError((prevState) => ({
        ...prevState,
        contactName: "Name cannot must be least 6",
      }));
    } else {
      setDataError((prevState) => ({
        ...prevState,
        contactName: "",
      }));
    }
  };
  //Validate contact
  const validateContactPhone = () => {
    if (contactPhone.trim() === "") {
      setDataError((prevState) => ({
        ...prevState,
        contactPhone: "Phone cannot be empty!",
      }));
    } else if (isNaN(contactPhone)) {
      setDataError((prevState) => ({
        ...prevState,
        contactPhone: "Phone must be a number",
      }));
    } else {
      setDataError((prevState) => ({
        ...prevState,
        contactPhone: "",
      }));
    }
  };

  // Validate ContactEmail
  const validateContactEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (contactEmail.trim() === "") {
      setDataError((prevState) => ({
        ...prevState,
        contactEmail: "Email cannot be empty!",
      }));
    } else if (!emailRegex.test(contactEmail)) {
      setDataError((prevState) => ({
        ...prevState,
        contactEmail: "Invalid email format!",
      }));
    } else {
      setDataError((prevState) => ({
        ...prevState,
        contactEmail: "",
      }));
    }
  };

  //Validate ContactContent
  const validateContent = () => {
    if (contactContent.trim() === "") {
      setDataError((prevState) => ({
        ...prevState,
        contactContent: "Content cannot be empty!",
      }));
    } else if (contactName.length <= 6) {
      setDataError((prevState) => ({
        ...prevState,
        contactContent: "Content cannot must be least 6",
      }));
    } else {
      setDataError((prevState) => ({
        ...prevState,
        contactContent: "",
      }));
    }
  };

  //Handle Submit
  const handleSubmit = async (e) => {
    validateContactName();
    validateContactPhone();
    validateContactEmail();
    validateContent();
    const res = await ContactCreate(
      contactName,
      contactPhone,
      contactEmail,
      contactContent
    );

    if (res.status === 200) {
      console.log("thanh cong ");
      navigate("/contact");
    }
  };

  return (
    <>
      <div className="contact">
        <div className="d-flex align-items-center justify-content-center p-5">
          <div>
            <div className="row  py-5">
              <div className="col-12 col-md-4">
                <iframe
                  className="w-100 h-100"
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15716.673521995259!2d105.72339285!3d10.002946499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0882139720a77%3A0x3916a227d0b95a64!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgQ-G6p24gVGjGoQ!5e0!3m2!1sen!2s!4v1675905671338!5m2!1sen!2s"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="col-12 col-md-8 ">
                <div className="w-100 px-5 bg-light">
                  <h5 className="text-center py-2">Get in Touch</h5>
                  <div className="mb-3">
                    <label htmlFor="Name" className="form-label">
                      Name:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="Name"
                      onBlur={validateContactName}
                      placeholder="Nguyen Van A"
                      onChange={(e) => {
                        setContactName(e.target.value);
                      }}
                    />
                    {dataError.contactName && (
                      <span className="error">{dataError.contactName}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Phone" className="form-label">
                      PhoneNumber:
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      onBlur={validateContactPhone}
                      id="Phone"
                      onChange={(e) => {
                        setContactPhone(e.target.value);
                      }}
                    />
                    {dataError.contactPhone && (
                      <span className="error">{dataError.contactPhone}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Email" className="form-label">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      onBlur={validateContactPhone}
                      className="form-control"
                      id="Email"
                      placeholder="name@example.com"
                      onChange={(e) => {
                        setContactEmail(e.target.value);
                      }}
                    />
                    {dataError.contactEmail && (
                      <span className="error">{dataError.contactEmail}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Meassage" className="form-label">
                      Meassage:{" "}
                    </label>
                    <textarea
                      className="form-control"
                      id="Meassage"
                      onBlur={validateContent}
                      rows="3"
                      onChange={(e) => {
                        setContactContent(e.target.value);
                      }}
                    ></textarea>
                    {dataError.contactContent && (
                      <span className="error">{dataError.contactContent}</span>
                    )}
                  </div>

                  <div className="text-center py-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row py-5">
              <div className="col-12 col-md-4 border">
                <div className="p-4 h-100">
                  <i className="fa-solid fa-2x fa-location-dot b-2"></i>
                  <p>
                    {" "}
                    <strong>Address: </strong> Cầu Rau Răm, đường Nguyễn Văn Cừ
                    nối dài, An Bình, Ninh Kiều, Cần Thơ 900000, Vietnam
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-4 bg-light border">
                <div className="p-4 h-100 ">
                  <i className="fa-solid fa-2x fa-phone mb-2"></i>
                  <p>
                    {" "}
                    <strong>Phone: </strong> 0945689xxx
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-4 border">
                <div className="p-4 h-100">
                  <i className="fa-solid fa-2x fa-envelope mb-2"></i>
                  <p>
                    {" "}
                    <strong>Email: </strong> haotvce150521@fpt.edu.vn
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
