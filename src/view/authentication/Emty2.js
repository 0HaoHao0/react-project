import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
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
        <div className="profile mt-5 p-5">
            <div className="container-fluid ">
                <div className="border shadow ">
                    {/* Header */}
                    <div className="profile-header">
                        <ProfileHeader user={user}></ProfileHeader>
                    </div>
                    <hr className="mx-5" />
                    {/* Body */}
                    <div className="profile-body">
                        <ProfileBody user={user}></ProfileBody>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Profile;




function ProfileHeader(props) {
    const { user } = props || [];

    const [isEdit, setIsEdit] = useState(false)


    return (<>
        <div className="row m-5 g-2">
            <div className="col-lg-4 col-sm-12 ">
                <div className="h-100 d-flex align-items-center justify-content-center">
                    <img src={user.imageURL} className="w-50" alt="avatar" />
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
    </>);
}

function createItems(user) {
    const items = [
        { label: 'Change Password', icon: 'pi pi-fw pi-key' },
        { label: 'Update Avatar', icon: 'pi pi-fw pi-camera' },
    ];

    if (user && user.emailConfirmed === false) {
        items.push({ label: 'Email Validate', icon: 'pi pi-fw pi-pencil' });
    }

    if (user && user.role === 'Patient') {
        items.push({ label: 'Medical Record', icon: 'pi pi-fw pi-file' });
    } else if (user && user.role === 'Doctor') {
        items.push({ label: 'Certificate', icon: 'pi pi-fw pi-file' });
    }

    return items;
}


function ProfileBody(props) {
    const { user } = props || [];

    const [activeIndex, setActiveIndex] = useState(0)

    const items = createItems(user);


    return (
        <>
            <div className="row mx-5 mb-5 g-2">
                <div className="tab-menu">
                    <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                </div>
            </div>
        </>
    );
}
