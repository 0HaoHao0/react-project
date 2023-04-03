import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import './Profile.scss'
// api
import { getUserInfo } from "../../services/authorization/apILogin";
import moment from "moment";
// Tab Menu
import { TabMenu } from 'primereact/tabmenu';


function Profile() {
  const [user, setUser] = useState([])

  useEffect(() => {
    const getData = async () => {
      const res = await getUserInfo();

      if (res.status === 200) {
        // Set Userinfo
        setUser(res.data);
      } else if (res.status < 500) {
        toast.error(res.data);
      } else {
        toast.error("Server is busy !!!");
      }
    };

    getData();

    return () => {

    }
  }, [])

  return (<>
    <div className="profile my-5 pt-5">
      <div className="container-fluid ">
        <div className=" border shadow">
          {/* Header */}
          <div className="profile-header p-2">
            <ProfileHeader user={user}></ProfileHeader>
          </div>
          <hr className="mx-5" />
          {/* Body */}
          <div className="profile-body p-2">
            <ProfileBody user={user}></ProfileBody>
          </div>
        </div>
      </div>
    </div>
  </>);
}

export default Profile;


//Profile Header
function UpdateAvatar(props) {
  const { user } = props;

  const [image, setImage] = useState([])

  const [isUpdate, setIsUpdate] = useState(false)


  //Handle Avatar
  const handleAvatar = (e) => {
    const { name, files } = e.target;

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      setImage((preveState) => ({
        ...preveState,
        [name]: reader.result
      }));
    });

    if (files[0]) {
      reader.readAsDataURL(files[0]);
    }
  }
  return (<>
    <img src={image.imageURL ? image.imageURL : user.imageURL} class="w-50" alt="avatar" />
    {isUpdate ?
      <>
        <div class="my-2">
          <input class="form-control" type="file" accept="image/png, image/gif, image/jpeg" name="imageURL"
            onChange={(e) => { handleAvatar(e) }} />
        </div>
        <div>
          <button class="btn btn-success my-2"
            onClick={() => setIsUpdate(isUpdate ? false : true)}>
            Update <i className="pi pi-fw pi-check" ></i>
          </button>    <button class="btn btn-danger  my-2"
            onClick={() => { setIsUpdate(isUpdate ? false : true); setImage(''); }}>
            Cancel <i className="pi pi-fw pi-times" ></i>
          </button>
        </div>

      </>
      :
      <>
        <button class="btn btn-primary  my-2"
          onClick={() => setIsUpdate(isUpdate ? false : true)}>
          <i className="pi pi-fw pi-camera" ></i>
        </button>
      </>
    }
  </>);
}

function ProfileHeader(props) {
  const { user } = props || [];

  const [isEdit, setIsEdit] = useState(false)

  return (<>
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4 col-sm-12 ">
          <div className=" h-100 d-flex flex-column align-items-center justify-content-center">
            <UpdateAvatar user={user}></UpdateAvatar>
          </div>
        </div>
        <div className="col-lg-8 col-sm-12">
          <div className="row">
            <div className="d-flex align-items-center justify-content-between">
              <h2>Hi, {user.fullName}</h2>
              <button className="btn btn-primary"
                onClick={() => {
                  setIsEdit(isEdit ? false : true)
                }}
              ><i className="fa-solid fa-wrench"></i> Edit</button>
            </div>
            <hr />
            <form className="row">
              <div className="col-lg-6 col-sm-12">
                <label htmlFor="userName">User Name: </label>
                <input id="userName" className="form-control bg-white" type="text" placeholder={user.userName} disabled={!isEdit} />
                <label htmlFor="phoneNumber">Phone Number: </label>
                <input id="phoneNumber" className="form-control bg-white" type="text" placeholder={user.phoneNumber} disabled={!isEdit} />
                <div className="d-flex align-items-end justify-content-between">
                  <div className="w-75">
                    <label htmlFor="email">Email: </label>
                    <input id="email" className="form-control bg-white " type="text" placeholder={user.email} disabled={!isEdit} />
                  </div>
                  <div>
                    <button className={`btn ${user.emailConfirmed ? `btn-success` : `btn-danger`}`} disabled >
                      {user.emailConfirmed ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-x"></i>}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <label htmlFor="birthDate">Birth Date: </label>
                <input id="birthDate" className="form-control bg-white" type="date"
                  defaultValue={user.birthDate && moment(user.birthDate).format("yyy-MM-DD")} disabled={!isEdit} />
                <label htmlFor="gender">Gender: </label>
                <input id="gender" className="form-control bg-white" type="text" placeholder={user.gender} disabled={!isEdit} />
                <label htmlFor="address">Address: </label>
                <input id="address" className="form-control bg-white" type="text" placeholder={user.address} disabled={!isEdit} />
              </div>
              {isEdit &&
                <div className="col-12 mt-2">
                  <button className="btn btn-primary " type="submit">Submit</button>
                </div>
              }
            </form>

          </div>
        </div>
      </div>
    </div>

  </>);
}



//Profile Body

function ChangePassword(params) {
  return (
    <>
      <div className="alert alert-secondary" role="alert">
        Update Password
      </div>
      <div >
        <form className="d-flex flex-column align-items-center">
          <div className="w-50">
            <label htmlFor="oldPassword">Old Password</label>
            <input id="oldPassword" className="form-control mb-2" type="text" name="oldPassword" />
          </div>
          <div className="w-50">
            <label htmlFor="oldPassword">New Password</label>
            <input id="oldPassword" className="form-control mb-2" type="text" name="oldPassword" />
          </div>
          <div className="w-50">
            <label htmlFor="oldPassword">New Password Confirm:</label>
            <input id="oldPassword" className="form-control mb-2" type="text" name="oldPassword" />
          </div>
          <button className="btn btn-primary mb-2 w-50">
            Submit
          </button>
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
  const { user } = props || [];

  const [activeIndex, setActiveIndex] = useState({ index: 0, label: "Change Password" })

  //Tab menu items
  const createItems = (user) => {
    const items = [
      { label: 'Change Password', icon: 'pi pi-fw pi-key' },
    ];

    if (user && user.role === 'Patient') {
      items.push({ label: 'Medical Record', icon: 'pi pi-fw pi-file' });
      items.push({ label: 'Appointment Rate', icon: 'pi pi-fw pi-star' });
    }
    else if (user && user.role === 'Doctor') {
      items.push({ label: 'Certificate', icon: 'pi pi-fw pi-file' });
    }

    if (user && user.emailConfirmed === false) {
      items.push({ label: 'Email Validate', icon: 'pi pi-fw pi-pencil' });
    }

    return items;
  }

  const items = createItems(user);



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

        {activeIndex.label === "Change Password" && <ChangePassword></ChangePassword>}

        {activeIndex.label === "Medical Record" && <MedicalRecord></MedicalRecord>}

        {activeIndex.label === "Appointment Rate" && <AppointmentRate></AppointmentRate>}

        {activeIndex.label === "Certificate" && null}

        {activeIndex.label === "Email Validate" && null}

      </div>
    </>
  );
}
