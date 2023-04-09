import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import './Profile.scss'
import moment from "moment";
import sampleFile from '../../assets/file/MedicalRecordsReleaseForm.docx'

// api
import { updateAvatar } from "../../services/admin/user/apiUser";
import { getUserInfo } from "../../services/authorization/apILogin";
import { getAllAppointment, getDoctorById, getPatientById, updateCertificate, updateMedicalRecord, updatePassword, updateProfile } from "../../services/authorization/apIProfile";

// Tab Menu
import { TabMenu } from 'primereact/tabmenu';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';

import Swal from "sweetalert2";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/features/userSlide";
import { Link } from "react-router-dom";


function Profile() {

  const [userInfo, setUserInfo] = useState()


  useEffect(() => {
    const getData = async () => {
      const res = await getUserInfo();

      if (res.status === 200) {
        // Set Userinfo
        setUserInfo(res.data);
      } else if (res.status < 500) {
        toast.error(res.data);
      } else {
        toast.error("Something was wrong, please contact to admin !!!");
      }
    };

    getData();

    return () => {
    }
  }, [])

  return (<>
    <div className="profile my-5 pt-5 ">
      <div className="container-fluid" >
        <div className=" border shadow-sm">
          {userInfo ?
            <>
              {/* Header */}
              <div className="profile-header p-2">
                <ProfileHeader userInfo={userInfo} setUserInfo={setUserInfo}></ProfileHeader>
              </div>
              {/* Body */}
              <div className="profile-body p-2">
                <ProfileBody userInfo={userInfo} setUserInfo={setUserInfo}></ProfileBody>
              </div>
            </>
            :
            <>
              <div className="text-primary d-flex align-items-center justify-content-center py-5">
                <h1> Loading... </h1>
                <span className="spinner-border  mx-2" role="status">
                  <span className="sr-only">Loading...</span>
                </span>

              </div>
            </>
          }
        </div>
      </div>
    </div>
  </>);
}

export default Profile;


//Profile Header
function UpdateAvatar(props) {
  const { userInfo, setUserInfo } = props;

  const [image, setImage] = useState([])

  const [isUpdate, setIsUpdate] = useState(false)

  const dispatch = useDispatch();

  //Handle Avatar
  const handleAvatar = (e) => {
    const { name, files } = e.target;

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      setImage((preveState) => ({
        ...preveState,
        [name]: reader.result,
        imageFile: files[0]
      }));
    });

    if (files[0]) {
      reader.readAsDataURL(files[0]);
    }


  }
  // Update Avatar
  const handleUpdateAvatar = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This item will be update.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Code to update the item goes here
        Swal.fire({
          title: "Loading...",
          html: "Please wait a moment",
        });
        Swal.showLoading();
        let formData = new FormData();
        formData.append("userId", userInfo.id);
        formData.append("image", image.imageFile);

        const res = await updateAvatar(formData);

        Swal.close();

        if (res.status === 200) {
          setUserInfo(res.data.user)
          dispatch(createUser(res.data.user))
          setIsUpdate(false);

          toast.success('Update successful')
        } else if (res.status < 500) {
          Swal.fire({
            icon: "error",
            title: res.data,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something wrong!",
          });
        }

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast.error('Action Cancelled')
      }
    });
  }
  return (<>
    <img src={image.imageURL ? image.imageURL : userInfo.imageURL} className="avatar rounded-circle" alt="avatar" />
    {isUpdate ?
      <>
        <div className="my-2">
          <input className="form-control" type="file" accept="image/png, image/gif, image/jpeg" name="imageURL"
            onChange={(e) => { handleAvatar(e) }} />
        </div>
        <div>
          <button className="btn btn-success my-2"
            onClick={() => handleUpdateAvatar()}>
            Update <i className="pi pi-fw pi-check" ></i>
          </button>    <button className="btn btn-danger  my-2"
            onClick={() => { setIsUpdate(isUpdate ? false : true); setImage(''); }}>
            Cancel <i className="pi pi-fw pi-times" ></i>
          </button>
        </div>

      </>
      :
      <>
        <button className="btn btn-primary  my-2"
          onClick={() => setIsUpdate(isUpdate ? false : true)}>
          <i className="pi pi-fw pi-camera" ></i>
        </button>
      </>
    }
  </>);
}

function ProfileHeader(props) {

  const { userInfo, setUserInfo } = props;

  const [userData, setUserData] = useState(userInfo)

  const [isEdit, setIsEdit] = useState(false)

  const dispatch = useDispatch();


  let debounce

  const handleChange = (name, value) => {
    clearTimeout(debounce)

    debounce = setTimeout(() => {
      setUserData((preveState) => ({
        ...preveState,
        [name]: value
      }))
      console.log(value);
    }, 1000);

  }

  const handleUpdateProfile = (e) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This item will be update.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Code to update the item goes here
        Swal.fire({
          title: "Loading...",
          html: "Please wait a moment",
        });
        Swal.showLoading();

        const res = await updateProfile(userData);

        Swal.close();

        if (res.status === 200) {
          setUserInfo(res.data)
          dispatch(createUser(res.data))
          setIsEdit(false)

          toast.success('Update successful')
        } else if (res.status < 500) {
          Swal.fire({
            icon: "error",
            title: res.data,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something wrong!",
          });
        }

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast.error('Action cancelled')
      }
    });
  }

  return (<>
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4 col-sm-12 ">
          <div className=" h-100 d-flex flex-column align-items-center justify-content-center">
            <UpdateAvatar userInfo={userInfo} setUserInfo={setUserInfo} ></UpdateAvatar>
          </div>
        </div>
        <div className="col-lg-8 col-sm-12">
          <div className="row">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="d-flex">Hi, {isEdit

                ? <input id="fullName" className="form-control  mx-2" type="text" placeholder={userInfo.fullName}
                  onChange={(e) => handleChange(e.target.id, e.target.value)} />

                : userInfo.fullName} </h2>


              {!isEdit ?
                <button className="btn btn-primary"
                  onClick={() => {
                    setIsEdit(isEdit ? false : true)
                  }}
                >
                  <i className="fa-solid fa-wrench"></i> Edit</button>
                :
                <button className="btn btn-danger"
                  onClick={() => {
                    setIsEdit(isEdit ? false : true)
                  }}
                >
                  <i className="fa-solid fa-x"></i> Cancel</button>
              }

            </div>
            <hr />
            <div className="row" >
              <div className="col-lg-6 col-sm-12">
                <label htmlFor="userName">User Name: </label>
                <input id="userName" className={`form-control ${isEdit ? null : `bg-white`}`} type="text" placeholder={userInfo.userName} disabled />

                <label htmlFor="phoneNumber">Phone Number: </label>
                <input id="phoneNumber" className="form-control bg-white" type="text" placeholder={userInfo.phoneNumber} disabled={!isEdit}
                  onChange={(e) => handleChange(e.target.id, e.target.value)} />

                <div className="d-flex align-items-end justify-content-between">
                  <div className="w-75">
                    <label htmlFor="email">Email: </label>
                    <input id="email" className={`form-control ${isEdit ? null : `bg-white`}`} type="text" placeholder={userInfo.email} disabled />
                  </div>
                  <div>
                    <button className={`btn ${userInfo.emailConfirmed ? `btn-success` : `btn-danger`}`} disabled >
                      {userInfo.emailConfirmed ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-x"></i>}
                    </button>
                  </div>
                </div>

              </div>
              <div className="col-lg-6 col-sm-12">
                <label htmlFor="birthDate">Birth Date: </label>
                <input id="birthDate" className="form-control bg-white" type="date"
                  defaultValue={userInfo.birthDate && moment(userInfo.birthDate).format("yyy-MM-DD")} disabled={!isEdit}
                  onChange={(e) => handleChange(e.target.id, e.target.value)} />

                <label htmlFor="gender">Gender: </label>
                <input id="gender" className="form-control bg-white" type="text" placeholder={userInfo.gender} disabled={!isEdit}
                  onChange={(e) => handleChange(e.target.id, e.target.value)} />

                <label htmlFor="address">Address: </label>
                <input id="address" className="form-control bg-white" type="text" placeholder={userInfo.address} disabled={!isEdit}
                  onChange={(e) => handleChange(e.target.id, e.target.value)} />

              </div>
              {isEdit &&
                <div className="col-12 mt-2">
                  <button className="btn btn-primary" onClick={(e) => handleUpdateProfile(e)}>Submit</button>
                </div>
              }
            </div>

          </div>
        </div>
      </div>
    </div>

  </>);
}



//Profile Body

function ChangePassword(props) {
  const { userInfo } = props;

  const [password, setPassword] = useState();
  const [validate, setValidate] = useState();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false);

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    // handle update password logic here
    Swal.fire({
      title: 'Are you sure?',
      text: 'This item will be update.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Code to update the item goes here
        Swal.fire({
          title: "Loading...",
          html: "Please wait a moment",
        });
        Swal.showLoading();


        const res = await updatePassword(password, userInfo);


        Swal.close();

        if (res.status === 200) {

          toast.success('Update successful')
        } else if (res.status < 500) {
          Swal.fire({
            icon: "error",
            html: res.data[0].description,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something wrong!",
          });
        }

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast.error('Action Cancelled')
      }
    });


  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setValidate((preveState) => ({
      ...preveState,
      [name]: {
        validState: value?.length >= 6 ? 'valid' : 'invalid',
        description: value?.length >= 6 ? null : 'Password must be at least 6 characters long'
      }
    }))
    if (name === 'newConfirmPassword' && value !== password.newPassword) {
      setValidate((preveState) => ({
        ...preveState,
        [name]: {
          validState: 'invalid',
          description: 'New password and confirm password do not match'
        }
      }))
    }
  }

  return (
    <>
      <div className="alert alert-secondary" role="alert">
        Update Password
      </div>
      <div >
        <form className="d-flex flex-column align-items-center " onSubmit={(e) => handleUpdatePassword(e)}>
          <div className="w-50">
            <label htmlFor="oldPassword">Old Password</label>
            <div className="input-group mb-2">
              <input id="oldPassword" className={`form-control ${validate?.oldPassword && `is-` + validate.oldPassword.validState}`} type={showOldPassword ? 'text' : 'password'} name="oldPassword" placeholder="Enter old password"
                onBlur={(e) => handleBlur(e)} onChange={(e) => handleChange(e)} required />
              <button className="btn btn-outline-secondary" type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}>{showOldPassword ? <i className='fa fa-eye'></i> : <i className='fa fa-eye-slash'></i>}</button>
            </div>
            {validate?.oldPassword && validate.oldPassword.description && <small className="text-danger">{validate.oldPassword.description}</small>}
          </div>

          <div className="w-50">
            <label htmlFor="newPassword">New Password</label>
            <div className="input-group mb-2">
              <input id="newPassword" className={`form-control ${validate?.newPassword && `is-` + validate.newPassword.validState}`} type={showNewPassword ? 'text' : 'password'} name="newPassword" placeholder="Enter new password"
                onBlur={(e) => handleBlur(e)} onChange={(e) => handleChange(e)} required />
              <button className="btn btn-outline-secondary" type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}>{showNewPassword ? <i className='fa fa-eye'></i> : <i className='fa fa-eye-slash'></i>}</button>
            </div>
            {validate?.newPassword && validate.newPassword.description && <small className="text-danger">{validate.newPassword.description}</small>}
          </div>

          <div className="w-50">
            <label htmlFor="newConfirmPassword">Confirm New Password</label>
            <div className="input-group mb-2">
              <input id="newConfirmPassword" className={`form-control ${validate?.newConfirmPassword && `is-` + validate.newConfirmPassword.validState}`} type={showNewConfirmPassword ? 'text' : 'password'} name="newConfirmPassword" placeholder="Confirm new password"
                onBlur={(e) => handleBlur(e)} onChange={(e) => handleChange(e)} required />
              <button className="btn btn-outline-secondary" type="button"
                onClick={() => setShowNewConfirmPassword(!showNewConfirmPassword)}>{showNewConfirmPassword ? <i className='fa fa-eye'></i> : <i className='fa fa-eye-slash'></i>}</button>
            </div>
            {validate?.newConfirmPassword && validate.newConfirmPassword.description && <small className="text-danger">{validate.newConfirmPassword.description}</small>}
          </div>
          <button className="btn btn-primary mt-3" type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}







function MedicalRecord(props) {
  const load = useRef(false);
  const { userInfo } = props;

  const [userData, setUserData] = useState();

  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      Swal.fire({
        title: "Loading...",
        html: "Please wait a moment",
      });
      Swal.showLoading();

      const res = await getPatientById(userInfo.id);

      Swal.close()
      if (res.status === 200) {
        setUserData(res.data)
      }
      else if (res.status < 500) {
        toast.error(res.data);
      } else {
        toast.error("Something was wrong, please contact to admin !!!");
      }

    }
    if (load.current === true) {
      loadData();
    }
    return () => {
      load.current = true
    }
  }, [userInfo.id])


  const handleUpdateMedicalRecord = () => {
    // handle update logic here
    Swal.fire({
      title: 'Are you sure?',
      text: 'This item will be update.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Code to update the item goes here
        Swal.fire({
          title: "Loading...",
          html: "Please wait a moment",
        });
        Swal.showLoading();
        let formData = new FormData();

        formData.append("id", userData.id);
        formData.append("file", userData.file);

        const res = await updateMedicalRecord(formData);


        Swal.close();

        if (res.status === 200) {
          setIsUpdate(false)
          setUserData(res.data)

          toast.success('Update successful')
        } else if (res.status < 500) {
          Swal.fire({
            icon: "error",
            html: res.data[0].description,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something wrong!",
          });
        }

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast.error('Action Cancelled')
      }
    });
  }

  return (
    <>
      <div className="alert alert-secondary" role="alert">
        Medical Record
      </div>
      <div className="d-flex flex-column align-items-center p-5">

        {userData && <>
          <div className="form-group w-50">
            <div className="d-flex align-items-center ">
              <label htmlFor="file" className="">File: </label>
              {
                !isUpdate ?
                  <>
                    <a href={userData.medicalRecordFile.fileURL} target="_blank" className="mx-2 btn btn-success btn-sm" rel="noreferrer" >View</a>
                    <button className="btn btn-primary btn-sm" onClick={() => { setIsUpdate(isUpdate ? false : true) }}>Update</button>

                  </>
                  :
                  <>
                    <div>
                      <a href={sampleFile} download={true} className="mx-2 ">Sample File</a>
                    </div>
                  </>
              }
            </div>
            {isUpdate &&
              <>
                <input id="file" className="form-control my-2" type="file" name="file" accept=".docx"
                  onChange={(e) => {
                    setUserData((preveState) => ({
                      ...preveState,
                      'file': e.target.files[0],
                    }))
                  }} />
                <div className="btn-group" role="group" aria-label="Button group">
                  <button className="btn btn-primary" onClick={handleUpdateMedicalRecord}>Update</button>
                  <button className="btn btn-danger" onClick={() => { setIsUpdate(isUpdate ? false : true) }}>Cancel</button>
                </div>
              </>
            }
          </div>
          <div className="form-group w-50">
            <label htmlFor="timeCreated">Time Created: </label>
            <input id="timeCreated" className="form-control" type="text" name="timeCreated" placeholder={userData.medicalRecordFile.timeCreated.split("T")[0]} />
          </div>
          <div className="form-group w-50">
            <label htmlFor="lastTimeModified">Last Time Modified: </label>
            <input id="lastTimeModified" className="form-control" type="text" name="lastTimeModified" placeholder={userData.medicalRecordFile.lastTimeModified.split("T")[0]} />
          </div>
        </>
        }
      </div>

    </>
  );
}

function Certificate(props) {
  const { userInfo } = props;

  const [userData, setUserData] = useState();

  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      Swal.fire({
        title: "Loading...",
        html: "Please wait a moment",
      });
      Swal.showLoading();

      const res = await getDoctorById(userInfo.id);

      Swal.close()
      if (res.status === 200) {
        setUserData(res.data)
      }
      else if (res.status < 500) {
        toast.error(res.data);
      } else {
        toast.error("Something was wrong, please contact to admin !!!");
      }

    }
    loadData();
    return () => {
    }
  }, [userInfo.id])


  const handleUpdateCertificate = () => {
    // handle update logic here
    Swal.fire({
      title: 'Are you sure?',
      text: 'This item will be update.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Code to update the item goes here
        Swal.fire({
          title: "Loading...",
          html: "Please wait a moment",
        });
        Swal.showLoading();
        let formData = new FormData();

        formData.append("Id", userData.id);
        formData.append("CertificateFile", userData.file);

        const res = await updateCertificate(formData);


        Swal.close();

        if (res.status === 200) {
          setIsUpdate(false)
          setUserData(res.data)

          toast.success('Update successful')
        } else if (res.status < 500) {
          Swal.fire({
            icon: "error",
            html: res.data[0].description,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something wrong!",
          });
        }

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast.error('Action Cancelled')
      }
    });
  }

  return (
    <>
      <div className="alert alert-secondary" role="alert">
        Certificate
      </div>
      <div className="d-flex flex-column align-items-center p-5">

        {userData && <>
          <div className="form-group w-50">
            <div className="d-flex align-items-center ">
              <label htmlFor="file" className="">File: </label>
              {
                !isUpdate &&
                <>
                  <a href={userData.certificate.fileURL} target="_blank" className="mx-2 btn btn-success btn-sm" rel="noreferrer" >View</a>
                  <button className="btn btn-primary btn-sm" onClick={() => { setIsUpdate(isUpdate ? false : true) }}>Update</button>

                </>

              }
            </div>
            {isUpdate &&
              <>
                <input id="file" className="form-control my-2" type="file" name="file" accept=".pdf"
                  onChange={(e) => {
                    setUserData((preveState) => ({
                      ...preveState,
                      'file': e.target.files[0],
                    }))
                  }} />
                <div className="btn-group" role="group" aria-label="Button group">
                  <button className="btn btn-primary" onClick={handleUpdateCertificate}>Update</button>
                  <button className="btn btn-danger" onClick={() => { setIsUpdate(isUpdate ? false : true) }}>Cancel</button>
                </div>
              </>
            }
          </div>
          <div className="form-group w-50">
            <label htmlFor="timeCreated">Time Created: </label>
            <input id="timeCreated" className="form-control" type="text" name="timeCreated" placeholder={userData.certificate?.timeCreated.split("T")[0]} />
          </div>
          <div className="form-group w-50">
            <label htmlFor="lastTimeModified">Last Time Modified: </label>
            <input id="lastTimeModified" className="form-control" type="text" name="lastTimeModified" placeholder={!userData.certificate ? userData.certificate.lastTimeModified.split("T")[0] : null} />
          </div>
        </>
        }
      </div>

    </>
  );
}

function AppointmentHistory(props) {
  const { userInfo } = props

  const [appointments, setAppointments] = useState()
  const [filter, setFilter] = useState({
    id: userInfo.id
  })

  const getSeverity = (status) => {
    switch (status) {
      case 'Complete':
        return 'danger';

      case 'NotYet':
        return 'success';

      case 'Accept':
        return 'info';

      case 'Cancel':
        return 'warning';
      default:
        return 'default';
    }
  };

  useEffect(() => {

    const loadAppointment = async () => {
      Swal.fire({
        title: "Loading...",
        html: "Please wait a moment",
      });
      Swal.showLoading();

      const res = await getAllAppointment(filter);

      Swal.close()
      if (res.status === 200) {
        setAppointments(res.data)
      }
      else if (res.status < 500) {
        toast.error(res.data);
      } else {
        toast.error("Something was wrong, please contact to admin !!!");
      }
    }

    loadAppointment()

    return () => {
    }
  }, [filter])

  const dateBodyTemplate = (rowData) => {
    return rowData.date.split("T")[0];
  };
  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.state} severity={getSeverity(rowData.state)} />;
  };

  return (
    <>
      <div className="alert alert-secondary" role="alert">
        Appointment History
      </div>
      {appointments ?
        <DataTable value={appointments.data} filter selectionMode="single" paginator rows={10} rowsPerPageOptions={[10, 25]} tableStyle={{ minWidth: '50rem' }}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}">

          <Column field="service.serviceName" header="Service Name" style={{ width: '25%' }}></Column>
          <Column field="doctor.baseUser.fullName" header="Doctor" style={{ width: '25%' }}></Column>
          <Column field="state" header="State" body={statusBodyTemplate} style={{ width: '25%' }}></Column>
          <Column field="date" header="Date" body={dateBodyTemplate} style={{ width: '25%' }}></Column>
          <Column field="time" header="Time" style={{ width: '25%' }}></Column>

        </DataTable>
        :
        null
      }

    </>
  );
}

function ProfileBody(props) {
  const { userInfo } = props;

  const [activeIndex, setActiveIndex] = useState({ index: 0, label: "Change Password" })

  //Tab menu items
  const createItems = (userInfo) => {
    const items = [
      { label: 'Change Password', icon: 'pi pi-fw pi-key' },
    ];

    if (userInfo && userInfo.role === 'Patient') {
      items.push({ label: 'Medical Record', icon: 'pi pi-fw pi-file' });
      items.push({ label: 'Appointment History', icon: 'pi pi-fw pi-star' });
    }
    else if (userInfo && userInfo.role === 'Doctor') {
      items.push({ label: 'Certificate', icon: 'pi pi-fw pi-file' });
    }

    if (userInfo && userInfo.emailConfirmed === false) {
      items.push({ label: 'Email Validate', icon: 'pi pi-fw pi-pencil' });
    }

    return items;
  }

  const items = createItems(userInfo);



  return (
    <>
      <div className="row mb-5">
        <div >
          <TabMenu model={items} activeIndex={activeIndex.index} onTabChange={(e) => setActiveIndex((preveState) => ({
            ...preveState,
            label: e.value.label,
            index: e.index,
          }))} />
        </div>

        {activeIndex.label === "Change Password" && <ChangePassword userInfo={userInfo} ></ChangePassword>}

        {activeIndex.label === "Medical Record" && <MedicalRecord userInfo={userInfo}></MedicalRecord>}

        {activeIndex.label === "Appointment History" && <AppointmentHistory userInfo={userInfo}></AppointmentHistory>}

        {activeIndex.label === "Certificate" && <Certificate userInfo={userInfo}></Certificate>}

        {activeIndex.label === "Email Validate" &&
          <div className="w-100 text-center mt-5">
            <div> <Link to={'/email-confirm'} className="btn btn-primary">Validate</Link></div>
          </div>
        }


      </div>
    </>
  );
}
