import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPatient } from "../../../services/receptionist/apiReceptionistPatient";

function ReceptionistPatient() {
    const [patient, setPatient] = useState('');

    const navigate = useNavigate();

    const [check, setCheck] = useState(false);

    const [dataError, setDataError] = useState('')
    const [isTouched, setIsTouched] = useState(''); // biến cờ


    const handleCreate = async () => {

        const res = await createPatient(patient);

        if (res.status === 200) {
            toast.success(`Create account ${res.data.user.email} successful, Please verify patient email.`)
            navigate('')
        }
        else if (res.status === 400) {
            if (res.data.code === 'CreatedFailed') {
                toast.error('This account already exists!')

            }
            else {
                toast.error('Please fill all required fields!')

            }
        }
        else {
<<<<<<< HEAD
            toast.error('Something went wrong, Please try again !')
=======
            toast.error('Something wrong !')
>>>>>>> d3c8f7ca7ca277d3a39e657371d85d436858e39f
        }


    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };


    function handleCheckboxChange(e) {
        const { id, name, checked } = e.target;

        if (patient?.gender === id && checked === false) {
            setPatient((prevState) => ({
                ...prevState,
                [name]: ''
            }));
        }
        else {
            setPatient((prevState) => ({
                ...prevState,
                [name]: id
            }));
        }

        setCheck({
            male: id === "male" ? checked : false,
            female: id === "female" ? checked : false,
        });
    }

    // Validate
    const validate = (e) => {
        const { name, value, type } = e.target;

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
            if (type === 'email' && !isValidEmail(value)) {
                setDataError((prevState) => ({
                    ...prevState,
                    [name]: "Email is invalid format !"
                }));
            }
            else {
                setDataError((prevState) => ({
                    ...prevState,
                    [name]: ''
                }));
            }
        }
    }

    //
    const validateCheck = () => {

        setIsTouched((prevState) => ({
            ...prevState,
            'gender': "Touch"
        }));

        if (!patient.gender) {
            setDataError((prevState) => ({
                ...prevState,
                "gender": "Uncheck Gender !"
            }));
        }
        else {
            setDataError((prevState) => ({
                ...prevState,
                "gender": ''
            }));
        }

    }


    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    return (<>
        <div className="receptionist-patient p-5">
            <h1>Create Patient</h1>
            <hr />
            <div className="container-fluid">
                <div className=" row ">
                    <div className="col">
                        <div className=" form-group">
                            <label htmlFor="userName">User Name:</label>
                            <input id="userName" className={`form-control  ${isTouched.userName && (dataError.userName ? "is-invalid" : "is-valid")}`} type="text" name="userName"
                                onBlur={validate} onChange={handleChange} />
                            {dataError.userName
                                ? <div className="invalid-feedback">
                                    {dataError.userName}
                                </div>
                                : null}
                        </div>

                        <div className=" form-group">
                            <label htmlFor="fullName">Full Name:</label>
                            <input id="fullName" className={`form-control  ${isTouched.fullName && (dataError.fullName ? "is-invalid" : "is-valid")}`} type="text" name="fullName"
                                onBlur={validate} onChange={handleChange} />
                            {dataError.fullName
                                ? <div className="invalid-feedback">
                                    {dataError.fullName}
                                </div>
                                : null}
                        </div>

                        <div className="form-group">
                            <label htmlFor="my-input">Gender:   {dataError.gender
                                ? <div className=" ms-2 invalid-feedback d-inline">
                                    {dataError.gender}
                                </div>
                                : null}</label>
                            <div className="">
                                <div className="form-check form-switch">
                                    <input className={`form-check-input ${isTouched.gender && (dataError.gender ? "is-invalid" : "is-valid")}`} type="checkbox" id="male" name="gender" checked={check && check.male}
                                        onChange={(e) => handleCheckboxChange(e)} onBlur={validateCheck} />
                                    <label className="form-check-label" htmlFor="male">Male: </label>

                                </div>
                                <div className="form-check form-switch">
                                    <input className={`form-check-input ${isTouched.gender && (dataError.gender ? "is-invalid" : "is-valid")}`} type="checkbox" id="female" name="gender" checked={check && check.female}
                                        onChange={(e) => handleCheckboxChange(e)} onBlur={validateCheck} />
                                    <label className="form-check-label" htmlFor="femail">Female: </label>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col">
                        <div className="col form-group">
                            <label htmlFor="password">Password: </label>
                            <input id="password" className={`form-control  ${isTouched.password && (dataError.password ? "is-invalid" : "is-valid")}`} type="password" name="password"
                                onBlur={validate} onChange={handleChange} />
                            {dataError.password
                                ? <div className="invalid-feedback">
                                    {dataError.password}
                                </div>
                                : null}
                        </div>

                        <div className="col form-group">
                            <label htmlFor="email">Email: </label>
                            <input id="email" className={`form-control  ${isTouched.email && (dataError.email ? "is-invalid" : "is-valid")}`} type="email" name="email"
                                onBlur={validate} onChange={handleChange} />
                            {dataError.email
                                ? <div className="invalid-feedback">
                                    {dataError.email}
                                </div>
                                : null}
                        </div>

                        <div className="col form-group">
                            <label htmlFor="phoneNumber">Phone Number:</label>
                            <input id="" className={`form-control  ${isTouched.phoneNumber && (dataError.phoneNumber ? "is-invalid" : "is-valid")}`} type="number" name="phoneNumber"
                                onBlur={validate} onChange={handleChange} />
                            {dataError.phoneNumber
                                ? <div className="invalid-feedback">
                                    {dataError.phoneNumber}
                                </div>
                                : null}
                        </div>

                    </div>

                </div>
                <button className="btn btn-success my-2" onClick={() => { handleCreate() }}>Create</button>
            </div>

        </div>
    </>);
}

export default ReceptionistPatient;