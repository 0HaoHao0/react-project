import "./Emailconfirm.scss";
import {
  SendCodeToEmail,
  VerifyUserByCode,
} from "../../services/authorization/apIRegister";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
//toast
import { toast } from "react-toastify";
import { createUser } from "../../redux/features/userSlide";
import { getUserInfo } from "../../services/authorization/apILogin";
function Emailconfirm() {
  const [changleStyle, setChangleStyle] = useState(1);
  const [isTouched, setIsTouched] = useState({});

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [verifiedEmail, setVerifiedEmail] = useState(user.userInfo.email);
  const [code, setCode] = useState("");
  const [dataError, setDataError] = useState({});
  const [CodeClickedTime, setCodeClickedTime] = useState(null);

  // validateVerifiedEmail
  const validateVerifiedEmail = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsTouched((prevState) => ({
      ...prevState,
      verifiedEmail: "is-invalid",
    }));
    let verifiedEmail = e.target.value;
    if (verifiedEmail.trim() === "") {
      setDataError((prevState) => ({
        ...prevState,
        verifiedEmail: "Email cannot be empty!",
      }));
    } else if (!emailRegex.test(verifiedEmail)) {
      setDataError((prevState) => ({
        ...prevState,
        verifiedEmail: "Invalid email format!",
      }));
    } else {
      setIsTouched((prevState) => ({
        ...prevState,
        verifiedEmail: "is-valid",
      }));
      setDataError((prevState) => ({
        ...prevState,
        verifiedEmail: "",
      }));
    }
  };

  // validateInsertCode
  const validateInsertCode = () => {
    let isValid = false;

    setIsTouched((prevState) => ({
      ...prevState,
      code: "Touch",
    }));
    if (code.trim() === "") {
      setDataError((prevState) => ({
        ...prevState,
        code: "Code cannot be empty!",
      }));
    } else if (code.length !== 6) {
      setDataError((prevState) => ({
        ...prevState,
        code: "Code only allow 6 characters.",
      }));
    } else {
      isValid = true;
      setDataError((prevState) => ({
        ...prevState,
        code: "",
      }));
    }

    return isValid;
  };

  const handleSendCodeToEmail = async (e) => {
    let canClick =
      CodeClickedTime === null ||
      new Date().getTime() - CodeClickedTime > 15000;
    if (canClick) {
      setCodeClickedTime(new Date().getTime());
    } else {
      let diff =
        15 - Math.floor((new Date().getTime() - CodeClickedTime) / 1000);
      toast.warning("Waiting in " + diff + "s");
      return;
    }
    const res = await SendCodeToEmail(verifiedEmail);
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Sending Success!",
        text: res.data,
      });
      setChangleStyle(2);
    } else if (res.status !== 500) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: res.data,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Some thing went wrong!",
      });
    }
  };

  const handleConfirmCodeUser = async (e) => {
    if (validateInsertCode() === false) return;
    let canClick =
      CodeClickedTime === null ||
      new Date().getTime() - CodeClickedTime > 15000;
    if (canClick) {
      setCodeClickedTime(new Date().getTime());
    } else {
      let diff =
        15 - Math.floor((new Date().getTime() - CodeClickedTime) / 1000);
      toast.warning("Waiting in " + diff + "s");
      return;
    }
    const res = await VerifyUserByCode(user.userInfo.id, code);
    if (res.status === 200) {
      let newUserInfoRes = await getUserInfo();
      if (newUserInfoRes.status === 200) {
        dispatch(createUser(newUserInfoRes.data));
      }

      navigate("/home");
    } else if (res.status !== 500) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: res.data,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Some thing went wrong!",
      });
    }
  };

  return (
    <>
      <section className="emailconfirm">
        <Link to="/login" className="btn btn-danger ml-4 mt-2">
          Back To Login
        </Link>
        <div className="container">
          <div className="row justify-content-center">
            {changleStyle === 1 ? (
              <>
                <div className="col-md-6 rs-col">
                  <h1 className="text-center mt-5 text-primary">
                    Email verification
                  </h1>
                  <div className="form">
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        onBlur={validateVerifiedEmail}
                        placeholder="Enter Email"
                        className={`form-control ${isTouched.verifiedEmail}`}
                        defaultValue={verifiedEmail}
                        onChange={(e) => {
                          setVerifiedEmail(e.target.value);
                        }}
                      />
                      {dataError.verifiedEmail ? (
                        <p className="invalid-feedback">
                          {dataError.verifiedEmail}
                        </p>
                      ) : null}
                    </div>
                    <input
                      variant="primary"
                      type="submit"
                      className="btn btn-primary w-25"
                      onClick={(e) => {
                        handleSendCodeToEmail(e);
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-md-6 rs-col">
                  <h2 className="text-center mt-5 text-primary">
                    Enter the code to verify the email
                  </h2>
                  <div className="form">
                    <div className="form-group">
                      <label className="form-label">Code</label>
                      <input
                        type="email"
                        onBlur={validateInsertCode}
                        value={code}
                        placeholder="Enter Code"
                        className={`form-control text-center ${
                          isTouched.code &&
                          (dataError.code ? "is-invalid" : "is-valid")
                        }`}
                        onChange={(e) => setCode(e.target.value)}
                        required
                      />
                      {dataError.code ? (
                        <p className="invalid-feedback">{dataError.code}</p>
                      ) : null}
                    </div>
                    <input
                      variant="primary"
                      type="submit"
                      value="Confirm"
                      className="btn btn-primary w-25"
                      onClick={(e) => {
                        handleConfirmCodeUser(e);
                      }}
                    />
                    <input
                      type="submit"
                      className="btn btn-primary mx-2 w-25"
                      value="Resend"
                      onClick={(e) => {
                        handleSendCodeToEmail(e);
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Emailconfirm;
