import { useState } from "react";
import { toast } from "react-toastify";
import Header from "../../components/public/Header";
import { resetpassword } from "../../services/authorization/apIResetPassword";
import "./ResetPassword.scss";

function ResetPassword() {
  //handle character "+"
  const searchUrls = new URLSearchParams(window.location.search);
  let userName = searchUrls.get("userName");
  const encodedSecret = searchUrls.get("secret").replace(/ /g, "+");
  const secret = decodeURIComponent(encodedSecret);

  const [newPassword, setNewPassWord] = useState("");
  const [confirmPassword, setConfirmPassWord] = useState("");
  const [dataError, setDataError] = useState("");

  //validate new password
  const validateNewPassWord = () => {
    let result = true;
    if (newPassword.trim() === "") {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        newPassword: "Password cannot be empty!",
      }));
    } else if (newPassword.length < 6) {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        newPassword: "Password must be at least 6 characters long",
      }));
    } else {
      setDataError((prevState) => ({
        ...prevState,
        newPassword: "",
      }));
    }

    return result;
  };
  //validate confirm password
  const validateConfirmPassWord = () => {
    let result = true;
    if (confirmPassword.trim() === "") {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        confirmPassword: "Password cannot be empty!",
      }));
    } else if (confirmPassword !== newPassword) {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        confirmPassword: "Confirm password is not matched.",
      }));
    } else if (confirmPassword.length < 6) {
      result = false;
      setDataError((prevState) => ({
        ...prevState,
        confirmPassword: "Password must be at least 6 characters long.",
      }));
    } else {
      setDataError((prevState) => ({
        ...prevState,
        confirmPassword: "",
      }));
    }
    return result;
  };

  const handleResetPassword = async (e) => {
    console.log(newPassword, confirmPassword);
    let isValid = validateNewPassWord() && validateConfirmPassWord();
    if (isValid) {
      const res = await resetpassword(userName, newPassword, secret);
      if (res.status === 200) {
        toast.success("Reset Password Success");
      }
      else if (res.status < 500) {
        toast.error(res.data);
      }
      else {
        toast.error("Something wrong!");
      }
    }
  };

  return (
    <>
      <Header />
      <section className="resetpassword">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 rs-col">
              <h1 className="text-center mt-5 text-primary">Reset Password</h1>
              <div className="form">
                <div className="mb-3">
                  <label className="form-label fw-bold">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="form-control"
                    onBlur={validateNewPassWord}
                    onChange={(e) => {
                      setNewPassWord(e.target.value);
                    }}
                  />
                  {dataError.newPassword && (
                    <p className="error ml-2 mt-2">{dataError.newPassword}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="form-control"
                    onBlur={validateConfirmPassWord}
                    onChange={(e) => {
                      setConfirmPassWord(e.target.value);
                    }}
                  />
                  {dataError.confirmPassword && (
                    <p className="error ml-2 mt-2">{dataError.confirmPassword}</p>
                  )}
                </div>
                <input
                  variant="primary"
                  type="submit"
                  className="btn btn-primary w-25"
                  onClick={(e) => {
                    handleResetPassword(e);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ResetPassword;
