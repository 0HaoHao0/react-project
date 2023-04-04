import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import './Profile.scss'
import moment from "moment";

// api
import { updateAvatar } from "../../services/admin/user/apiUser";
import { getUserInfo } from "../../services/authorization/apILogin";

// Tab Menu
import { TabMenu } from 'primereact/tabmenu';
import Swal from "sweetalert2";
import { useRef } from "react";
import { updateProfile } from "../../services/authorization/apIProfile";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/features/userSlide";


function Profile() {
  const render = useRef(false)
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
        toast.error("Server is busy !!!");
      }
    };

    if (render.current === true) {
      getData();
      console.log('check');
    }

    return () => {
      render.current = true;
    }
  }, [])

  return (<>
    <div className="profile my-5 pt-5">
      <div className="container-fluid ">
        <div className=" border shadow">
          {userInfo ?
            <>
              {/* Header */}
              <div className="profile-header p-2">
                <ProfileHeader userInfo={userInfo} setUserInfo={setUserInfo}></ProfileHeader>
              </div>
              <hr className="mx-5" />
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
  const [userData, setUserData] = useState();
  const [validate, setValidate] = useState();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false);

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    // handle update password logic here
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setValidate((preveState) => ({
      ...preveState,
      [name]: {
        validState: value?.length > 6 ? 'valid' : 'invalid',
        description: value?.length > 6 ? null : 'Password must be at least 6 characters long'
      }
    }))
    if (name === 'newConfirmPassword' && value !== userData.newPassword) {
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







function MedicalRecord(params) {
  return (
    <>
      <div className="alert alert-secondary" role="alert">
        Medical Record
      </div>
    </>
  );
}

function AppointmentRate(params) {
  return (
    <>
      <div className="alert alert-secondary" role="alert">
        Appointment Rate
      </div>
    </>
  );
}

function ProfileBody(props) {
  const { userInfo, setUserInfo } = props;

  const [activeIndex, setActiveIndex] = useState({ index: 0, label: "Change Password" })

  //Tab menu items
  const createItems = (userInfo) => {
    const items = [
      { label: 'Change Password', icon: 'pi pi-fw pi-key' },
    ];

    if (userInfo && userInfo.role === 'Patient') {
      items.push({ label: 'Medical Record', icon: 'pi pi-fw pi-file' });
      items.push({ label: 'Appointment Rate', icon: 'pi pi-fw pi-star' });
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

        {activeIndex.label === "Change Password" && <ChangePassword userInfo={userInfo} setUserInfo={setUserInfo}></ChangePassword>}

        {activeIndex.label === "Medical Record" && <MedicalRecord></MedicalRecord>}

        {activeIndex.label === "Appointment Rate" && <AppointmentRate></AppointmentRate>}

        {activeIndex.label === "Certificate" && null}

        {activeIndex.label === "Email Validate" && null}

      </div>
    </>
  );
}
