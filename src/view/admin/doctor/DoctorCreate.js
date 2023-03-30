import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createDoctor } from "../../../services/admin/doctor/apiDoctor";

function DoctorCreate() {
    const navigate = useNavigate()

    const [deviceData, setDeviceData] = useState('');



    const [dataError, setDataError] = useState('');

    const [isTouched, setIsTouched] = useState(''); // biến cờ



    //Handle

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDeviceData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImage = (e) => {
        const { name, files } = e.target;
        setDeviceData((prevState) => ({
            ...prevState,
            [name]: files[0]
        }));
    };

    const handleCreateDoctor = async () => {
        if (!deviceData.UserName || !deviceData.FullName || !deviceData.Major || !deviceData.CertificateFile || !deviceData.Gender || !deviceData.Password) {
            toast.error("Please fill in all Input !")
        }
        else {
            const fromData = new FormData();
            fromData.append("UserName", deviceData.UserName)
            fromData.append("FullName", deviceData.FullName)
            fromData.append("Major", deviceData.Major)
            fromData.append("CertificateFile", deviceData.CertificateFile)
            fromData.append("Password", deviceData.Password)
            fromData.append("Gender", deviceData.Gender)

            const res = await createDoctor(fromData);
            if (res.status === 200) {
                toast.success("Create Doctor Success")
                navigate('/admin/doctor')
            }
            else {
                toast.error("Create Doctor Fail !")
            }
        }
    }

    const validate = (e) => {
        const { name, value } = e.target;
        setIsTouched((prevState) => ({
            ...prevState,
            [name]: "Touch"
        }));
        if (value === '') {
            setDataError((prevState) => ({
                ...prevState,
                [name]: "Input Empty !"
            }));

        }
        else {
            setDataError((prevState) => ({
                ...prevState,
                [name]: ''
            }));

        }
    }
    return (<>
        <div className="doctor-create p-5">
            <div >
                <h1>Doctor Create</h1>
            </div>
            <hr />
            <div className="container-fluid">

                <div className="row g-2">
                    <h4 className="alert alert-secondary">Doctor Infomation</h4>
                    <div className="col-lg-6 col-sm-12 mb-3">

                        <label htmlFor="UserName" className="form-label">User Name: </label>
                        <input type="text" className={`form-control  ${isTouched.UserName && (dataError.UserName ? "is-invalid" : "is-valid")}`}
                            id="UserName" name="UserName"
                            onBlur={validate} onChange={handleChange} />
                        {dataError.UserName
                            ? <div className="invalid-feedback">
                                {dataError.UserName}
                            </div>
                            : null}

                        <label htmlFor="Password" className="form-label">Password: </label>
                        <input type="text" className={`form-control  ${isTouched.Password && (dataError.Password ? "is-invalid" : "is-valid")}`}
                            id="Password" name="Password"
                            onBlur={validate} onChange={handleChange} />
                        {dataError.Password
                            ? <div className="invalid-feedback">
                                {dataError.Password}
                            </div>
                            : null}

                        <label htmlFor="FullName" className="form-label">Full Name: </label>
                        <input type="text" className={`form-control  ${isTouched.FullName && (dataError.FullName ? "is-invalid" : "is-valid")}`}
                            id="FullName" name="FullName"
                            onBlur={validate} onChange={handleChange} />
                        {dataError.FullName
                            ? <div className="invalid-feedback">
                                {dataError.FullName}
                            </div>
                            : null}


                    </div>
                    <div className="col-lg-6 col-sm-12 mb-3">

                        <label htmlFor="Gender" className="form-label">Gender: </label>
                        <select className={`form-control  ${isTouched.Gender && (dataError.Gender ? "is-invalid" : "is-valid")}`}
                            id="Gender" name="Gender"
                            onBlur={validate} onChange={handleChange}>
                            <option value="">-- Select Gender --</option>
                            <option value={"Male"}>Male</option>
                            <option value={"Female"}>Female</option>
                            <option value={"Other"}>Other</option>
                        </select>
                        {dataError.Gender
                            ? <div className="invalid-feedback">
                                {dataError.Gender}
                            </div>
                            : null}

                        <label htmlFor="Major" className="form-label">Major: </label>
                        <input type="text" className={`form-control  ${isTouched.Major && (dataError.Major ? "is-invalid" : "is-valid")}`}
                            id="Major" name="Major"
                            onBlur={validate} onChange={handleChange} />
                        {dataError.Major
                            ? <div className="invalid-feedback">
                                {dataError.Major}
                            </div>
                            : null}

                        <label htmlFor="CertificateFile" className="form-label">Certificate File: </label>
                        <input type="file" className={`form-control  ${isTouched.CertificateFile && (dataError.CertificateFile ? "is-invalid" : "is-valid")}`}
                            id="CertificateFile" name="CertificateFile" accept="application/pdf"
                            onBlur={validate} onChange={handleImage} />
                        {dataError.CertificateFile
                            ? <div className="invalid-feedback">
                                {dataError.CertificateFile}
                            </div>
                            : null}

                    </div>
                </div>
            </div>


            <button className="btn btn-success" onClick={handleCreateDoctor}>Create</button>
        </div>
    </>);
}

export default DoctorCreate;